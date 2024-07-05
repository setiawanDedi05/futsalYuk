import styled from "styled-components";
import * as color from "../../../../../config/color";

const FollowerContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 5px 10px;
    align-items: center;
    >:last-child{
        margin-left: auto;
    }
`

const FollowerAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const FollowerNameContainer = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 5px;
`

const FollowerName = styled.span`
    font-size: 1rem;
    text-overflow: ellipsis;
`

const FollowerEmail = styled.span`
    font-size: .5rem;
    color: ${color.gray};
`

const FollowerAction = styled.div`
    display: flex;
    gap: 5px;
`

const FollowerButton = styled.button`
    font-size: .8rem;
    background-color: ${color.light};
    color: ${color.black};
    padding: 10px;
    border-radius: 6px;
    border:1px solid ${color.secondary};
`

export {
    FollowerContainer,
    FollowerAvatar,
    FollowerNameContainer,
    FollowerName,
    FollowerEmail,
    FollowerAction,
    FollowerButton
}