import { useState, useEffect } from "react";

const UsesSection = ({ uses, plantId }) => {
  const [expanded, setExpanded] = useState(false);

  const LIMIT = 300;
  const showToggle = uses.length > LIMIT;

  useEffect(() => {
    setExpanded(false);
  }, [plantId]);

  return (
<<<<<<< Updated upstream
    <div className="mb-5">
      <h3 className="mb-3 fw-bold text-success">💊 Uses</h3>
=======
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3 text-success fw-bold">Uses</h4>
        <div className={`mb-2 clamp-text ${expanded ? "expanded" : ""}`}>
          {formatText(uses)}
        </div>
>>>>>>> Stashed changes

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className={`mb-2 clamp-text ${expanded ? "expanded" : ""}`}>
            {uses}
          </p>

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
    </div>
  );
};

export default UsesSection;
