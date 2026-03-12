import React from "react";

export const formatText = (text) => {
  if (!text) return null;

  const sentences = text.split(".").filter((s) => s.trim() !== "");

  return sentences.map((line, index) => {
    const trimmed = line.trim();

    if (trimmed.includes(":")) {
      const [title, ...rest] = trimmed.split(":");
      const content = rest.join(":");

      return (
        <p key={index} className="mb-2">
          <strong>{title.trim()}:</strong> {content.trim()}
        </p>
      );
    }

    return (
      <p key={index} className="mb-2">
        {trimmed}.
      </p>
    );
  });
};
