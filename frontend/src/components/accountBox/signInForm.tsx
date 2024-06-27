import { useContext, useState } from "react";
import { Spacer } from "../../uikit/spacer";
import { BoldLink, BoxContainer, FieldsError, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { AccountContext } from "./accountContext";
import { useForm } from "react-hook-form";
import authService from "../../services/authService";
import axios, { AxiosError } from "axios";
import { error } from "console";



export function SignInForm() {
    const { switchToSignUp } = useContext(AccountContext) || { switchToSingUp: () => { } }
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const processSubmit = async (data: any) => {
        try {
            await authService.login({
                email: data.email,
                password: data.password
            });
            setMessage("login success");
        } catch (error) {
            if(axios.isAxiosError(error)){
                setMessage(error.response?.data.message)
            }else{
                setMessage("Internal Server error")
            }
        }
    }

    return <BoxContainer>
        <FormContainer method="post" onSubmit={handleSubmit(processSubmit)} >
            <Input type="email" placeholder="Email" {...register('email', {
                required: {
                    value: true,
                    message: "Email Required"
                }, pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                }
            })} />
            {errors.email && <FieldsError>{errors.email.message?.toString()}</FieldsError>}
            <Input type="password" placeholder="Password" {...register('password', { required: {
                value: true,
                message: "Password Required"
            } })} />
            {errors.password && <FieldsError>{errors.password.message?.toString()}</FieldsError>}
            <Spacer />
            <MutedLink href="#">Forgot your password?</MutedLink>
            <Spacer height="1.3em" />
            <FieldsError>{message}</FieldsError>
            <SubmitButton type="submit">Signin</SubmitButton>
            <Spacer height="1.3em" />
            <p>Belum Punya akun ya?<BoldLink onClick={switchToSignUp}>sini Daftar</BoldLink></p>
        </FormContainer>
    </BoxContainer>
}