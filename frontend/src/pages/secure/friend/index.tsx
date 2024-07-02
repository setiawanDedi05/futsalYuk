import * as color  from "../../../config/color";
import styled from "styled-components"
import { device } from "../../../config/constants"
import { IPost } from "../../../services/dto/post"

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

export default function FriendPage() {
    return <FriendContainer> {
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