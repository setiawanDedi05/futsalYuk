import styled from "styled-components"
import grassTexture from "../../../assets/images/background.jpg";
import { device } from "../../../config/constants";
import { Outlet } from "react-router-dom";
import TopComponent from "./component/header";
import MessageComponent from "./component/message";
import TabComponent from "./component/tab";

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;;
    @media ${device.tablet} {
        display: flex;
        position: relative;
    }
`

const ContainerBg = styled.div`
    background-image: url(${grassTexture});
    background-repeat: repeat;
    background-size: 300px 100px;
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .6;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    @media ${device.tablet} {
        position: fixed;
        background-repeat: repeat;
        background-size: 100%;
    }
`

export default function HomePage() {
    return <>
        <Container>
            <ContainerBg />
            <TopComponent />
            <MessageComponent />           
            <Outlet/>
        </Container>
       <TabComponent/>
    </>
}