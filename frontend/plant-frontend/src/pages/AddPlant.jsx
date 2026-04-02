import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlant } from "../services/api";

import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextArea";
import ImageUpload from "../components/ImageUpload";
import CategoryDropdown from "../components/CategoryDropdown";

function AddPlant() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    common_name: "",
    scientific_name: "",
    family: "",
    description: "",
    uses: "",
    origin: "",
    location: "",
    category: "",
    fruit_info: "",
    medicinal_importance: "",
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
    if (!images.cover || !images.reference || !images.college) {
      alert("Please upload all plant images 🌿");
      return;
    }

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
    <div className="container py-4">
      <div
        className="card shadow-lg border-0"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        <div className="card-body p-4">
          <h3 className="mb-4 fw-bold text-success">🌿 Add New Plant</h3>

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Basic Information</h5>

                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="Plant Name"
                      name="common_name"
                      value={form.common_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <FormInput
                      label="Scientific Name"
                      name="scientific_name"
                      value={form.scientific_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-md-6">
                    <FormInput
                      label="Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Decorative / Flowering / Fruit / Medicinal"
                    />
                  </div> */}

                  <div className="col-md-6">
                    <CategoryDropdown
                      label="Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <FormInput
                      label="Fruit Info"
                      name="fruit_info"
                      value={form.fruit_info}
                      onChange={handleChange}
                      placeholder="Mango / Guava / No edible fruit"
                    />
                  </div>
                </div>

                <FormInput
                  label="Family"
                  name="family"
                  value={form.family}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Plant Details</h5>

                <FormTextarea
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />

                <FormTextarea
                  label="Uses"
                  name="uses"
                  value={form.uses}
                  onChange={handleChange}
                  required
                />

                <FormTextarea
                  label="Medicinal Importance"
                  name="medicinal_importance"
                  value={form.medicinal_importance}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Origin + Location */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Origin & Location</h5>

                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="Origin"
                      name="origin"
                      value={form.origin}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <FormInput
                      label="Location at College"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Plant Images</h5>

                <div className="row">
                  <ImageUpload
                    label="Cover Image"
                    name="cover"
                    onChange={handleImage}
                    preview={preview.cover}
                  />

                  <ImageUpload
                    label="Reference Image"
                    name="reference"
                    onChange={handleImage}
                    preview={preview.reference}
                  />

                  <ImageUpload
                    label="College Location Image"
                    name="college"
                    onChange={handleImage}
                    preview={preview.college}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-success px-5 py-3 fw-semibold"
                style={{ borderRadius: "10px", minWidth: "220px" }}
              >
                Add Plant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPlant;
