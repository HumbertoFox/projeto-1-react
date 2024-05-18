import styled from "styled-components";

const MainPrimary = styled.main`
    width: 100%;
    min-height: 100vh;
    display: flex;
    transition: .3s ease-in-out;
`;

const MainSecondary = styled.main`
    position: relative;
    width: calc(100% - 200px);
    left: 200px;
    min-height: 100vh;
    display: flex;
    column-gap: 10px;
    padding: 10px 0;
    transition: .3s ease-in-out;
    @media (max-width: 768px) {
        left: 75px;
    }
    @media (max-width: 480px) {
        width: 375px;
    }

`;

export { MainPrimary, MainSecondary };