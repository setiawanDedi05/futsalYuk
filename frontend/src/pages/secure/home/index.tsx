import styled from "styled-components"
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
        width: 60%;
        display: flex;
        position: absolute;
        right: 0;
    }
`

export default function HomePage() {
    return <>
        <Container>
            <TopComponent />
            <MessageComponent />           
            <Outlet/>
        </Container>
       <TabComponent/>
    </>
}