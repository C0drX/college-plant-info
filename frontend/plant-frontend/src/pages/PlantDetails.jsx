<<<<<<< Updated upstream
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getPlantById } from "../services/api";
// import { BASE_URL } from "../config/server";

// function PlantDetails() {
//   const { id } = useParams();

//   const [plant, setPlant] = useState(null);

//   useEffect(() => {
//     loadPlant();
//   }, []);

//   const loadPlant = async () => {
//     try {
//       const res = await getPlantById(id);
//       setPlant(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!plant) {
//     return (
//       <div className="container mt-5 text-center">
//         Loading plant information...
//       </div>
//     );
//   }

//   // Extract images from array
//   const coverImage = plant.images?.find((img) => img.includes("cover"));
//   const referenceImage = plant.images?.find((img) => img.includes("reference"));
//   const collegeImage = plant.images?.find((img) => img.includes("college"));

//   return (
//     <div className="container mt-4">
//       {/* HERO IMAGE */}

//       {coverImage && (
//         <img
//           src={`${BASE_URL}${coverImage}`}
//           className="img-fluid w-100 mb-4 rounded shadow"
//           style={{
//             maxHeight: "420px",
//             objectFit: "cover",
//           }}
//           alt={plant.common_name}
//         />
//       )}

//       {/* PROFILE STYLE HEADER */}

//       <div className="d-flex align-items-center mb-4">
//         {referenceImage && (
//           <img
//             src={`${BASE_URL}${referenceImage}`}
//             alt="reference"
//             style={{
//               width: "110px",
//               height: "110px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginRight: "20px",
//             }}
//           />
//         )}

//         <div>
//           <h2 className="mb-1">{plant.common_name}</h2>

//           <p className="text-muted mb-1">{plant.scientific_name}</p>

//           <p className="mb-0">
//             <strong>Family:</strong> {plant.family}
//           </p>
//         </div>
//       </div>

//       {/* DESCRIPTION */}

//       <div className="mb-4">
//         <h4>Description</h4>

//         <p style={{ whiteSpace: "pre-line" }}>{plant.description}</p>
//       </div>

//       {/* USES */}

//       <div className="mb-4">
//         <h4>Uses</h4>

//         <p style={{ whiteSpace: "pre-line" }}>{plant.uses}</p>
//       </div>

//       {/* LOCATION */}

//       <div className="mb-4">
//         <h4>Location in College</h4>

//         <p>{plant.location}</p>

//         {collegeImage && (
//           <img
//             src={`${BASE_URL}${collegeImage}`}
//             alt="college location"
//             className="img-fluid rounded shadow"
//             style={{
//               maxHeight: "420px",
//               objectFit: "cover",
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default PlantDetails;
//!-----------------Modified UI/UX--------------------------

import React, { useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlants, getPlantById } from "../services/api"; // adjust path
import { motion } from "framer-motion";
>>>>>>> Stashed changes
import HeroSection from "../components/HeroSection";
import ImageGallery from "../components/ImageGallery";
import CategorySection from "../components/CategorySection";
import AboutSection from "../components/AboutSection";
import FruitSection from "../components/FruitSection";
import UsesSection from "../components/UsesSection";
import MedicinalImportance from "../components/MedicinalImportance";
import ScientificDetails from "../components/ScientificDetails";
import LocationSection from "../components/LocationSection";
import MorePlants from "../components/MorePlants";

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
        setPlants(res.data);
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
        <UsesSection uses={plant.uses} plantId={id} />
      </motion.div>
<<<<<<< Updated upstream
=======

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-5"
      >
        <MedicinalImportance plant={plant} />
      </motion.div>
>>>>>>> Stashed changes

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
