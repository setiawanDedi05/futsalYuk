import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as color  from "../../../../config/color";
import styled from "styled-components"
import { device } from "../../../../config/constants"

const TopContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 5vh;
    background-color: ${color.green};
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    @media ${device.tablet} {
      display: none;
    }
`

const TopTitle = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
`
export default function TopComponent() {
    return <TopContainer>
        <TopTitle>GoRivalGo</TopTitle>
        <FontAwesomeIcon id="message" icon={faMessage} color={color.secondary} />
    </TopContainer>
}