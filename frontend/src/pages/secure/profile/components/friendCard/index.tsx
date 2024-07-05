import { FollowerContainer, FollowerAvatar, FollowerNameContainer, FollowerName, FollowerEmail, FollowerAction, FollowerButton } from "../follower/style"

const FriendCard = ({ key, avatar, name, email, isFollowing }: any) => {
    return <FollowerContainer key={key}>
        <FollowerAvatar src={avatar} alt={name} />
        <FollowerNameContainer>
            <FollowerName>{name}</FollowerName>
            <FollowerEmail>{email}</FollowerEmail>
        </FollowerNameContainer>
        <FollowerAction>
            {isFollowing === false && <FollowerButton>Chat</FollowerButton>}
            {isFollowing === false && <FollowerButton>Follback</FollowerButton>}
            {isFollowing === true && <FollowerButton>Unfollow</FollowerButton>}
        </FollowerAction>
    </FollowerContainer>
}

export default FriendCard;