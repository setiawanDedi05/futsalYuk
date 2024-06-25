import { Spacer } from "../../uikit/spacer";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";

export function SignUpForm() {
    return <BoxContainer>
        <FormContainer>
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />
        </FormContainer>
        <Spacer height="1.3em" />
        <SubmitButton type="submit">Sign Up</SubmitButton>
    </BoxContainer>
}