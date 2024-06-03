import styled from "styled-components";
import IconError from "../assets/ponto-de-exclamacao.png";

const FormSerach = styled.form`
    width: 280px;
    display: flex;
    flex-direction: column;

    input[type=search] {
        height: 30px;
        font-size: .9rem;
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
    input.required:focus {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        box-shadow: 0 0 5px hsla(332.47, 100%, 50%, .5);
    }
    input.required {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        background: url(${IconError}) right 2% bottom 50% no-repeat;
        background-size: 20px;
    }
    .required::placeholder {
        font-style: italic;
        color: hsla(332.47, 100%, 50%, .5);
    }
`;

export { FormSerach };