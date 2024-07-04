import styled from "styled-components"
import * as color from '../../../config/color';
import Tab, { TabItem } from "./tab";
import { device } from "../../../config/constants";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
    min-height: 80vh;
    justify-content: center;
    align-items: center;
    @media ${device.tablet} {
        display: flex;
        position: relative;
        right: 0;
    }

`

const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8vh;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
`

const AccountName = styled.span`
    font-size: 1.5rem;
`

const AccountEmail = styled.span`
    font-size: 1rem;
    color: ${color.gray};
`

const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    height:100%;
    min-height: 40vh;
    background-color: ${color.light};
    flex-direction: column;
    margin: auto;
`

const BioContainer = styled.div`
    width: 80%;
    height: 100%;
    background-color: ${color.lightOpacity};
`

const Bio = styled.blockquote`
    font-size: 0.5rem;
    text-align: center;
    &::before{
        content: '"';
    }
    &::after{
        content: '"';
    }
`

const DetailContainer = styled.div`
    display: flex;
    width: 80%;
    background-color: ${color.light};
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    >:first-child{
        border-right: 1px solid ${color.black};
    }

    >:last-child{
        border-left: 1px solid ${color.black};
    }
`

const DetailItem = styled.div`
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DetailCount = styled.span`
    font-size: 1rem;
`

const DetailTag = styled.span`
    font-size: 0.5rem;
`

export default function ConfigPage() {

    const onTabSelected = (index: any) => {
    };
    return <Container>
        <AccountContainer>
            <Avatar src="https://avatars.githubusercontent.com/u/100000000?v=4" />
            <AccountName>John Doe</AccountName>
            <AccountEmail>john.doe@gmail.com</AccountEmail>
        </AccountContainer>
        <BioContainer>
            <Bio>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem praesentium aperiam, explicabo, tempore nisi eius repellendus ducimus numquam facere minus, inventore vel fuga! Eum molestias, repellat unde cupiditate tenetur asperiores.</Bio>
        </BioContainer>
        <DetailContainer>
            <DetailItem>
                <DetailCount>0</DetailCount>
                <DetailTag>Post</DetailTag>
            </DetailItem>
            <DetailItem>
                <DetailCount>100M</DetailCount>
                <DetailTag>Follower</DetailTag>
            </DetailItem>
            <DetailItem>
                <DetailCount>100M</DetailCount>
                <DetailTag>FOllowing</DetailTag>
            </DetailItem>
        </DetailContainer>
        <ContentContainer>
            <Tab onTabSelected={onTabSelected}>
                <TabItem>Post</TabItem>
                <TabItem>Follower</TabItem>
                <TabItem>Following</TabItem>
            </Tab>
        </ContentContainer>
    </Container>
}