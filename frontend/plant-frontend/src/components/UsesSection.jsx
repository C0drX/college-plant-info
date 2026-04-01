import { useState, useEffect } from "react";
import { formatText } from "../utils/formatText";

const UsesSection = ({ uses, plantId }) => {
  const [expanded, setExpanded] = useState(false);

  const LIMIT = 300;
  const showToggle = uses.length > LIMIT;

  useEffect(() => {
    setExpanded(false);
  }, [plantId]);

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3 text-success fw-bold">Uses</h4>
        <div className={`mb-2 clamp-text ${expanded ? "expanded" : ""}`}>
          {formatText(uses)}
        </div>

        {showToggle && (
          <span
            onClick={() => setExpanded(!expanded)}
            style={{
              color: "#2e7d32",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {expanded ? "Read less" : "Read more"}
          </span>
        )}
      </div>
    </div>
  );
};

export default UsesSection;
