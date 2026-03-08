import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantById, updatePlant } from "../services/api";
import { BASE_URL } from "../config/server";

function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    common_name: "",
    scientific_name: "",
    family: "",
    description: "",
    uses: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    loadPlant();
  }, []);

  const loadPlant = async () => {
    try {
      const res = await getPlantById(id);

      setForm({
        common_name: res.data.common_name || "",
        scientific_name: res.data.scientific_name || "",
        family: res.data.family || "",
        description: res.data.description || "",
        uses: res.data.uses || "",
        location: res.data.location || "",
      });

      setPreview(`${BASE_URL}/images/${res.data.image}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      await updatePlant(id, formData);

      alert("Plant updated successfully 🌿");

      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Plant</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Plant Name</label>
          <input
            type="text"
            className="form-control"
            name="common_name"
            value={form.common_name}
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
            value={form.scientific_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Family</label>
          <input
            type="text"
            className="form-control"
            name="family"
            value={form.family}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Uses</label>
          <textarea
            className="form-control"
            name="uses"
            value={form.uses}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Replace Image</label>

          <input type="file" className="form-control" onChange={handleImage} />
        </div>

        {preview && (
          <div className="mb-3">
            <p>Image Preview:</p>

            <img
              src={preview}
              alt="preview"
              className="img-thumbnail"
              style={{ maxWidth: "250px" }}
            />
          </div>
        )}

        <button className="btn btn-success">Update Plant</button>
      </form>
    </div>
  );
}

export default EditPlant;
