import styled from "styled-components";

const FormDoctorx = styled.form`
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

const DivPlan = styled.div`
    display: flex;
    flex-direction: column;
`;

export { FormDoctorx, DivPlan };