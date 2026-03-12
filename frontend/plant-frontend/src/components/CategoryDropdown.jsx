import React from "react";

const categories = [
  "Decorative",
  "Flowering",
  "Fruit",
  "Medicinal",
  "Herb",
  "Shrub",
  "Tree",
  "Climber / Creeper",
  "Aquatic",
  "Grass / Ground Cover",
  "Succulent / Cactus",
  "Shade Plant",
];

function CategoryDropdown({ label, name, value, onChange, required = false }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>

      <select
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
