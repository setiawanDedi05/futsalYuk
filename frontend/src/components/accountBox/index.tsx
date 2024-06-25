import styled from "styled-components";
import { SignInForm } from "./signInForm";
import { useState } from "react";
import { motion } from "framer-motion";

const BoxContainer = styled.div`
    width: 100%;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    background-color: #191A19;
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    top: -290px;
    right: -70px;
    transform: rotate(20deg);
    flex-direction: column;
    border-radius: 50%;
    background: rgb(54,241,133);
    background: linear-gradient(180deg, rgba(54,241,133,1) 20%, rgba(46,204,113,1) 100%);
`;

const HeaderContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 80px;
    left: 50px;
    z-index: 99;
`

const HeaderText = styled.h2`
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    margin: 0;
`;

const SubtitleText = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 200;
`;

const InnerContainer = styled.div`
    margin-top: 5vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

const backdropVariant = {
    expanded: {
        width: "250%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(0deg)"
    },
    collapse: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(20deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 1,
    stiffness: 30
}

export function AccountBox() {
    const [isExpanded, setIsExpanded] = useState(false);

    const playExpandingAnimation = () => {
        setIsExpanded(true);
        setTimeout(() => {
            setIsExpanded(false)
        }, expandingTransition.duration * 1000)
    }

    return <BoxContainer>
        <TopContainer>
            <BackDrop initial={false} transition={expandingTransition} animate={isExpanded ? "expanded" : "collapse"} variants={backdropVariant} />
            <HeaderContainer>
                <HeaderText>Hi 👋, Selamat Datang!</HeaderText>
                <SubtitleText>Gass, Login 🔥🔥🔥</SubtitleText>
            </HeaderContainer>
        </TopContainer>
        <InnerContainer>
            <SignInForm />
        </InnerContainer>
        <p onClick={playExpandingAnimation} style={{ color: "white" }}>Clickme</p>
    </BoxContainer>
}