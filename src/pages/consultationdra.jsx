import React from "react";
import { HeaderMenu } from "../components/header/header";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { FormPatientDra } from "../components/form/formpatientdra";

export const ConsultaDRA = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search />
                    <FormPatientDra />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    )
}