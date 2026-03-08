import { BASE_URL } from "../config/server";

function QrModal({ plant, onClose }) {
  if (!plant) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">QR Code - {plant.common_name}</h5>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body text-center">
            <img
              src={`${BASE_URL}/qrcodes/plant-${plant.id}.png`}
              alt="qr"
              className="img-fluid"
              style={{ maxWidth: "250px" }}
            />
          </div>

          <div className="modal-footer">
            <a
              href={`${BASE_URL}/qrcodes/plant-${plant.id}.png`}
              download
              className="btn btn-success"
            >
              Download QR
            </a>

            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrModal;
