import styled from "styled-components";

const DivReportMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;

    h1 {
        font-size: 18px;
        margin-bottom: 5px;
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
        font-size: 14px;
        font-weight: bold;
    }
`;

const Tbody = styled.tbody`
    th {
        font-size: 14px;
    }
`;

export { DivReportMain, DivInforReport, TableFormInfo, Thead, Tbody };