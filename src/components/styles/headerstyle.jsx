import styled, { css } from "styled-components";

const Header = styled.header`
    width: 200px;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    align-items: center;
    background-color: #90EE90;
    padding: 10px 0 10px 10px;
    transition: .3s ease-in-out;
    @media (max-width: 768px) {
        width: 75px;
    }
`;

const ImgMedicina = styled.img`
    width: 150px;
    margin: 15px;
    transition: .3s ease-in-out;
    @media screen and (max-width: 768px),
    screen and (max-height: 620px) {
        width: 60px;
    }
`;

const UlHeader = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
    
    li {
        display: flex;
        align-items: center;
        padding: 10px;
        transition: .3s ease-in-out;
    }
    li:nth-child(1),
    li:nth-child(3),
    li:nth-child(4),
    li:nth-child(6),
    li:nth-child(7) {
        cursor: pointer;
        gap: 10px;
    }
    li:nth-child(2),
    li:nth-child(5) {
        cursor: default;
        gap: 15px;
        padding-left: 25px;
    }
    li:nth-child(1):hover,
    li:nth-child(3):hover,
    li:nth-child(4):hover,
    li:nth-child(6):hover,
    li:nth-child(7):hover {
        background-color: #FFF;
        border-radius: 20px 0 0 20px;
    }
    img {
        width: 40px;
    }
    .active {
        background-color: #FFF;
    }
    span {
        transition: .3s ease-in-out;
    }
    @media (max-width: 768px) {
    span {
        display: none;
        }
        li:nth-child(2),
        li:nth-child(5) {
            padding-left: 20px;
        }
    }
`;

export { Header, ImgMedicina, UlHeader };