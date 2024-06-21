import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Picture from "./assets/images/Green Soccer Field Aerial.jpg";
export default function App() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  return (
    <div ref={container} className="container">
      <div className="sticky">
        <motion.div style={{scale: scale4}} className="el">
          <div className="image-container">
            <img className="image-item" src={Picture} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}