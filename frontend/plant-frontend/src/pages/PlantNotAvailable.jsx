function PlantNotAVailable() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Plant Not Available</h2>
      <p className="text-muted">
        Oops! The plant you are looking for is not currently available. Please
        check back later or explore other plants in our collection.
      </p>
    </div>
  );
}

export default PlantNotAVailable;
