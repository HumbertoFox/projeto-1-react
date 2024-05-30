import styled, { keyframes } from "styled-components";

const FaceIn = keyframes`
    0% {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
    }
`;

const DivMaimEvents = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    background-color: hsl(120, 73.44%, 74.9%, .7);
    z-index: 4;
    transition: .3s ease-in-out;
    @media (max-width: 480px) {
        min-width: 375px;
    }
`;

const DivEvents = styled.div`
    display: flex;
    gap: 5px;
    flex-direction: column;
    background: #FFF;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    animation: ${FaceIn} .4s ease-in-out;

    h2 {
        font-size: 18px;
        margin: 0 auto;
    }
    button {
        margin-top: 15px;
    }
    p {
        font-size: 15px;
    }
    p:nth-child(2) {
        margin: 0 auto;
    }
`;

export { DivMaimEvents, DivEvents };