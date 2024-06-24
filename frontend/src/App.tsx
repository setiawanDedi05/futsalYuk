import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Picture from "./assets/images/Green Soccer Field Aerial.jpg";
import { Reveal } from "./uikit/reveal";
import Lenis from 'lenis'

const lenis = new Lenis();

export default function App() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const scale4 = useTransform(scrollYProgress, [0, 0.5], [5, 0.5])
  return (
    <>
      <div ref={container} className="container">
        <div className="sticky">
          <div className="backdrop">
            <Reveal>
              <h1 className="headTitle block">GoRivalGo</h1>
            </Reveal>
            <Reveal>
              <h2 className="block">
                Cari Teman Futsal mu dan Ayo Olahraga!
              </h2>
            </Reveal>
          </div>
          <motion.div style={{ scale: scale4 }} className="el">
            <div className="image-container">
              <img className="image-item" src={Picture} alt="image-hero" />
            </div>
          </motion.div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "150vh", zIndex: 100 }}>
        <div style={{ color: "white" }}>Register</div>
        <div style={{ color: "white" }}>Login</div>
      </div>
    </>
  );
}