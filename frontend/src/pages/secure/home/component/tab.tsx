import { faHouse, faUserGroup, faPlay, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import styled from "styled-components"
import { device } from "../../../../config/constants"
import * as  color from "../../../../config/color"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const BottomTabContainer = styled.div`
    display: flex;
    width: 100%;
    height: 8vh;
    position: fixed;
    flex-wrap: wrap;
    bottom: 0;
    left: 0;
    background-color: ${color.lightOpacity};
    justify-content: center;
    align-items: center;
    overflow: hidden;
    @media ${device.tablet} {
        width: 100px;
        display: flex;
        flex-wrap: nowrap;
        min-height: 100vh;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        >:last-child{
            margin-top: auto;
        }
    }
`

const TabItem = styled.div`
    width: 20%;
    height: 60%;
    color: ${color.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    
    &:hover{
        border-left: none;
        color: ${color.white};
        border-radius: 50px;
        background-color: ${color.green};
    }
    
    @media ${device.tablet} {
        width: 100%;
        height: 100px;
        >div{
            margin-right: 15px;
        }
        &:hover{
            border-radius: 0%;
            border-bottom: none;
            border-left: 2px solid ${color.secondary};
            color: ${color.white};
        }
    }
`

export default function TabComponent() {
    const [activeTab, setactiveTab] = useState<string | null | undefined>("home");
    const navigate = useNavigate();

    const handleMouseEnter = (tabName?: string) => {
        setactiveTab(tabName);
        navigate(tabName!)
    }
    return <BottomTabContainer>
        <TabItem id="home" onClick={() => handleMouseEnter("home")} >
            <motion.div animate={{ rotate: activeTab === 'home' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faHouse} />
            </motion.div>
        </TabItem>
        <TabItem id="friend" onClick={() => handleMouseEnter("friend")} >
            <motion.div animate={{ rotate: activeTab === 'friend' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faUserGroup} />
            </motion.div>
        </TabItem>
        <TabItem id="play" onClick={() => handleMouseEnter("play")}>
            <motion.div animate={{ rotate: activeTab === 'play' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faPlay} />
            </motion.div>
        </TabItem>
        <TabItem id="config" onClick={() => handleMouseEnter("profile")}>
            <motion.div animate={{ rotate: activeTab === 'profile' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faGear} />
            </motion.div>
        </TabItem>
    </BottomTabContainer>
}