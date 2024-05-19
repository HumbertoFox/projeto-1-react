import React from "react";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/header";

export const Relatory = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <h1>Relatório</h1>
            </MainSecondary>
        </MainPrimary>
    )
}