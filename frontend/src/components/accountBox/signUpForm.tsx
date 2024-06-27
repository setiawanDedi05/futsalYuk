import { useContext, useState } from "react";
import { Spacer } from "../../uikit/spacer";
import { BoldLink, BoxContainer, FieldsError, FormContainer, Input, SubmitButton } from "./common";
import { AccountContext } from "./accountContext";
import { useForm } from "react-hook-form";
import authService from "../../services/authService";
import axios from "axios";

export function SignUpForm() {
    const { switchToSignIn } = useContext(AccountContext) || { switchToSingIn: () => { } }
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const processSubmit = async (data: any) => {
        try {
            await authService.register({
                email: data.email,
                password: data.password,
                age: data.age,
                name: data.name,
            });
            setMessage("Register success");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data.message || error.response?.data?.errors)
            } else {
                setMessage("Internal Server error")
            }
        }
    }

    return <BoxContainer>
        <FormContainer method="post" onSubmit={handleSubmit(processSubmit)}>
            <Input type="text" placeholder="Full Name" {...register('name', {
                required: {
                    value: true,
                    message: "name required"
                },
                minLength: {
                    value: 3,
                    message: "name must be at least 3 characters"
                },
                maxLength: {
                    value: 16,
                    message: "name must be at most 16 characters"
                }
            })} />
            {errors.name && <FieldsError>{errors.name.message?.toString()}</FieldsError>}
            <Input type="email" placeholder="Email" {...register('email', {
                required: {
                    value: true,
                    message: "email required"
                },
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                }
            })} />
            {errors.email && <FieldsError>{errors.email.message?.toString()}</FieldsError>}
            <Input type="password" placeholder="Password" {...register('password', {
                required: {
                    value: true,
                    message: "password required"
                },
            })} />
            {errors.password && <FieldsError>{errors.password.message?.toString()}</FieldsError>}
            <Input type="number" placeholder="Age" {...register('age', {
                required: {
                    value: true,
                    message: "age required"
                },
                min: {
                    value: 17,
                    message: "age must be at least 17"
                }
            })} />
            {errors.age && <FieldsError>{errors.age.message?.toString()}</FieldsError>}
            <Spacer height="1.3em" />
            <FieldsError>{message}</FieldsError>
            <SubmitButton type="submit">Sign Up</SubmitButton>
        </FormContainer>
        <Spacer height="1.3em" />
        <p>Udah Punya akun ya?<BoldLink onClick={switchToSignIn}>gas Login!</BoldLink></p>
    </BoxContainer>
}