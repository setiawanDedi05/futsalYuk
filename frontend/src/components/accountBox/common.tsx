import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    height:60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-weight: 300;
    font-family: 'Poppins', sans-serif;
    color: rgb(54,241,133)
`

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const MutedLink = styled.a`
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    color: rgb(54,241,133);
`;

export const BoldLink = styled.a`
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    color: rgb(54,241,133);
    margin: 0 5px;
`;

export const Input = styled.input`
    height: 42px;
    width: 100%;
    outline: none;
    border: 1px dashed rgba(54,241,133, 0.5);
    padding: 0px 10px;
    background-color: #191A19;
    /* border-bottom: 1.4px solid transparent; */
    transition: all 200ms ease-in-out;
    font-size: 15px;
    color: rgb(54,241,133);

    &::placeholder{
        color:rgb(54,241,133);
    }

    &:not(:last-of-type){
        border-bottom: none;
    }

    &:focus{
        outline: none;
        border-bottom: 2px solid rgb(54,241,133);
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 11px 40%;
    color: #191A19;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(54,241,133);
    background: linear-gradient(180deg, rgba(54,241,133,1) 20%, rgba(46,204,113,1) 100%);

    &:hover{
        filter: brightness(1.03);
    }
`;

export enum AccountPage {
    SIGNIN = 'signin',
    SIGNUP = 'signup'
}

export const FieldsError = styled.p`
    color: red;
`