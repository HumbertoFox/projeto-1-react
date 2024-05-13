import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import {
    Relatory
} from "./relarory";
import {
    ConsultaDRA
} from "./consultationdra";
import { ConsultaDR } from "./consultationdr";

export const AppRouters = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Relatory />} />
                <Route path="/" element={<ConsultaDRA />} />
                <Route path="/" element={<ConsultaDR />} />
            </Routes>
        </BrowserRouter>
    )
};