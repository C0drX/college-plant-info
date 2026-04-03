import { BASE_URL } from "../../config/server";
import html2canvas from "html2canvas";

function QrModal({ plant, onClose }) {
  if (!plant) return null;

  const qrUrl = `${BASE_URL}/qrcodes/plant-${plant.id}.png`;

  /**
   * ---------------------------------------------------
   * 🔥 Download QR Card (not just image)
   * ---------------------------------------------------
   */
  const handleDownload = async () => {
    const card = document.getElementById("qr-card");

    if (!card) return;

    const canvas = await html2canvas(card, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      scale: 2, // high quality 😏
    });

    const link = document.createElement("a");
    link.download = `plant-${plant.common_name}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content border-0"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #f8fffb, #e6f4ea)",
          }}
        >
          {/* Header */}
          <div
            className="modal-header"
            style={{
              background: "transparent",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <h4 className="modal-title w-100 text-center fw-semibold">
              QR Code - {plant.common_name}
            </h4>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body text-center">
            {/* 🔥 QR CARD */}
            <div
              id="qr-card"
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "20px",
                display: "inline-block",
                overflow: "hidden", // 🔥 IMPORTANT
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={qrUrl}
                alt="qr"
                style={{ width: "220px" }}
                crossOrigin="anonymous"
              />

              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "600",
                  color: "rgb(10, 25, 80)",
                  letterSpacing: "1px",
                  fontSize: "1.5rem",
                }}
              >
                SCAN ME
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="modal-footer"
            style={{
              background: "transparent",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <button className="btn btn-success" onClick={handleDownload}>
              Download QR
            </button>

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
