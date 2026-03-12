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
