import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🌿 College Plant Info
        </Link>

        <div>
          <Link className="btn btn-light me-2" to="/">
            Home
          </Link>

          <Link className="btn btn-outline-light" to="/admin">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;