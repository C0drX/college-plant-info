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

export { DeleteModal, RestoreModal, CustomModal };
