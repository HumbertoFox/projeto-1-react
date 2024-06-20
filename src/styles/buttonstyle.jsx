import styled from "styled-components";
const Button = styled.button.attrs({ type: 'button' })`
    font-size: .9rem;
    color: black;
    background-color: #90EE90;
    padding: 5px 10px;
    border: 1px solid #D2D4DE;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 auto;
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
const Input = styled.input.attrs({ type: 'submit' })`
    font-size: .9rem;
    color: black;
    background-color: #90EE90;
    padding: 5px 10px;
    border: 1px solid #D2D4DE;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 auto;
    transition: .2s ease-in-out;
    &:hover {
        border: 1px solid hsla(205.46, 86.5%, 46.47%, .5);
        box-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
        color: #FFF;
        text-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
    &:active {
        color: #3C91E6;
        border: 1px solid hsla(120, 73.44%, 74.9%, .5);
        box-shadow: 0 0 5px hsla(120, 73.44%, 74.9%, .5);
    }
`;

export { Button, Input };