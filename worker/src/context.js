// Single source of truth: the same JSON files the React site renders from.
// Wrangler bundles these at deploy time, so the chatbot's knowledge is always
// in sync with the live site content without any manual copy step.
import en from "../../src/translations/en/global.json";
import es from "../../src/translations/es/global.json";
import fr from "../../src/translations/fr/global.json";

const DATA = { en, es, fr };

// Groq's free-tier TPM cap (8K tokens/min) is shared across every request,
// and this whole context is re-sent as the system prompt on every turn -
// so descriptions are capped to keep a couple of quick follow-up questions
// from tripping that limit.
const MAX_DESCRIPTION_CHARS = 220;

function truncate(text, maxChars) {
  if (!text || text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + "…";
}

function formatExperiences(list) {
  return list
    .map(
      (e) =>
        `- ${e.title} at ${e.entreprise} (${e.place}), ${e.initDate} - ${e.finishDate}: ${truncate(e.description, MAX_DESCRIPTION_CHARS)}`
    )
    .join("\n");
}

function formatEducations(list) {
  return list
    .map(
      (ed) =>
        `- ${ed.title}, ${ed.place} (${ed.category}), ${ed.initDate} - ${ed.finishDate}: ${truncate(ed.description, MAX_DESCRIPTION_CHARS)}`
    )
    .join("\n");
}

function formatSkills(list) {
  const byCategory = new Map();
  for (const s of list) {
    if (!byCategory.has(s.category)) byCategory.set(s.category, []);
    byCategory.get(s.category).push(`${s.title} (${s.rating}/5)`);
  }
  return [...byCategory.entries()]
    .map(([category, items]) => `- ${category}: ${items.join(", ")}`)
    .join("\n");
}

function formatProjects(list) {
  return list
    .map(
      (p) =>
        `- ${p.title} [${p.category}], ${p.initDate} - ${p.finishDate}: ${truncate(p.description, MAX_DESCRIPTION_CHARS)}`
    )
    .join("\n");
}

function formatFacts(list) {
  return list.map((f) => `- ${f.text}`).join("\n");
}

// Builds one condensed, plain-text block of portfolio content for a given
// language, used as grounding context inside the system prompt.
export function buildPortfolioContext(lang) {
  const data = DATA[lang] || DATA.en;
  const intro = data.introductionText || {};
  const introText = Object.values(intro).join(" ");

  return [
    "INTRODUCTION:",
    introText,
    "",
    "QUICK FACTS:",
    formatFacts(data.hero?.facts || []),
    "",
    "WORK EXPERIENCE (most recent first):",
    formatExperiences(data.experiences || []),
    "",
    "EDUCATION:",
    formatEducations(data.educations || []),
    "",
    "SKILLS:",
    formatSkills(data.skills || []),
    "",
    "PROJECTS:",
    formatProjects(data.projects || []),
  ].join("\n");
}
