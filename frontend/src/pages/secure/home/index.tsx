import styled from "styled-components"
import { device } from "../../../config/constants";
import { Outlet } from "react-router-dom";
import TopComponent from "./component/header";
import MessageComponent from "./component/message";
import TabComponent from "./component/tab";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;;
    @media ${device.tablet} {
        width: 60%;
        display: flex;
        position: absolute;
        right: 0;
    }
`

const ContentContainer = styled.div`
    margin-top: 6vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 10vh;
    @media ${device.tablet} {
        width: 80%;
        margin-top: 0;
        margin: 0 auto;
    }
`

export default function HomePage() {
    return <>
        <Container>
            <TopComponent />
            <MessageComponent /> 
            <ContentContainer>
                <Outlet/>
            </ContentContainer>          
        </Container>
       <TabComponent/>
    </>
}