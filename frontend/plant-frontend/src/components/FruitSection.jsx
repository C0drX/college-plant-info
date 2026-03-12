const FruitSection = ({ plant }) => {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3 text-success fw-bold">About Fruit</h4>

        <p>
          <strong>
            {plant.fruit_info && plant.fruit_info.trim() !== ""
              ? plant.fruit_info
              : "No edible fruit"}
          </strong>{" "}
        </p>
      </div>
    </div>
  );
};

export default FruitSection;
