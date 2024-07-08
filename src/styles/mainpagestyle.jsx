import styled, { css } from "styled-components";
const MainPrimary = styled.main`
    width: 100%;
    min-height: 100vh;
    display: flex;
`;
const MainSecondary = styled.div`
    position: relative;
    width: calc(100% - 200px);
    left: 200px;
    min-height: 100vh;
    display: flex;
    padding: 10px 5px;
    @media (max-width: 820px) {
        transition: .3s ease-in-out;
        width: calc(100% - 75px);
        left: 75px;
    }
`;
const DivForms = styled.div`
    display: flex;
    flex-direction: column;
`;
const DivButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top: 5px;
    ${({ $rota }) => {
        if ($rota === "registerconsultation") {
            return css`
                display: none;
            `;
        };
    }};
`;
const MainLogin = styled(MainPrimary)`
    justify-content: center;
    align-items: center;
`;
const SectionLogin = styled(DivForms)`
    align-items: center;
    gap: 30px;
    padding: 30px;
    border: 1px solid hsl(205.46, 86.5%, 46.47%);
    border-radius: 15px;
    box-shadow: 0 0 20px hsla(120, 73.44%, 74.9%, .5);
    h1 {
        font-size: 1rem;
        color: hsl(205.46, 86.5%, 46.47%);
        text-shadow: 0 0 5px hsla(120, 73.44%, 74.9%, .5);
    }
    img {
        width: 110px;
    }
    @media screen and (max-width: 480px),
    screen and (max-height: 700px) {
        margin: 30px 0;
    }
`;
const DivLogin = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    svg {
        font-size: 72px;
        color: hsl(205.46, 86.5%, 46.47%);
    }
    @media (max-width: 480px) {
        flex-direction: column;
    }
`;
const DivMenus = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;
    svg {
        font-size: 82px;
        color: hsl(205.46, 86.5%, 46.47%);
    }
`;
const DivIconDoble = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 30px;
    a {
        transition: .3s ease-in-out;
    }
    a:hover {
        transform: scale(1.1);
        filter: drop-shadow(hsl(120, 73.44%, 74.9%) 0 0 5px);
    }
`;
export { MainPrimary, MainSecondary, DivForms, DivButtons, MainLogin, SectionLogin, DivLogin, DivMenus, DivIconDoble };