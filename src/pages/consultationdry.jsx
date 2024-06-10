import React from "react";
import { Search } from "../components/form/search";
import { DivForms, MainPrimary, MainSecondary } from "../styles/mainpagestyle";
import { HeaderMenu } from "../components/header/menuheader";
import { FormPatientDrs } from "../components/form/formpatientdrs";

export const ConsultationDrY = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivForms>
                    <Search />
                    <FormPatientDrs title={"5000"} />
                </DivForms>
            </MainSecondary>
        </MainPrimary>
    );
};