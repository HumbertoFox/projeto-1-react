import styled, { css } from "styled-components";
import IconError from "../assets/aviso.png";
const FormDoctor = styled.form`
    width: 280px;
    display: flex;
    flex-direction: column;    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=text],
    input[type=number],
    input[type=tel],
    input[type=email],
    input[type=date],
    input[type=datetime-local],
    input[type=password],
    textarea {
        height: 30px;
        font-size: .9rem;
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
    input[type=datetime-local]:focus,
    input[type=password]:focus,
    textarea:focus {
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
    input.requireddate:focus {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        box-shadow: 0 0 5px hsla(332.47, 100%, 50%, .5);
    }
    input.required {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
        background: url(${IconError}) no-repeat right 2% bottom 50%;
        background-size: 20px;
    }
    input.requireddate {
        border: 1px solid hsla(332.47, 100%, 50%, .5);
    }
    .required::placeholder {
        font-style: italic;
        color: hsla(332.47, 100%, 50%, .5);
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
const DivNameEd = styled.div`
    display: none;
    flex-direction: column;
${({ className }) => {
        if (className === "buildingradio") {
            return css`
            display: flex;
        `;
        }
    }};
`;
const DivPlan = styled.div`
    display: none;
    flex-direction: column;
${({ className }) => {
        if (className === "planradio") {
            return css`
            display: flex;
        `;
        }
    }};
`;
const DivParticular = styled.div`
    display: none;
${({ className }) => {
        if (className === "particularradio") {
            return css`
                display: flex;
            `;
        };
    }};
    flex-direction: column;
`;
const DivCourtesy = styled.div`
    display: none;
${({ className }) => {
        if (className === "courtesyradio") {
            return css`
                display: flex;
            `;
        };
    }};
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
const DivEditDisabled = styled(DivDateBirth)`
    ${({ $rota }) => {
        if ($rota === "editpatient") {
            return css`
                display: none;
            `;
        };
    }};
`;
export { FormDoctor, DivRadio, DivNameEd, DivPlan, DivParticular, DivDate, DivDateBirth, DivDateAge, DivCourtesy, DivEditDisabled };