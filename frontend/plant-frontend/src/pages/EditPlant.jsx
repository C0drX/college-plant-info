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
    origin: "",
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

  useEffect(() => {
    loadPlant();
  }, []);

  const loadPlant = async () => {
    try {
      const res = await getPlantById(id);
      const plant = res.data;

      setForm({
        common_name: plant.common_name || "",
        scientific_name: plant.scientific_name || "",
        family: plant.family || "",
        description: plant.description || "",
        uses: plant.uses || "",
        location: plant.location || "",
        origin: plant.origin || "",
      });

      // Extract images
      const cover = plant.images?.find((img) => img.includes("cover"));
      const reference = plant.images?.find((img) => img.includes("reference"));
      const college = plant.images?.find((img) => img.includes("college"));

      setPreview({
        cover: cover ? `${BASE_URL}${cover}` : null,
        reference: reference ? `${BASE_URL}${reference}` : null,
        college: college ? `${BASE_URL}${college}` : null,
      });
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
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Uses</label>
          <textarea
            className="form-control"
            name="uses"
            rows="4"
            value={form.uses}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Origin</label>
          <input
            type="text"
            className="form-control"
            name="origin"
            value={form.origin}
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

        {/* COVER IMAGE */}

        <div className="mb-3">
          <label className="form-label">Cover Image</label>

          <input
            type="file"
            name="cover"
            className="form-control"
            onChange={handleImage}
          />

          {preview.cover && (
            <img
              src={preview.cover}
              className="img-thumbnail mt-2"
              style={{ maxWidth: "250px" }}
            />
          )}
        </div>

        {/* REFERENCE IMAGE */}

        <div className="mb-3">
          <label className="form-label">Reference Image</label>

          <input
            type="file"
            name="reference"
            className="form-control"
            onChange={handleImage}
          />

          {preview.reference && (
            <img
              src={preview.reference}
              className="img-thumbnail mt-2"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        {/* COLLEGE IMAGE */}

        <div className="mb-3">
          <label className="form-label">College Image</label>

          <input
            type="file"
            name="college"
            className="form-control"
            onChange={handleImage}
          />

          {preview.college && (
            <img
              src={preview.college}
              className="img-thumbnail mt-2"
              style={{ maxWidth: "250px" }}
            />
          )}
        </div>

        <button className="btn btn-success">Update Plant</button>
      </form>
    </div>
  );
}

export default EditPlant;
