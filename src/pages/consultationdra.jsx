import React from "react";
import { HeaderMenu } from "../components/header/Header";
import { Search } from "../components/search/search";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";

export const ConsultaDRA = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <Search />
            </MainSecondary>
        </MainPrimary>
    )
}