import styled from "styled-components";

const MainPrimary = styled.main`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    @media (max-width: 480px) {
        min-width: 375px;
    }
`;

const MainSecondary = styled.div`
    position: relative;
    width: calc(100vw - 200px);
    left: 200px;
    min-height: 100vh;
    display: flex;
    padding: 10px 5px;
    @media (max-width: 820px) {
        transition: .3s ease-in-out;
        width: calc(100vw - 75px);
        left: 75px;
    }
`;

const DivForms = styled.div`
    display: flex;
    flex-direction: column;
`;

export { MainPrimary, MainSecondary, DivForms };