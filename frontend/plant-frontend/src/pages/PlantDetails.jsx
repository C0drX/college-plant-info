import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ImageGallery from "../components/ImageGallery";
import AboutSection from "../components/AboutSection";
import UsesSection from "../components/UsesSection";
import ScientificDetails from "../components/ScientificDetails";
import LocationSection from "../components/LocationSection";
import { API_URL } from "../config/server";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MorePlants from "../components/MorePlants";
import FruitSection from "../components/FruitSection";
import CategorySection from "../components/CategorySection";
import MedicinalImportance from "../components/MedicinalImportance";

const PlantDetails = () => {
  const [plant, setPlant] = useState(null);
  const { id } = useParams();

  const [plants, setPlants] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/plants`)
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/plants/${id}`)
      .then((res) => res.json())
      .then((data) => setPlant(data));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (!plant) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <HeroSection plant={plant} />
      {/* Image Gallery */}
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
        className="mb-5"
      >
        <CategorySection plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
      >
        <AboutSection description={plant.description} plantId={id} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
      >
        <FruitSection plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
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
        className="mb-5"
      >
        <ScientificDetails plant={plant} />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
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
