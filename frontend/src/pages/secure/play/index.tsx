import styled from "styled-components"
import field from "../../../assets/images/field.jpg";
import { device } from "../../../config/constants";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 50px;
    flex-direction: column;
    gap: 20px;
    overflow-x: scroll;
`

const FieldContainer = styled.div`
    width: 80vw;
    height: 40vh;
    border-radius: 16px;
    background-image: url(${field});
    background-repeat: no-repeat;
    background-size: 80vw 40vh;
    z-index: -1;
    @media ${device.tablet} {
        width: 60vw;
        height: 50vh;
        background-repeat: no-repeat;
        background-size: 60vw 50vh;
        margin-left: auto;
    }
`

const GKLeftPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 190px;
    left: 110px;
    @media ${device.tablet} {
        position: absolute;
        top: 250px;
        left: 630px;
    }
`
const CB1LeftPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 130px;
    left: 180px;
    @media ${device.tablet} {
        position: absolute;
        top: 335px;
        left: 760px;
    }
`

const CB2LeftPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 250px;
    left: 180px;
    @media ${device.tablet} {
        position: absolute;
        top: 160px;
        left: 760px;
    }
`

const CF1LeftPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 100px;
    left: 300px;
    @media ${device.tablet} {
        position: absolute;
        top: 360px;
        left: 900px;
    }
`
const CF2LeftPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 280px;
    left: 300px;
    @media ${device.tablet} {
        position: absolute;
        top: 130px;
        left: 900px;
    }
`

const GKRightPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 190px;
    right: 110px;
    @media ${device.tablet} {
        position: absolute;
        top: 250px;
        right: 50px;
    }
`

const CB1RightPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 130px;
    right: 180px;
    @media ${device.tablet} {
        position: absolute;
        top: 160px;
        right: 180px;
    }
`

const CB2RightPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 250px;
    right: 180px;
    @media ${device.tablet} {
        position: absolute;
        top: 335px;
        right: 180px;
    }
`

const CF1RightPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 100px;
    right: 300px;
    @media ${device.tablet} {
        position: absolute;
        top: 130px;
        right: 300px;
    }
`
const CF2RightPosition = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 2px dashed white;
    position: absolute;
    top: 280px;
    right: 300px;
    @media ${device.tablet} {
        position: absolute;
        top: 360px;
        right: 300px;
    }
`

const AlternativeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
`

const AlternativeListItem = styled.div`
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
`

const AuthorAvatar = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
`

const members = {
    gk1: {
        name: 'GK1',
        avatar: 'https://i.pravatar.cc/100',
    },
    gk2: {
        name: 'GK2',
        avatar: 'https://i.pravatar.cc/100',
    },
    cb1: {
        name: 'CB1',
        avatar: 'https://i.pravatar.cc/100',
    },
    cb2: {
        name: 'CB2',
        avatar: 'https://i.pravatar.cc/100',
    },
    cb3: {
        name: 'CB3',
        avatar: 'https://i.pravatar.cc/100',
    },
    cb4: {
        name: 'CB4',
        avatar: 'https://i.pravatar.cc/100',
    },
    cf1: {
        name: 'CF1',
        avatar: 'https://i.pravatar.cc/100',
    },
    cf2: {
        name: 'CF2',
        avatar: 'https://i.pravatar.cc/100',
    },
    cf3: {
        name: 'CF3',
        avatar: 'https://i.pravatar.cc/100',
    },
    cf4: {
        name: 'CF4',
        avatar: 'https://i.pravatar.cc/100',
    },
    alternative: [
        {
            name: 'Dedi',
            avatar: 'https://i.pravatar.cc/100',
        },
        {
            name: 'Dedi 2',
            avatar: 'https://i.pravatar.cc/100',
        }
    ]
}

export default function PlayPage() {
    return <Container>
        <FieldContainer>
            <GKLeftPosition src={members.gk1.avatar} />
            <CB1LeftPosition src={members.cb1.avatar} />
            <CB2LeftPosition src={members.cb2.avatar} />
            <CF1LeftPosition src={members.cf1.avatar} />
            <CF2LeftPosition src={members.cf2.avatar} />
            <GKRightPosition src={members.gk2.avatar} />
            <CB1RightPosition src={members.cb3.avatar} />
            <CB2RightPosition src={members.cb4.avatar} />
            <CF1RightPosition src={members.cf3.avatar} />
            <CF2RightPosition src={members.cf4.avatar} />
        </FieldContainer>
        <AlternativeContainer>
            <span>Alternative :</span>
            {
                members.alternative.map((member, index) => {
                    return <AlternativeListItem key={index}>
                        <AuthorAvatar src={member.avatar} />
                        <span>{member.name}</span>
                    </AlternativeListItem>
                })
            }
        </AlternativeContainer>
    </Container>
}