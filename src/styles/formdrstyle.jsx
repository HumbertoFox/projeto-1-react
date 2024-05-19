import styled from "styled-components";

const FormDoctor = styled.form`
    display: flex;
    flex-direction: column;

    label {
        padding-left: 5px;
    }
    input[type=text],
    input[type=number],
    input[type=tel],
    input[type=email] {
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
    input[type=text]:focus,
    input[type=number]:focus,
    input[type=tel]:focus,
    input[type=email]:focus,
    input[type=date]:focus,
    textarea:focus {
        border: 1px solid hsla(205.46, 86.5%, 46.47%, .5);
        box-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
    textarea {
        width: 300px;
        height: 70px;
        font-size: 15px;
        border: 1px solid #D2D4DE;
        border-radius: 5px;
        padding: 5px;
        outline: none;
        resize: none;
        margin-bottom: 5px;
        transition: .3s ease-in-out;
    }
    input[type=date] {
        width: 220px;
        height: 30px;
        font-size: 15px;
        border: 1px solid #D2D4DE;
        border-radius: 5px;
        outline: none;
        margin-bottom: 5px;
    }

`;

const DivRadio = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5px;

    label {
        padding: 0 10px;
        transition: .3s ease-in-out;
    }
    input[type=radio],
    label {
        cursor: pointer;
    }
    input[type=radio]:hover,
    label:hover {
        text-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
`;

const DivPlan = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input.attrs({ type: 'submit' })`
    width: 150px;
    height: 30px;
    font-size: 15px;
    background-color: #90EE90;
    border: 1px solid #D2D4DE;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px auto;
    transition: .2s ease-in-out;
    &:hover {
        border: 1px solid hsla(205.46, 86.5%, 46.47%, .5);
        box-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
        color: #FFF;
        text-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
    &:active {
        color: #3C91E6;
        border: 1px solid hsl(120, 73.44%, 74.9%, .5);
        box-shadow: 0 0 5px hsl(120, 73.44%, 74.9%, .5);
    }
`;

export { FormDoctor, DivRadio, DivPlan, Input };