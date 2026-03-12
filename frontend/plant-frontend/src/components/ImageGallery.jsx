import { useState } from "react";
import { BASE_URL } from "../config/server";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="mb-4">
      <h3 className="mb-3 fw-bold text-success">📸 Plant Images</h3>

      <div className="row g-3">
        {images.map((img, index) => (
          <div className="col-4" key={index}>
            <img
              src={`${BASE_URL}${img}`}
              className="img-fluid shadow-sm gallery-img"
              onClick={() => setSelectedImage(img)}
              style={{
                width: "100%",
                height: window.innerWidth < 768 ? "110px" : "220px",
                objectFit: "cover",
                borderRadius: "14px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}

      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={`${BASE_URL}${selectedImage}`}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
