function ModalNew({ modalRef }) {
  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Cannot Edit</h5>
          </div>
          <div className="modal-body">
            <p>This plant has been deleted. Restore it first to edit.</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin")}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalNew;
