import styled from "styled-components"
import * as color from "../../../config/color";

const ErrorContainer = styled.div`
    width: 80%;
    height: 80vh;
    margin: 10%;
    border-radius: 16px;
    border: 1px dashed red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ErrorTitle = styled.h1`
    color: ${color.secondary};
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
`
export default function CustomeErrorBounderies() {
    return <ErrorContainer>
        <ErrorTitle>Ooops, Something went wrong</ErrorTitle>
    </ErrorContainer>
}