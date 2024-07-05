import { faHouse, faPlay, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import styled from "styled-components"
import { device } from "../../../../config/constants"
import * as  color from "../../../../config/color"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const BottomTabContainer = styled.div`
    width: 100%;
    height: 8vh;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${color.light};
    
    @media ${device.tablet} {
        width: 100px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        overflow: visible;
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
        const path = tabName === 'home' ? '' : tabName;
        navigate(path!)
    }
    return <BottomTabContainer>
        <TabItem id="home" onClick={() => handleMouseEnter("home")} >
            <motion.div animate={{ rotate: activeTab === 'home' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faHouse} />
            </motion.div>
        </TabItem>
        <TabItem id="play" onClick={() => handleMouseEnter("play")}>
            <motion.div animate={{ rotate: activeTab === 'play' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faPlay} />
            </motion.div>
        </TabItem>
        <TabItem id="config" onClick={() => handleMouseEnter("profile")}>
            <motion.div animate={{ rotate: activeTab === 'profile' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                <FontAwesomeIcon icon={faUser} />
            </motion.div>
        </TabItem>
    </BottomTabContainer>
}