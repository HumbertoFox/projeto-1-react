import { HeaderMenu } from "../components/header/menuheader"
import { DivHomeMain } from "../styles/homestyle"
import { MainPrimary, MainSecondary } from "../styles/mainpagestyle"

export const HomePage = () => {
    return (
        <MainPrimary>
            <HeaderMenu />
            <MainSecondary>
                <DivHomeMain>
                    <h1>Calendario</h1>
                </DivHomeMain>
            </MainSecondary>
        </MainPrimary>
    )
}