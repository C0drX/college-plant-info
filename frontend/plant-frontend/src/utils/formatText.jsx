import React from "react";

export const formatText = (text) => {
  if (!text) return null;

  const sentences = text.split(".").filter((s) => s.trim() !== "");

  return sentences.map((line, index) => {
    const trimmed = line.trim();

    if (trimmed.includes(":")) {
      const parts = trimmed.split(":").map((p) => p.trim());

      // Agar sirf ek colon hai → normal behavior
      if (parts.length === 2) {
        return (
          <p key={index} className="mb-2">
            <strong>{parts[0]}:</strong> {parts[1]}
          </p>
        );
      }

      // 🔥 Multiple colon case (dynamic nesting)
      const description = parts.pop(); // last part
      const mainLabel = parts.pop(); // second last
      const headings = parts; // remaining

      return (
        <div key={index} className="mb-3">
          {/* Headings */}
          {headings.map((h, i) => (
            <p
              key={i}
              className="fw-semibold mt-3 mb-2"
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.4",
              }}
            >
              {h}:
            </p>
          ))}

          {/* Main label + description */}
          <p className="mb-1">
            <strong>{mainLabel}:</strong> {description}
          </p>
        </div>
      );
    }

    return (
      <p key={index} className="mb-2">
        {trimmed}.
      </p>
    );
  });
};
