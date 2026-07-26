import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CHAT_API_URL } from "../config";

export default function ChatBot() {
  const [t, i18n] = useTranslation("global");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading) return;

    const userMessage = { role: "user", content: question };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const history = nextMessages.map(({ role, content }) => ({ role, content }));

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: i18n.language, messages: history }),
      });

      const data = await response.json();
      if (!response.ok || !data.reply) {
        throw new Error(data.error || "chat_error");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chatbot.error"), isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}>
      {open && (
        <Card
          elevation={4}
          sx={{
            width: { xs: 300, sm: 340 },
            height: 440,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ bgcolor: "primary.main", color: "white", px: 2, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t("chatbot.title")}
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Stack spacing={1} sx={{ flexGrow: 1, overflowY: "auto", px: 1.5, py: 1.5 }}>
            {messages.length === 0 && (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "#f0f0f0",
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "85%",
                }}
              >
                <Typography variant="body2">{t("chatbot.greeting")}</Typography>
              </Box>
            )}
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  bgcolor: m.role === "user" ? "primary.main" : m.isError ? "#ffe0e0" : "#f0f0f0",
                  color: m.role === "user" ? "white" : "text.primary",
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "85%",
                }}
              >
                <Typography variant="body2">{m.content}</Typography>
              </Box>
            ))}
            {loading && (
              <Box sx={{ alignSelf: "flex-start", px: 1 }}>
                <CircularProgress size={18} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ p: 1.5, borderTop: "1px solid #eee" }}>
            <TextField
              size="small"
              fullWidth
              placeholder={t("chatbot.placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <IconButton color="primary" onClick={handleSend} disabled={loading || !input.trim()}>
              <SendIcon />
            </IconButton>
          </Stack>
        </Card>
      )}

      {!open && (
        <Fab
          color="primary"
          aria-label={t("chatbot.openAriaLabel")}
          onClick={() => setOpen(true)}
        >
          <ChatBubbleOutlineIcon />
        </Fab>
      )}
    </Box>
  );
}
