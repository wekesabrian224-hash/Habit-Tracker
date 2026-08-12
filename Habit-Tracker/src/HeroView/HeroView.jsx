import { motion } from "motion/react";
import { PixelPlant } from "../garden/plants.jsx";
import "./HeroView.css";

function HeroView({ setActiveTab }) {
  return (
    <div className="hero">
      {/*the blurry circles in the background */}
      <div className="blob blob-one"></div>
      <div className="blob blob-two"></div>

      {/* main text section */}
      <motion className="section"></motion>
    </div>
  );
}
