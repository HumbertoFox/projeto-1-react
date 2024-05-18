import React from "react";
import { Search } from "../components/search/search";
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/Header";

export const ConsultaDR = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <Search />
            </MainSecondary>
        </MainPrimary>
    )
}