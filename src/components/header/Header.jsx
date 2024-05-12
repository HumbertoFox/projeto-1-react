import { Header, ImgMedicina, UlHeader } from "../styles/headerstyle";

export const HeaderMenu = () => {
    return (
        <Header>
            <ImgMedicina src="./src/assets/images/simbolo-de-medicina.png" alt="Icon Medicina" />
            <UlHeader>
                <li title="Relatório">
                    <img src="./src/assets/images/pagina-inicial.png" alt="Icone Home" />
                    <span class="li-text">Página Relatório</span>
                </li>
                <li>
                    <img src="./src/assets/images/doutorax.png" alt="Icone doutora" />
                    <span class="div-text">Doutora teste</span>
                </li>
                <li  title="Consulta Doutora">
                    <img src="./src/assets/images/agenda.png" alt="Icone agenda" />
                    <span class="li-text">Consulta</span>
                </li>
                <li title="Retorno Doutora">
                    <img src="./src/assets/images/confirmar.png" alt="Icone confirmar" />
                    <span class="li-text">Retorno</span>
                </li>
                <li>
                    <img src="./src/assets/images/doutor.png" alt="Icone doutor" />
                    <span class="div-text">Doutor teste</span>
                </li>
                <li title="Consulta Doutor">
                    <img src="./src/assets/images/agenda.png" alt="Icone agenda" />
                    <span class="li-text">Consulta</span>
                </li>
                <li title="Retorno Doutor">
                    <img src="./src/assets/images/confirmar.png" alt="Icone confirmar" />
                    <span class="li-text">Retorno</span>
                </li>
            </UlHeader>
        </Header>
    )
};