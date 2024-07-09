import styled from "styled-components";
import * as color from "../../../config/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";

const Form = styled.form`
    margin: 20px auto;
    width: 90%;
    background-color: ${color.light};
    position: relative;
    padding: 20px 40px;
    box-shadow: 5px 5px 2px ${color.gray};
    border-radius: 16px;
`

const InputControl = styled.div``

const Label = styled.label`
    position: relative;
    cursor: text;
    z-index: 2;
    top: -33px;
    left: 10px;
    font-size: 12px;
    font-weight: bold;
    background-color: ${color.white};
    padding: 0 10px;
    color: ${color.black};
    transition: all .3s ease;
`

const Input = styled.input`
    width: 100%;
    height: 40px;
    background: transparent;
    border: 1px dashed ${color.green};
    transition: all .3s ease;
    padding: 0 15px;
    &:focus ~ ${Label},
        &:valid ~ ${Label} {
            font-size: 11px;
            top: -50px;
            outline: 1px dashed ${color.green};
        }
    &:focus ~ ${Label}{
            color: ${color.green};
        }
    &:focus{
        outline: 1px dashed ${color.green};
        border: 1px dashed ${color.green};
    }
`

const ButtonEdit = styled.button`
    border-radius: 8px;
    width: 100px;
    height: 40px;
    margin-left: auto;
    margin-right: 5%;
    box-shadow: 5px 5px 2px ${color.gray};
    border:none;
    background-color: ${color.light};
    &:hover{
        box-shadow: none;
        transform: translateY(4px);
        border: 1px dashed ${color.green};
        cursor: pointer;
    }
`

const TopContainer = styled.div`
    display: flex;
    align-items: start;
`

const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
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

const EditProfilePage = () => {
    return <>
       <AccountContainer>
            <TopContainer>
                <Avatar src="https://avatars.githubusercontent.com/u/100000000?v=4" />
            </TopContainer>
            <AccountName>John Doe</AccountName>
            <AccountEmail>john.doe@gmail.com</AccountEmail>
        </AccountContainer>
        <Form>
            <InputControl>
                <Input type="†ext" id="name" name="name" required />
                <Label htmlFor="name">Name</Label>
            </InputControl>
            <InputControl>
                <Input type="†ext" id="email" name="email" required />
                <Label htmlFor="email">Email</Label>
            </InputControl>
            <InputControl>
                <Input type="date" id="dob" name="dob" required />
                <Label htmlFor="dob">Date of Birth</Label>
            </InputControl>
        </Form>
        <ButtonEdit>
            <FontAwesomeIcon icon={faSave} /> Save
        </ButtonEdit>
    </>
}

export default EditProfilePage;