import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faHouse, faMessage, faPlay, faSearch, faUserGroup, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkOutline, faComment as faCommentOutline, faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons"
import * as color from "../../../config/color";
import { motion } from "framer-motion";
import { useState } from "react";
import { IPost } from "../../../services/dto/post";
import grassTexture from "../../../assets/images/background.jpg";
import { device } from "../../../config/constants";

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

const MessageContainer = styled.div`
    display: none;
    transition: all 1s;
    @media ${device.tablet} {
        display: block;
        background-color: ${color.light};
        height: 100%;
        min-width: 250px;
        width: 30%;
        position: fixed;
        left: 85px;
        float: left;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        z-index: 1;
    }

    @media ${device.laptop} {
        display: block;
        background-color: ${color.light};
        height: 100%;
        width: 350px;
        position: fixed;
        left: 85px;
        float: left;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        z-index: 1;
    }
`

const MessageActionContainer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 50px;
    border-bottom: 2px dashed ${color.gray};
`

const MessageInputSearchContainer = styled.form`
    display: flex;
    border-radius: 2px;
    padding: 8px 16px;
    background-color: ${color.white};
    width: 200px;
    border: 2px solid;
    gap: 20px;
    align-items: center;
`

const MessageInputSearch = styled.input`
    width: 130px;
    background-color: ${color.white};
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
`

const MessageContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    >:not(:last-child){
        border-bottom: 1px solid ${color.secondary};
    }
`

const MessageItem = styled.div`
    display: flex;
    padding: 30px 20px;
    width: 100%;
    align-items: center;
    gap: 20px;
`

const PostContainer = styled.div`
    margin-top: 6vh;
    padding: 10px 20px;
    gap: 2vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 10vh;
    @media ${device.tablet} {
        width: 50%;
        position: absolute;
        right: 0;
        float: left;
        margin-top: 0;
    }
    @media ${device.laptop} {
        width: 50%;
        position: absolute;
        right: 3em;
        float: left;
        margin-top: 0;
    }
`

const PostItem = styled.div`
    width: 100%;
    min-height: 150px;
    border-radius: 5px;
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
    height: 200px;
    background-color: ${color.white};
    object-fit: cover;
`

const PostActionContainer = styled.div`
    height: 50px;
    background-color: rgba(200,200,200,.5);
    display: flex;
    padding: 10px;
    justify-content: start;
    align-items: center;
    gap:10px;
    >:last-child{
        margin-left: auto;
    }
`

const PostTopCaptionContainer = styled.div`
    display: flex;
    height: 50px;
    flex-direction: column;
    padding-top: 10px;
    background-color: rgba(200,200,200,.5);
`

const PostAuthorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 10px;
    padding: 0 10px;
    font-family: 'Poppins', sans-serif;
`

const PostAuthorAvatar = styled.img`
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
    font-weight: bold;
`

const PostCaption = styled.span`
    font-weight: 400;
`

const PostTime = styled.div`
    margin-left: auto;
    color: ${color.black};
`

const PostBottomCaptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1px 10px 10px;
    background-color: rgba(200,200,200,.5);
`

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
        height: 100vh;
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

const FriendContainer = styled.div`
    margin: 7vh 1vw;
    padding: 10px 20px;
    margin-bottom: 10vh;
    display: flex;
    flex-direction: column;
    background-color: ${color.light};
    transition: all 1s;
    @media ${device.tablet} {
        margin-top: 2vh;
        width: 53.5%;
        position: relative;
        margin-left:auto;
        overflow: scroll;
    }
    @media ${device.laptop} {
        width: 55%;
        position: relative;
    }
`

const FriendKind = styled.span`
    text-transform: uppercase;
    display: block;
    margin-bottom: 10px;
`
const FriendListContainer = styled.div`
    display: flex;
    background-color: ${color.lightOpacity};
    padding: 10px;
    justify-content: start;
    align-items: center;
    border-radius: 20px;
    gap: 20px;
    >:last-child{
        margin-left: auto;
    }
`

const FriendListAvatar = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
`

const FriendListAccountContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const FriendName = styled.span`
    font-size: 1em;
    font-family: 'Poppins', sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const FriendEmail = styled.span`
    font-size: .8em;
    font-family: 'Poppins', sans-serif;
    color: ${color.gray};
`

