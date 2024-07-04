import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as color  from "../../../config/color";
import styled from "styled-components"
import { IPost } from "../../../services/dto/post"
import { faBookmark as faBookmarkOutline, faComment as faCommentOutline, faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons"

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

export default function FeedPage() {
    return <>
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
    </>
}