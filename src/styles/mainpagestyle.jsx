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
    transition: .3s ease-in-out;
    @media (max-width: 820px) {
        width: calc(100% - 75px);
        left: 75px;
    }
    @media (max-width: 480px) {
        width: 375px;
    }
`;

const DivForms = styled.div`
    display: flex;
    flex-direction: column;
`;

export { MainPrimary, MainSecondary, DivForms };