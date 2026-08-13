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
      <motion.section
        className="hero-text"
        // Start hidden and a little lower
        initial={{ opacity: 0, y: 30 }}
        // Move to the normal position and show it
        animate={{ opacity: 1, y: 0 }}
        // Make the animation take 0.6 seconds
        transition={{ duration: 0.6 }}
      >
        <h1>
          Cultivate real habits.
          <br />
          {/* This part of the heading is green */}
          <span>Watch your virtual garden bloom.</span>
        </h1>

        {/* Short explanation of the app */}
        <p>
          Build healthy routines, grow adorable digital plants, and turn
          self-care into a relaxing daily ritual.
        </p>

        {/* Our two buttons */}
        <div className="buttons">
          {/* Take the user to the garden */}
          <button onClick={() => setActiveTab("garden")}>Get Started →</button>

          {/* Quick demo button */}
          <button className="demo" onClick={() => setActiveTab("garden")}>
            Quick Demo
          </button>
        </div>
      </motion.section>
    </div>
  );
}
