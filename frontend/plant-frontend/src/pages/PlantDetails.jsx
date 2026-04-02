import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlants, getPlantById } from "../services/api"; // adjust path
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ImageGallery from "../components/ImageGallery";
import AboutSection from "../components/AboutSection";
import UsesSection from "../components/UsesSection";
import ScientificDetails from "../components/ScientificDetails";
import LocationSection from "../components/LocationSection";
import MorePlants from "../components/MorePlants";
import FruitSection from "../components/FruitSection";
import CategorySection from "../components/CategorySection";
import MedicinalImportance from "../components/MedicinalImportance";

const PlantDetails = () => {
  const [plant, setPlant] = useState(null);
  const [plants, setPlants] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Fetch all plants (for "MorePlants")
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await getPlants();
        const activePlants = res.data.filter((plant) => plant.is_active);
        setPlants(activePlants);
      } catch (err) {
        console.error("Error fetching plants:", err);
      }
    };

    fetchPlants();
  }, []);

  // 🔹 Fetch single plant (MAIN LOGIC)
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await getPlantById(id);
        setPlant(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          navigate("/plant-not-available");
        } else {
          console.error("Error fetching plant:", err);
        }
      }
    };

    fetchPlant();
  }, [id, navigate]);

  // 🔹 Scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 🔹 Animations (same as yours)
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // 🔥 Important: plant load hone ka wait
  if (!plant) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <HeroSection plant={plant} />

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
      >
        <ImageGallery images={plant.images} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-1"
      >
        <CategorySection plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-4"
      >
        <AboutSection description={plant.description} plantId={id} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-1"
      >
        <FruitSection plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-1"
      >
        <UsesSection uses={plant.uses} plantId={id} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
      >
        <MedicinalImportance plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-1"
      >
        <ScientificDetails plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-1"
      >
        <LocationSection plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
      >
        <MorePlants plants={plants} currentPlantId={plant.id} />
      </motion.div>
    </div>
  );
};

export default PlantDetails;
