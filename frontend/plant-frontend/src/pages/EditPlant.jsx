import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantById, updatePlant } from "../services/api";
import { BASE_URL } from "../config/server";
import { CustomModal } from "../components/modals/CustomModal";

import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextArea";
import ImageUpload from "../components/ImageUpload";
import CategoryDropdown from "../components/CategoryDropdown";

function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalForm, setOriginalForm] = useState(null);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

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

  useEffect(() => {
    loadPlant();
  }, []);

  const loadPlant = async () => {
    try {
      const res = await getPlantById(id);
      const plant = res.data;

      // setForm({
      //   common_name: plant.common_name || "",
      //   scientific_name: plant.scientific_name || "",
      //   family: plant.family || "",
      //   description: plant.description || "",
      //   uses: plant.uses || "",
      //   location: plant.location || "",
      //   origin: plant.origin || "",
      //   category: plant.category || "",
      //   fruit_info: plant.fruit_info || "",
      //   medicinal_importance: plant.medicinal_importance || "",
      // });

      const initialData = {
        common_name: plant.common_name || "",
        scientific_name: plant.scientific_name || "",
        family: plant.family || "",
        description: plant.description || "",
        uses: plant.uses || "",
        location: plant.location || "",
        origin: plant.origin || "",
        category: plant.category || "",
        fruit_info: plant.fruit_info || "",
        medicinal_importance: plant.medicinal_importance || "",
      };

      setForm(initialData);
      setOriginalForm(initialData);

      const cover = plant.images?.find((img) => img.includes("cover"));
      const reference = plant.images?.find((img) => img.includes("reference"));
      const college = plant.images?.find((img) => img.includes("college"));

      setPreview({
        cover: cover ? `${BASE_URL}${cover}` : null,
        reference: reference ? `${BASE_URL}${reference}` : null,
        college: college ? `${BASE_URL}${college}` : null,
      });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setShowDeletedModal(true);
      } else {
        console.error(err);
      }
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

    const hasFormChanged =
      JSON.stringify(form) !== JSON.stringify(originalForm);

    const hasImageChanged = images.cover || images.reference || images.college;

    if (!hasFormChanged && !hasImageChanged) {
      alert("No changes detected. Please modify something before updating 🌿");
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
      await updatePlant(id, formData);

      alert("Plant updated successfully 🌿");

      navigate("/admin/dashboard");
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
          <h3 className="mb-4 fw-bold text-success">Edit Plant 🌿</h3>

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
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <CategoryDropdown
                      label="Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required={true}
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
                />

                <FormTextarea
                  label="Uses"
                  name="uses"
                  value={form.uses}
                  onChange={handleChange}
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
                    />
                  </div>

                  <div className="col-md-6">
                    <FormInput
                      label="Location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
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
                    label="Cover Image (upload to replace)"
                    name="cover"
                    onChange={handleImage}
                    preview={preview.cover}
                  />

                  <ImageUpload
                    label="Reference Image (upload to replace)"
                    name="reference"
                    onChange={handleImage}
                    preview={preview.reference}
                  />

                  <ImageUpload
                    label="College Image (upload to replace)"
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
                Update Plant
              </button>
            </div>
          </form>
        </div>
      </div>
      {showDeletedModal && (
        <CustomModal
          title="Plant Not Found"
          message="The plant you are trying to edit has been deleted. You may have to restore this plant first if you wish to edit it."
          onConfirm={() => navigate("/admin/dashboard")}
        />
      )}
    </div>
  );
}

export default EditPlant;
