import React from "react";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/header";
import { FormPatientDr } from "../components/form/formpatientdr";

export const ConsultaDR = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search />
                    <FormPatientDr />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    )
}