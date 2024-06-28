import styled from "styled-components";
import { SignInForm } from "./signInForm";
import { useState } from "react";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { AccountPage } from "./common";
import { SignUpForm } from "./signUpForm";
import { device } from "../../config/constants";
import * as color from "../../config/color";

const BoxContainer = styled.div`
    width: 100%;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    background-color: ${color.secondary};
    position: relative;
    overflow: hidden;
     @media ${device.tablet}  {
        width: 80%;
        min-height: 100vh;
        margin: 10%;
        display: flex;
        border-radius:16px;
        right: 0;
    }

    @media ${device.laptop}  {
        width: 400px;
        min-height: 100vh;
        margin: 2em 5em;
        display: flex;
        border-radius:16px;
        position: fixed;
        right: 0;
        top:0;
    }

    @media ${device.laptopL}  {
        width: 400px;
        min-height: 100vh;
        margin: 2em 10em;
        display: flex;
        border-radius:16px;
        position: fixed;
        right: 0;
        top:0;
    }
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

const HeaderContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 80px;
    left: 50px;
    z-index: 99;
`

const HeaderText = styled(motion.h2)`
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    margin: 0;
    @media ${device.laptop}  {
        font-size: 25px;
    }
`;

const SubtitleText = styled(motion.h3)`
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
    const [active, setActive] = useState("signin");
    const [up, setup] = useState(false);

    const playExpandingAnimation = () => {
        setIsExpanded(true);
        setTimeout(() => {
            setIsExpanded(false)
        }, expandingTransition.duration * 1000)
    }

    const switchToSignUp = () => {
        setup(true)
        playExpandingAnimation();
        setTimeout(() => {
            setup(false)
            setActive("signup")
        }, 400);
    }

    const switchToSignIn = () => {
        setup(true);
        playExpandingAnimation();
        setTimeout(() => {
            setup(false)
            setActive("signin")
        }, 400);
    }

    const contextValue = {
        switchToSignIn,
        switchToSignUp
    }

    const transition = { delay: 1, type: "spring" }
    const variants = {
        hide: { y: -300 },
        show: { y: 0 }
    }

    return (
        <AccountContext.Provider value={contextValue}>
            <BoxContainer>
                <TopContainer>
                    <BackDrop initial={false} transition={expandingTransition} animate={isExpanded ? "expanded" : "collapse"} variants={backdropVariant} />
                    <HeaderContainer initial={false} animate={up ? { y: -300 } : { y: 0 }} transition={{ ease: "easeInOut" }} >
                        {active === AccountPage.SIGNIN && <HeaderText variants={variants} initial="hide" animate="show" transition={transition}>Hi 👋, Selamat Datang!</HeaderText>}
                        {active === AccountPage.SIGNUP && <HeaderText variants={variants} initial="hide" animate="show" transition={transition}>Hi 👋, Salam Olahraga!</HeaderText>}
                        {active === AccountPage.SIGNIN && <SubtitleText variants={variants} initial="hide" animate="show" transition={transition}>Gass, Login 🔥🔥🔥</SubtitleText>}
                        {active === AccountPage.SIGNUP && <SubtitleText variants={variants} initial="hide" animate="show" transition={transition}>Gass, Buat Akun 🔥🔥🔥</SubtitleText>}
                    </HeaderContainer>
                </TopContainer>
                <InnerContainer>
                    {active === AccountPage.SIGNIN && <SignInForm />}
                    {active === AccountPage.SIGNUP && <SignUpForm />}
                </InnerContainer>
            </BoxContainer>
        </AccountContext.Provider>
    )
}