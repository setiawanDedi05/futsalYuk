import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Picture from "./assets/images/Green Soccer Field Aerial.jpg";
import { Reveal } from "./uikit/reveal";
import Lenis from 'lenis'
import { AccountBox } from "./components/accountBox";
import styled from "styled-components";
import { device } from "./config/constants";

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

  const Container = styled.div`
    height: 150vh;
    position: relative;
  `;

  const StickyContainer = styled.div`
    position: sticky;
    top: 0;
    height: 100vh;
    background-color: orange;
    overflow: hidden;
  `;

  const Backdrop = styled.div`
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-Index: 2;
    margin: 0px auto;
  `;

  const Title = styled.h1`
    font-family: "Poppins", sans-serif;
    font-size: 4em;
    line-height: 1.24;
    font-weight: 600;
    margin: 0;
    @media ${device.mobileL} {
      font-size: 2em;
    }
  `

  const Subtitle = styled.h2`
    font-family: "Poppins", sans-serif;
    font-size: 2em;
    text-align: center;
    font-weight: 300;
    margin: 0;
    @media ${device.mobileL} {
      font-size: 1em;
    }
  `;

  const ImageContainer = styled.div`
    position: relative;
  `;

  const ImageItem = styled.img`
    object-fit: cover;
  `;

  const HeroContainer = styled(motion.div)`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `


  return (
    <>
      <Container ref={container} >
        <StickyContainer>
          <Backdrop>
            <Reveal>
              <Title>GoRivalGo</Title>
            </Reveal>
            <Reveal>
              <Subtitle>
                Cari Teman Futsal mu dan Ayo Olahraga!
              </Subtitle>
            </Reveal>
          </Backdrop>
          <HeroContainer style={{ scale: scale4 }}>
            <ImageContainer>
              <ImageItem src={Picture} alt="image-hero" />
            </ImageContainer>
          </HeroContainer>
        </StickyContainer>
      </Container>
      <AccountBox />
    </>
  );
}