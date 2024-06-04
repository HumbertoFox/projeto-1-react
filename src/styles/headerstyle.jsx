import styled from "styled-components";

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
    overflow-x: hidden;
    @media (max-width: 820px) {
        width: 75px;
    }
`;

const ImgMedicina = styled.img`
    width: 150px;
    margin: 15px 15px 15px 5px;
    transition: .3s ease-in-out;
    @media screen and (max-width: 820px),
    screen and (max-height: 700px) {
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
        position: relative;
    }
    li:hover a {
        color: #3C91E6;
    }
    li.active:hover a {
        color: #FFF;
        text-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
    li:nth-child(1),
    li:nth-child(3),
    li:nth-child(4),
    li:nth-child(6),
    li:nth-child(7) {
        padding: 5px;
    }
    li:nth-child(2),
    li:nth-child(5) {
        display: flex;
        align-items: center;
        gap: 15px;
        padding-left: 25px;
        cursor: default;
    }
    svg {
        font-size: 1.9rem;
    }
    a {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #90EE90;
        padding: 10px;
        transition: .3s ease-in-out;
    }
    img {
        width: 40px;
    }
    .active {
        background-color: #FFF;
        border-radius: 30px 0 0 30px;
    }
    .active a {
        color: #3C91E6;
        border-radius: 25px;
    }
    .active a::before {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        top: -40px;
        right: 0;
        border-radius: 50%;
        box-shadow: 20px 20px 0 #FFF;
        z-index: -1;
    }
    .active a::after {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        bottom: -40px;
        right: 0;
        border-radius: 50%;
        box-shadow: 20px -20px 0 #FFF;
        z-index: -1;
    }
    span {
        font-size: .9rem;
    }
    @media (max-width: 820px) {
        span {
            display: none;
        }
        a {
            justify-content: center;
        }
        li:nth-child(2),
        li:nth-child(5) {
            padding-left: 20px;
        }
    }
`;

const LiLogout = styled.li`
    margin-top: 15px;

    svg {
        rotate: 180deg;
    }
`;

export { Header, ImgMedicina, UlHeader, LiLogout };