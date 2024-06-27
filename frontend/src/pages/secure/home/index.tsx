import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faHouse, faPlay, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import * as color from "../../../config/color";
import { motion } from "framer-motion";
import { useState } from "react";

const Container = styled.div`
    width: 100%;
    height: auto;
    background-color: ${color.secondary};
    display: flex;
    flex-direction: column;
`

const TopContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 5vh;
    background-color: ${color.white};
`

const PostContainer = styled.div`
    margin-top: 6vh;
    padding: 10px 20px;
    gap: 2vh;
    display: flex;
    flex-direction: column;
`

const PostItem = styled.div`
    width: 100%;
    height: 150px;
    border-radius: 16px;
    background-color: ${color.primary};
`

const BottomTabContainer = styled.div`
    display: flex;
    width: 100%;
    height: 8vh;
    position: fixed;
    flex-wrap: wrap;
    bottom: 0;
    left: 0;
    background-color: ${color.primary};
    justify-content: center;
    align-items: center;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
    border-top: 2px solid ${color.secondary};
`

const TabItem = styled.div`
    width: 25%;
    height: 100%;
    color: ${color.secondary};
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1):hover{
        background-color: ${color.green};
        border-top-left-radius:16px ;
        border-top: 2px solid ${color.secondary};
        color: ${color.white}
    }
    &:nth-child(4):hover{
        background-color: ${color.green};
        border-top-right-radius:16px ;
        border-top: 2px solid ${color.secondary};
        color: ${color.white}
    }
    &:hover{
        background-color: ${color.green};
        border-top: 2px solid ${color.secondary};
        color: ${color.white}
    }
`

export default function HomePage() {
    const [activeTab, setactiveTab] = useState<string | null | undefined>();

    const handleMouseEnter = (tabName?: string) => {
        setactiveTab(tabName);
    }
    const handleMouseLeave = (tabName?: string) => {
        setactiveTab(tabName);
    }

    const postDummy = [1, 2, 3, 4, 5];

    return <>
        <Container>
            <TopContainer />
            <PostContainer>
                {
                    postDummy.map(() => {
                        return <PostItem />
                    })
                }
            </PostContainer>
        </Container>
        <BottomTabContainer>
            <TabItem onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("home")} onPointerEnter={() => handleMouseEnter("home")}>
                <motion.div animate={{ rotate: activeTab === 'home' ? 30 : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faHouse} />
                </motion.div>
            </TabItem>
            <TabItem onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("friend")} onPointerEnter={() => handleMouseEnter("friend")}>
                <motion.div animate={{ rotate: activeTab === 'friend' ? 30 : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </motion.div>
            </TabItem>
            <TabItem onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("play")} onPointerEnter={() => handleMouseEnter("play")}>
                <motion.div animate={{ rotate: activeTab === 'play' ? 30 : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faPlay} />
                </motion.div></TabItem>
            <TabItem onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("profile")} onPointerEnter={() => handleMouseEnter("profile")}>
                <motion.div animate={{ rotate: activeTab === 'profile' ? 30 : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faGear} />
                </motion.div></TabItem>
        </BottomTabContainer>
    </>
}