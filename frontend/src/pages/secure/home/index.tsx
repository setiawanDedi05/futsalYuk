import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faHouse, faMessage, faPlay, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import * as color from "../../../config/color";
import { motion } from "framer-motion";
import { useState } from "react";
import { IPost } from "../../../services/dto/post";
import grassTexture from "../../../assets/images/Grass texture background.jpg";
import { device } from "../../../config/constants";

const Container = styled.div`
    width: 100%;
    height: auto;
    /* background-color: ${color.secondary}; */
    display: flex;
    flex-direction: column;
    background: url(${grassTexture});
`

const TopContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 5vh;
    background-color: ${color.primary};
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
`

const TopAvatar = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${color.secondary};
`

const TopTitle = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
`

const PostContainer = styled.div`
    margin-top: 6vh;
    padding: 10px 20px;
    gap: 2vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 10vh;
    @media ${device.laptop} {
      width: 50%;
      margin: auto;
    }
`

const PostItem = styled.div`
    width: 100%;
    height: 150px;
    border-radius: 2px;
    background-color: ${color.primary};
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    font-size: 12px;
    &:hover{
        box-shadow: 2px 2px ${color.white};
    }
`

const PostImage = styled.img`
    width: 100%;
    height: 100px;
    background-color: ${color.white};
    object-fit: cover;
`

const PostCaptionContainer = styled.div`
    background-image: '';
    display: flex;
    height: 50px;
    flex-direction: column;
    padding-top: 10px;
`

const PostAuthorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 10px;
    padding: 0 20px;
    font-family: 'Poppins', sans-serif;
`

const PostAuthorAvatar = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: ${color.white};
`

const PostAuthorNameContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const PostAuthorPlace = styled.div`
    color: ${color.gray};
    font-size: 10px;
`

const PostAuthorName = styled.div`
    color: ${color.secondary};
`

const PostTime = styled.div`
    margin-left: auto;
    color: ${color.black};
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

    &:hover{
        background-color: ${color.green};
        border-top: 2px solid ${color.secondary};
        color: ${color.white};
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

    const postDummy = [
        {
            id: 1,
            name: "Dedi Setiawan",
            place: "Tokyo",
            time: "1 Min ago",
            image: "https://picsum.photos/500/200"
        },
        {
            id: 2,
            name: "Puzha Fauzha",
            time: "1 hour ago",
            place: "Germany",
            image: "https://picsum.photos/500/200"
        },
        {
            id: 3,
            name: "Ibnu Malik",
            time: "1 hour ago",
            place: "Japan",
            image: "https://picsum.photos/500/200"
        },
        {
            id: 4,
            name: "Arif Ibrahim",
            time: "1 hour ago",
            place: "Arab",
            image: "https://picsum.photos/500/200"
        },
        {
            id: 5,
            name: "Anwar Sanusi",
            time: "1 hour ago",
            place: "Arab",
            image: "https://picsum.photos/500/200"
        },
    ];

    return <>
        <Container>
            <TopContainer>
                <TopAvatar/>
                <TopTitle>Home</TopTitle>
                <FontAwesomeIcon icon={faMessage} color={color.secondary} />
            </TopContainer>
            <PostContainer>
                {
                    postDummy.map(({ id, image, name, time, place }: IPost) => {
                        return <PostItem id={`${id}-post`}>
                            <PostImage src={image} alt={`${name}-image`} loading="lazy" />
                            <PostCaptionContainer>
                                <PostAuthorContainer>
                                    <PostAuthorAvatar />
                                    <PostAuthorNameContainer>
                                        <PostAuthorName>{name}</PostAuthorName>
                                        <PostAuthorPlace>{place}</PostAuthorPlace>
                                    </PostAuthorNameContainer>
                                    <PostTime>{time}</PostTime>
                                </PostAuthorContainer>
                            </PostCaptionContainer>
                        </PostItem>
                    })
                }
            </PostContainer>
        </Container>
        <BottomTabContainer>
            <TabItem id="home" onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("home")} onPointerEnter={() => handleMouseEnter("home")}>
                <motion.div animate={{ rotate: activeTab === 'home' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faHouse} />
                </motion.div>
            </TabItem>
            <TabItem id="friend" onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("friend")} onPointerEnter={() => handleMouseEnter("friend")}>
                <motion.div animate={{ rotate: activeTab === 'friend' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </motion.div>
            </TabItem>
            <TabItem id="play" onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("play")} onPointerEnter={() => handleMouseEnter("play")}>
                <motion.div animate={{ rotate: activeTab === 'play' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faPlay} />
                </motion.div></TabItem>
            <TabItem id="config" onPointerLeave={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter("profile")} onPointerEnter={() => handleMouseEnter("profile")}>
                <motion.div animate={{ rotate: activeTab === 'profile' ? [30, 0] : 0 }} transition={{ type: "spring" }}>
                    <FontAwesomeIcon icon={faGear} />
                </motion.div></TabItem>
        </BottomTabContainer>
    </>
}