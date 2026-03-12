import React from "react";

const ImageUpload = ({ label, name, onChange, preview }) => {
  return (
    <div className="col-md-4 mb-4">
      <label className="form-label fw-semibold">{label}</label>

      <label className="upload-box">
        <input type="file" name={name} onChange={onChange} />

        {!preview && (
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <div>Click to upload</div>
          </div>
        )}

        {preview && (
          <img src={preview} alt="preview" className="upload-preview" />
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
