import { useState, useEffect } from "react";

const AboutSection = ({ description, plantId }) => {
  const [expanded, setExpanded] = useState(false);

  const LIMIT = 300;
  const showToggle = description.length > LIMIT;

  useEffect(() => {
    setExpanded(false);
  }, [plantId]); // plant change hone par reset

  return (
    <div className="mb-5">
      <h3 className="mb-3 fw-bold text-success">🌿 About the Plant</h3>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className={`mb-2 clamp-text ${expanded ? "expanded" : ""}`}>
            {description}
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

export default AboutSection;
