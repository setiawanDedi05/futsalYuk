import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as color from "../../../../config/color";
import styled from "styled-components"
import { device } from "../../../../config/constants"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TopContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 5vh;
    background-color: ${color.light};
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    @media ${device.tablet} {
      display: none;
    }
`

const ChatButton = styled(motion(FontAwesomeIcon))`
    background-color: transparent;
    filter :drop-shadow(2px 2px 2px ${color.gray});
    border:none;
    margin-left: auto;
    color: ${color.black};
    &:hover{
        filter: none;
        transform: translateY(2px);
        cursor: pointer;
    }
    &:active{
        border: none
    }
`
export default function TopComponent() {
    const navigate = useNavigate()

    const goToChat = () => {
        navigate("/secure/chat/1")
    }
    return <TopContainer>
        <ChatButton
            id="message"
            icon={faMessage}
            color={color.secondary}
            whileHover={{
                rotate: 30
            }}
            whileTap={{
                rotate: 30
            }}
            transition={{ type: "spring" }}
            onClick={goToChat} />
    </TopContainer>
}