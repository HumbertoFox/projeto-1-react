import { Header, ImgMedicina, UlHeader } from "../styles/headerstyle";
import LogoPrincipal from "../../assets/simbolo-de-medicina.png";
import LogoInicial from "../../assets/pagina-inicial.png";
import LogoDoutora from "../../assets/doutorax.png";
import LogoDoutor from "../../assets/doutor.png";
import LogoAgenda from "../../assets/agenda.png";
import LogoConfirmar from "../../assets/confirmar.png";

export const HeaderMenu = () => {
    return (
        <Header>
            <ImgMedicina src={LogoPrincipal} alt="Icon Medicina" />
            <UlHeader>
                <li title="Relatório">
                    <img src={LogoInicial} alt="Icone Home" />
                    <span class="li-text">Página Relatório</span>
                </li>
                <li>
                    <img src={LogoDoutora} alt="Icone doutora" />
                    <span class="div-text">Doutora teste</span>
                </li>
                <li  title="Consulta Doutora">
                    <img src={LogoAgenda} alt="Icone agenda" />
                    <span class="li-text">Consulta</span>
                </li>
                <li title="Retorno Doutora">
                    <img src={LogoConfirmar} alt="Icone confirmar" />
                    <span class="li-text">Retorno</span>
                </li>
                <li>
                    <img src={LogoDoutor} alt="Icone doutor" />
                    <span class="div-text">Doutor teste</span>
                </li>
                <li title="Consulta Doutor">
                    <img src={LogoAgenda} alt="Icone agenda" />
                    <span class="li-text">Consulta</span>
                </li>
                <li title="Retorno Doutor">
                    <img src={LogoConfirmar} alt="Icone confirmar" />
                    <span class="li-text">Retorno</span>
                </li>
            </UlHeader>
        </Header>
    )
};