import React from "react";
import { BASE_URL } from "../config/server";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = ({ plant }) => {
  const coverImage = plant.images.find((img) => img.includes("cover"));
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div
      className="position-relative w-100 mb-5"
      style={{ height: "60vh", overflow: "hidden" }}
    >
      <motion.img
        src={`${BASE_URL}${coverImage}`}
        className="w-100 h-100"
        style={{
          objectFit: "cover",
          y,
        }}
      />

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
        }}
      ></div>

      <motion.div
        className="position-absolute bottom-0 w-100 text-center text-white pb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="fw-bold display-5">{plant.common_name}</h1>

        <p className="fs-5">
          <i>{plant.scientific_name}</i>
        </p>

        <p className="mb-0">Family: {plant.family}</p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
