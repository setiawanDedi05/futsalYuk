import { useEffect, useRef } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";

interface Props {
    children: JSX.Element;
    width?: "fix-content" | "100%";
}

export const Reveal = ({ children, width = "fix-content" }: Props) => {
    const ref = useRef(null)
    const { scrollY } = useScroll({
        target: ref
    });

    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (scrollY) {
            mainControls.start("visible");
            slideControls.start("visible");
        }
    }, [mainControls, slideControls, scrollY])
    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >{children}</motion.div>
            <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: "100%" }
                }}
                initial="hidden"
                animate={slideControls}
                transition={{
                    duration: 0.5,
                    ease: "easeIn"
                }}
                style={{
                    position: "absolute",
                    top: 4,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgb(54,241,133)",
                    zIndex: 5,
                }}
            />
        </div>
    );
}