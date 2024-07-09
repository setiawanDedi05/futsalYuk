import styled from "styled-components";
import * as color from '../../../config/color';
import { Spacer } from "../../../uikit/spacer";

const chatsDummy = [
    {
        id: 1,
        name: '김철수',
        email: '김철수@gmail.com',
        message: '안녕하세요',
        time: '10:00',
        isMe: true,
    },
    {
        id: 2,
        name: 'jane doe',
        email: 'jane@gmail.com',
        message: '안녕하세요',
        time: '10:00',
        isMe: false,
    },
    {
        id: 3,
        name: 'jane doe',
        email: 'jane@gmail.com',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus illo dicta vitae accusantium cum ab, ipsum quia ut quas quidem omnis placeat praesentium? Quia at nam sunt praesentium mollitia!",
        time: '10:00',
        isMe: false,
    },
    {
        id: 4,
        name: '김철수',
        email: '김철수@gmail.com',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus illo dicta vitae accusantium cum ab, ipsum quia ut quas quidem omnis placeat praesentium? Quia at nam sunt praesentium mollitia!",
        time: '10:00',
        isMe: true,
    },
    {
        id: 5,
        name: 'jane doe',
        email: 'jane@gmail.com',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus illo dicta vitae accusantium cum ab, ipsum quia ut quas quidem omnis placeat praesentium? Quia at nam sunt praesentium mollitia!",
        time: '10:00',
        isMe: false,
    },
    {
        id: 6,
        name: '김철수',
        email: '김철수@gmail.com',
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus illo dicta vitae accusantium cum ab, ipsum quia ut quas quidem omnis placeat praesentium? Quia at nam sunt praesentium mollitia!",
        time: '10:00',
        isMe: true,
    }

]

interface ChatItemProps {
    isMe: boolean;
}

const ChatTitleContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid ${color.gray};
`

const ChatAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const ChatSubTitle = styled.span`
    font-size: 12px;
    color: ${color.gray};
`

const ChatTitle = styled.span`
    font-size: 16px;
    font-weight: 500;
`

const ChatItem = styled.div<ChatItemProps>`
    background-color: ${color.light};
    width: 80%;
    margin: 10px 5px;
    padding: 8px 16px;
    border-radius: 16px;
    border: 1px dashed ${props => props.isMe ? color.green : color.gray};
    align-self: ${props => props.isMe ? 'flex-end' : 'flex-start'};
    box-shadow: ${props => props.isMe ? `-5px 5px 2px ${color.green}` : `5px 5px 2px ${color.gray}`};
`

const ChatPage = () => {
    return <>
        <ChatTitleContainer>
            <ChatAvatar src="https://avatars.githubusercontent.com/u/100000000?v=4" />
            <div style={{display:'flex', flexDirection: 'column'}}>
                <ChatTitle>김철수</ChatTitle>
                <ChatSubTitle>김철수@gmail.com</ChatSubTitle>
            </div>
        </ChatTitleContainer>
        {chatsDummy.map(chat => {
            return <ChatItem key={chat.id} isMe={chat.isMe}>
                <div>{chat.name}</div>
                <div>{chat.message}</div>
                <div>{chat.time}</div>
            </ChatItem>
        })}
        <Spacer height="50px"></Spacer>
    </>
}

export default ChatPage;