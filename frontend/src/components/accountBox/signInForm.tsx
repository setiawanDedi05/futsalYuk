import { useContext } from "react";
import { Spacer } from "../../uikit/spacer";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { AccountContext } from "./accountContext";

export function SignInForm() {
    const { switchToSignUp } = useContext(AccountContext) || { switchToSingUp: () => { } }
    return <BoxContainer>
        <FormContainer>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
        </FormContainer>
        <Spacer />
        <MutedLink href="#">Forgot your password?</MutedLink>
        <Spacer height="1.3em" />
        <SubmitButton type="submit">Signin</SubmitButton>
        <Spacer height="1.3em" />
        <p>Belum Punya akun ya?<BoldLink onClick={switchToSignUp}>sini Daftar</BoldLink></p>
    </BoxContainer>
}