const FriendMessageButton = styled.button`
    border-radius: 16px;
    background-color: ${color.light};
    padding: 5px 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export default function HomePage() {
    const [activeTab, setactiveTab] = useState<string | null | undefined>("home");

    const handleMouseEnter = (tabName?: string) => {
        setactiveTab(tabName);
    }

    const postDummy = [
        {
            id: 1,
            name: "Dedi Setiawan",
            avatar: "https://i.pravatar.cc/100",
            place: "Tokyo",
            time: "1 Min ago",
            image: "https://picsum.photos/500/200",
            caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
        },
        {
            id: 2,
            name: "Puzha Fauzha",
            time: "1 hour ago",
            place: "Germany",
            avatar: "https://i.pravatar.cc/100",
            image: "https://picsum.photos/500/200",
            caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
        },
        {
            id: 3,
            name: "Ibnu Malik",
            avatar: "https://i.pravatar.cc/100",
            time: "1 hour ago",
            place: "Japan",
            image: "https://picsum.photos/500/200",
            caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
        },
        {
            id: 4,
            avatar: "https://i.pravatar.cc/100",
            name: "Arif Ibrahim",
            time: "1 hour ago",
            place: "Arab",
            image: "https://picsum.photos/500/200",
            caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
        },
        {
            id: 5,
            avatar: "https://i.pravatar.cc/100",
            name: "Anwar Sanusi",
            time: "1 hour ago",
            place: "Arab",
            image: "https://picsum.photos/500/200",
            caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
        },
    ];

    const friendDummy = {
        following: [
            {
                id: 1,
                name: "Dedi Setiawan",
                avatar: "https://i.pravatar.cc/100",
                place: "Tokyo",
                time: "1 Min ago",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 2,
                name: "Puzha Fauzha",
                time: "1 hour ago",
                place: "Germany",
                avatar: "https://i.pravatar.cc/100",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 3,
                name: "Ibnu Malik",
                avatar: "https://i.pravatar.cc/100",
                time: "1 hour ago",
                place: "Japan",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 4,
                avatar: "https://i.pravatar.cc/100",
                name: "Arif Ibrahim",
                time: "1 hour ago",
                place: "Arab",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 5,
                avatar: "https://i.pravatar.cc/100",
                name: "Anwar Sanusi",
                time: "1 hour ago",
                place: "Arab",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
        ],
        follower: [
            {
                id: 1,
                name: "Dedi Setiawan",
                avatar: "https://i.pravatar.cc/100",
                place: "Tokyo",
                time: "1 Min ago",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 2,
                name: "Puzha Fauzha",
                time: "1 hour ago",
                place: "Germany",
                avatar: "https://i.pravatar.cc/100",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 3,
                name: "Ibnu Malik",
                avatar: "https://i.pravatar.cc/100",
                time: "1 hour ago",
                place: "Japan",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 4,
                avatar: "https://i.pravatar.cc/100",
                name: "Arif Ibrahim",
                time: "1 hour ago",
                place: "Arab",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
            {
                id: 5,
                avatar: "https://i.pravatar.cc/100",
                name: "Anwar Sanusi",
                time: "1 hour ago",
                place: "Arab",
                image: "https://picsum.photos/500/200",
                caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
            },
        ]
    }

    return <>
        <Container>
            <ContainerBg />
            <TopContainer>
                <TopTitle>GoRivalGo</TopTitle>
                <FontAwesomeIcon id="message" icon={faMessage} color={color.secondary} />
            </TopContainer>
            <MessageContainer>
                <MessageActionContainer>
                    <MessageInputSearchContainer>
                        <FontAwesomeIcon icon={faSearch} size="xl" />
                        <MessageInputSearch />
                    </MessageInputSearchContainer>
                    <FontAwesomeIcon icon={faUserPlus} size="xl" />
                </MessageActionContainer>
                <MessageContentContainer>
                    {
                        postDummy.map(({ id, name, avatar }: IPost) => {
                            return <MessageItem key={id}>
                                <PostAuthorAvatar src={avatar} alt={`${id}-avatar`} />
                                <PostAuthorNameContainer>
                                    <PostAuthorName>{name}</PostAuthorName>
                                    <PostCaption>Lorem ipsum dolor sit.</PostCaption>
                                </PostAuthorNameContainer>
                            </MessageItem>
                        })
                    }
                </MessageContentContainer>
            </MessageContainer>
            {activeTab === 'home' && <PostContainer>
                {
                    postDummy.map(({ id, image, name, time, place, caption, avatar }: IPost) => {
                        return <PostItem key={id} id={`${id}-post`}>
                            <PostTopCaptionContainer>
                                <PostAuthorContainer>
                                    <PostAuthorAvatar src={avatar} alt={`${id}-avatar`} />
                                    <PostAuthorNameContainer>
                                        <PostAuthorName>{name}</PostAuthorName>
                                        <PostAuthorPlace>{place}</PostAuthorPlace>
                                    </PostAuthorNameContainer>
                                    <PostTime>{time}</PostTime>
                                </PostAuthorContainer>
                            </PostTopCaptionContainer>
                            <PostImage src={image} alt={`${name}-image`} loading="lazy" />
                            <PostActionContainer>
                                <FontAwesomeIcon icon={faHeartOutline} inverse color={color.white} size="2xl" />
                                <FontAwesomeIcon icon={faCommentOutline} inverse color={color.white} size="2xl" />
                                <FontAwesomeIcon icon={faBookmarkOutline} color={color.white} size="2xl" />
                            </PostActionContainer>
                            <PostBottomCaptionContainer>
                                <PostAuthorName>{name}</PostAuthorName>
                                <PostCaption>{caption}</PostCaption>
                            </PostBottomCaptionContainer>
                        </PostItem>
                    })
                }
            </PostContainer>
            }
            {activeTab === 'friend' && <FriendContainer> {
                Object.entries(friendDummy).map(([key, content]) => {
                    return <div key={key}>
                        <FriendKind>{key}</FriendKind>
                        {
                            content.map(({ id, name, avatar, place }: IPost) => {
                                return <FriendListContainer key={`${id}-friend`}>
                                    <FriendListAvatar src={avatar} alt="avatar" />
                                    <FriendListAccountContainer>
                                        <FriendName>{name}</FriendName>
                                        <FriendEmail>{place}</FriendEmail>
                                    </FriendListAccountContainer>
                                    <FriendMessageButton><span>Send Message</span></FriendMessageButton>
                                </FriendListContainer>
                            })
                        }
                    </div>
                })
            }
            </FriendContainer>
            }
        </Container>
        <BottomTabContainer>
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
    </>
}