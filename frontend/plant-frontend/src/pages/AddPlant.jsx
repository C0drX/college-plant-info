import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlant } from "../services/api";

function AddPlant() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    common_name: "",
    scientific_name: "",
    family: "",
    description: "",
    uses: "",
    location: "",
  });

  const [images, setImages] = useState({
    cover: null,
    reference: null,
    college: null,
  });

  const [preview, setPreview] = useState({
    cover: null,
    reference: null,
    college: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    setImages({
      ...images,
      [name]: file,
    });

    setPreview({
      ...preview,
      [name]: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (images.cover) formData.append("cover", images.cover);
    if (images.reference) formData.append("reference", images.reference);
    if (images.college) formData.append("college", images.college);

    try {
      await addPlant(formData);

      alert("Plant added successfully 🌿");

      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Plant</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Plant Name</label>
          <input
            type="text"
            className="form-control"
            name="common_name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Scientific Name</label>
          <input
            type="text"
            className="form-control"
            name="scientific_name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Family</label>
          <input
            type="text"
            className="form-control"
            name="family"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Uses</label>
          <textarea
            className="form-control"
            name="uses"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image</label>

          <input
            type="file"
            name="cover"
            className="form-control"
            onChange={handleImage}
            required
          />

          {preview.cover && (
            <img
              src={preview.cover}
              className="img-thumbnail mt-2"
              style={{ maxWidth: "250px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Reference Image</label>

          <input
            type="file"
            name="reference"
            className="form-control"
            onChange={handleImage}
            required
          />

          {preview.reference && (
            <img
              src={preview.reference}
              className="img-thumbnail mt-2"
              style={{ maxWidth: "150px", borderRadius: "50%" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">College Location Image</label>

          <input
            type="file"
            name="college"
            className="form-control"
            onChange={handleImage}
            required
          />

          {preview.college && (
            <img
              src={preview.college}
              className="img-thumbnail mt-2"
              style={{ maxWidth: "250px" }}
            />
          )}
        </div>

        <button className="btn btn-success">Add Plant</button>
      </form>
    </div>
  );
}

export default AddPlant;
