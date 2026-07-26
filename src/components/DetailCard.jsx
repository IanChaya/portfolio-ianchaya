import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

// Descriptions in the data use either " - " or the en-dash " – " as a separator —
// this handles both instead of assuming one.
function splitDescription(description) {
  return description.split(/\s[-–]\s/).filter(Boolean);
}

export default function DetailCard({ logo, title, chips, description, ctaLabel, ctaHref }) {
  return (
    <Box
      sx={{
        borderLeft: "5px solid",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "#f5f8fc",
        p: { xs: 2.5, md: 4 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3, flexWrap: "wrap" }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: 2.5,
            bgcolor: "#fff",
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <Box component="img" src={logo} alt={title} sx={{ maxWidth: "78%", maxHeight: "78%", objectFit: "contain" }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {chips.filter(Boolean).map((chip, i) => (
              <Box
                key={i}
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "text.secondary",
                  bgcolor: "#fff",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 999,
                  px: 1.2,
                  py: 0.3,
                }}
              >
                {chip}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        component="ul"
        sx={{ listStyle: "none", m: 0, mb: ctaHref ? 3 : 0, p: 0, display: "flex", flexDirection: "column", gap: 1 }}
      >
        {splitDescription(description).map((line, i) => (
          <Box component="li" key={i} sx={{ fontSize: "0.92rem", lineHeight: 1.6, pl: 2, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: "0.6em",
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
            {line}
          </Box>
        ))}
      </Box>

      {ctaHref && (
        <Button component="a" href={ctaHref} target="_blank" rel="noopener noreferrer" variant="contained" sx={{ borderRadius: 999 }}>
          {ctaLabel} ↗
        </Button>
      )}
    </Box>
  );
}
