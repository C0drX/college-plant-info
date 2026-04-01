import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
<<<<<<< Updated upstream
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">
          🌿 College Plant Info
        </Link>
=======
  const [showDrawer, setShowDrawer] = useState(false);
>>>>>>> Stashed changes

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-success">
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">
            College Plant Info
          </Link>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowDrawer(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop buttons
          <div className="d-none d-lg-block">
            <Link className="btn btn-light me-2" to="/">
              Home
            </Link>

            <Link className="btn btn-outline-light" to="/admin/dashboard">
              Admin
            </Link>
          </div> */}
        </div>
      </nav>

      {/* Overlay (background dark) */}
      {showDrawer && (
        <div
          onClick={() => setShowDrawer(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1040,
          }}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`offcanvas offcanvas-end ${showDrawer ? "show" : ""}`}
        style={{
          visibility: showDrawer ? "visible" : "hidden",
          zIndex: 1050,
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowDrawer(false)}
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column gap-3">
          <Link
            className="btn btn-outline-success"
            to="/"
            onClick={() => setShowDrawer(false)}
          >
            Home
          </Link>

<<<<<<< Updated upstream
          <Link className="btn btn-outline-light" to="/admin">
=======
          <Link
            className="btn btn-outline-success"
            to="/admin/dashboard"
            onClick={() => setShowDrawer(false)}
          >
>>>>>>> Stashed changes
            Admin
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
