import styled from "styled-components";
const DivReportMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;

    h1 {
        font-size: 1.1rem;
        margin-bottom: 5px;
        text-shadow: 0 0 5px hsla(205.46, 86.5%, 46.47%, .5);
    }
`;
const DivInforReport = styled.div`
    width: 100%;
    display: block;
`;
const TableFormInfo = styled.table`
    width: 100%;
`;
const Thead = styled.thead`
    th {
        font-size: .9rem;
        font-weight: bold;
        text-shadow: 0 0 5px hsla(120, 73.44%, 74.9%, .5);
    }
`;
const Tbody = styled.tbody`
    td {
        font-size: .8rem;
    }
`;
export { DivReportMain, DivInforReport, TableFormInfo, Thead, Tbody };