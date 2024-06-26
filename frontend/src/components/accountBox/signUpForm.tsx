import { useContext } from "react";
import { Spacer } from "../../uikit/spacer";
import { BoldLink, BoxContainer, FormContainer, Input, SubmitButton } from "./common";
import { AccountContext } from "./accountContext";

export function SignUpForm() {
    const { switchToSignIn } = useContext(AccountContext) || { switchToSingIn: () => { } }
    return <BoxContainer>
        <FormContainer>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />
        </FormContainer>
        <Spacer height="1.3em" />
        <SubmitButton type="submit">Sign Up</SubmitButton>
        <Spacer height="1.3em" />
        <p>Udah Punya akun ya?<BoldLink onClick={switchToSignIn}>gas Login!</BoldLink></p>
    </BoxContainer>
}