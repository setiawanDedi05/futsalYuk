import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Picture from "../../../assets/images/Green Soccer Field Aerial.jpg";
import { Reveal } from "../../../uikit/reveal";
import Lenis from 'lenis'
import { AccountBox } from "../../../components/accountBox";
import styled from "styled-components";
import { device } from "../../../config/constants";

const lenis = new Lenis();
export default function Landing() {
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

    const Main = styled.div`
    display: flex;
  `
    const Container = styled.div`
    height: 150vh;
    position: relative;
    display: none;
    @media ${device.laptop} {
      display: block;
    }
    @media ${device.laptopL} {
      display: block;
      min-width: 700px;
    }
  `;

    const StickyContainer = styled.div`
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  `;

    const Backdrop = styled.div`
    color: white;
    width: 500px;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-Index: 2;
    margin: 0px auto;
    @media ${device.laptopL} {
      min-width: 700px;
    }
  `;

    const Title = styled.h1`
    font-family: "Poppins", sans-serif;
    line-height: 1.24;
    font-weight: 600;
    margin: 0;
    font-size: 2em;
    @media ${device.laptopL} {
      font-size: 5em;
    }
  `

    const Subtitle = styled.h2`
    font-family: "Poppins", sans-serif;
    text-align: center;
    font-weight: 300;
    font-size: 1em;
    margin: 0;
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

    const Footer = styled.footer`
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    background-color: rgba(54,241,133);
     @media ${device.tablet} {
      display: flex;
    }
  `;

    return (
        <>
            <Main>
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
            </Main >
            <Footer>GoRivalGo © 2024</Footer>
        </>
    )

}