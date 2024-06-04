import styled from "styled-components";

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

export { MainPrimary, MainSecondary, DivForms, DivButtons, MainLogin, SectionLogin, DivLogin };