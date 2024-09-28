import styled from "styled-components";
import IconError from "../assets/aviso.png";
const FormsFull = styled.form`
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    select {
        width: 220px;
        background: none;
    }
    input[type=text],
    input[type=number],
    input[type=tel],
    input[type=email],
    input[type=date],
    input[type=datetime-local],
    input[type=password],
    textarea,
    select {
        height: 30px;
        font-size: .9rem;
        border: 1px solid #D2D4DE;
        border-radius: 5px;
        padding: 0 5px;
        outline: none;
        transition: .3s ease-in-out;
    }
    input[type=text]:focus,
    input[type=number]:focus,
    input[type=tel]:focus,
    input[type=email]:focus,
    input[type=date]:focus,
    input[type=datetime-local]:focus,
    input[type=password]:focus,
    textarea:focus,
    select:focus {
        border: 1px solid hsla(205.46, 86.5%, 46.47%, .5);
        box-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
    textarea {
        height: 70px;
        padding: 5px;
        resize: none;
    }
    input[type=date],
    input[type=datetime-local] {
        width: 220px;
        padding: 5px;
    }
    input.required:focus,
    input.requireddate:focus,
    textarea.requireddate:focus,
    input.requiredpassword:focus {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        box-shadow: 0 0 5px hsla(332.47, 100%, 50%, .5);
    }
    input.required {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        background: url(${IconError}) no-repeat right 2% bottom 50%;
        background-size: 20px;
    }
    input.requiredpassword {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        background: url(${IconError}) no-repeat right 9% bottom 50%;
        background-size: 20px;
    }
    input.requireddate,
    textarea.requireddate {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
    }
    .required::placeholder,
    .requiredpassword::placeholder {
        font-style: italic;
        color: hsla(332.47, 100%, 50%, .5);
    }
`;
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
`;
const DivRadio = styled.div`
    display: flex;
    justify-content: center;
`;
const DivNameEd = styled.div`
    display: flex;
    flex-direction: column;
`;
const DivDate = styled.div`
    display: flex;
`;
const DivDateBirth = styled(DivDate)`
    flex-direction: column;
`;
const DivDateAge = styled(DivDateBirth)`
    width: 100%;
    align-items: center;
    justify-content: center;
    p {
        color: grey;
    }
`;
const LabelText = styled.label`
    display: flex;
    flex-direction: column;
    font-size: .9rem;
    color: gray;
`;
const LabelTextRadios = styled.label`
    display: flex;
    gap: 5px;
    font-size: .9rem;
    color: gray;
    padding: 0 10px;
    transition: .4s ease-in-out;
    cursor: pointer;
    &:hover {
        text-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
`;
const DivButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top: 5px;
`;
const DivBtnPassword = styled.div`
    display: block;
    label {
        position: relative;
    }
    button {
        position: absolute;
        right: 3px;
        bottom: 5px;
        background: none;
    }
    svg {
        font-size: 17px;
        cursor: pointer;
    }
`;
export { FormsFull, Fieldset, DivRadio, DivNameEd, DivDate, DivDateBirth, DivDateAge, LabelText, LabelTextRadios, DivButtons, DivBtnPassword };