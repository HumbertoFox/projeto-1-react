import React from "react";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { FormPatientDrY } from "../components/form/formpatientdry";

export const ConsultationDrY = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search />
                    <FormPatientDrY />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    )
}