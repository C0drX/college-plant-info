function DeleteModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Plant</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            Are you sure you want to delete this plant?
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestoreModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Restore Plant</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            Are you sure you want to restore this plant?
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-success" onClick={onConfirm}>
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomModal({ title, message, onConfirm, btnText }) {
  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onConfirm}>
              {btnText || "Go Back"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoaderModal({ show, text = "Processing..." }) {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 2000 }}
    >
      <div
        className="bg-white text-center p-4"
        style={{
          borderRadius: "16px",
          minWidth: "250px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div className="spinner-border text-success mb-3" />
        <div className="fw-semibold">{text}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ show, title, message, onConfirm, onClose }) {
  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 2000 }}
    >
      <div
        className="bg-white p-4"
        style={{
          borderRadius: "16px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h5 className="fw-semibold mb-2">{title}</h5>
        <p className="text-muted mb-3">{message}</p>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary w-100" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-success w-100" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageModal({ show, type = "success", message, onClose }) {
  if (!show) return null;

  const isSuccess = type === "success";

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 2000 }}
    >
      <div
        className="bg-white p-4 text-center"
        style={{
          borderRadius: "16px",
          width: "90%",
          maxWidth: "350px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="mb-3"
          style={{
            fontSize: "2rem",
          }}
        >
          {isSuccess ? "✅" : "❌"}
        </div>

        <p className="fw-semibold mb-3">{message}</p>

        <button
          className={`btn w-100 ${isSuccess ? "btn-success" : "btn-danger"}`}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export {
  DeleteModal,
  RestoreModal,
  CustomModal,
  LoaderModal,
  ConfirmModal,
  MessageModal,
};
