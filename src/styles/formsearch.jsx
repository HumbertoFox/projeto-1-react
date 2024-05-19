import styled from "styled-components";

const FormSerach = styled.form`
    display: flex;
    flex-direction: column;

    label {
        padding-left: 5px;
    }
    input[type=search] {
        width: 300px;
        height: 30px;
        font-size: 15px;
        border: 1px solid #D2D4DE;
        border-radius: 5px;
        padding: 0 5px;
        outline: none;
        margin-bottom: 5px;
        transition: .3s ease-in-out;
    }
    input[type=search]:focus {
        border: 1px solid hsla(205.46, 86.5%, 46.47%, .5);
        box-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
`;

export { FormSerach };