import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 fw-bold text-danger">404</h1>
      <h3 className="mb-3">Page Not Available</h3>
      <p className="text-muted">
        Oops! The page you are looking for does not exist 🙁
      </p>

      <Link to="/" className="btn btn-success mt-3">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
