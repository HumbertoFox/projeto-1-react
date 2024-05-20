import React from "react";
import { HeaderMenu } from "../components/header/menuheader";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormPatientDrX } from "../components/form/formpatientdrx";

export const ConsultationDrX = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search />
                    <FormPatientDrX />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    )
}