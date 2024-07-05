import FriendCard from "../friendCard";

const followingDummy = [
    {
        id: 1,
        name: "Dedi Setiawan",
        avatar: "https://i.pravatar.cc/100",
        email: "ds@gmail.com",
    },
    {
        id: 2,
        name: "Puzha Fauzha",
        avatar: "https://i.pravatar.cc/100",
        email: "ds@gmail.com",
    },
    {
        id: 3,
        name: "Ibnu Malik",
        avatar: "https://i.pravatar.cc/100",
        email: "ds@gmail.com",
    },
    {
        id: 4,
        name: "Arif Ibrahim",
        avatar: "https://i.pravatar.cc/100",
        email: "ds@gmail.com",
    },
    {
        id: 5,
        name: "Anwar Sanusi",
        avatar: "https://i.pravatar.cc/100",
        email: "ds@gmail.com",
    },
];
const FollowingTabContent = () => {
    return <div>
    {
        followingDummy.map(({id, name, avatar, email}) => {
            return <FriendCard key={id} name={name} email={email} avatar={avatar} isFollowing={true} />
        })
    }
</div>
}

export default FollowingTabContent;