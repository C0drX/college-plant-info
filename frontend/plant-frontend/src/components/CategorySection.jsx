function CategorySection({ plant }) {
  return (
    <div
      className="card border-0 shadow-sm mb-4"
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      <div className="card-body">
        <h4 className="mb-3 text-success fw-bold">Category</h4>

        <p>
          <strong>
            {plant.category && plant.category.trim() !== ""
              ? plant.category
              : "Not Categorised"}
          </strong>{" "}
        </p>
      </div>
    </div>
  );
}

export default CategorySection;
