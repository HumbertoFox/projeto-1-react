const menuLiItens = document.querySelectorAll('.navulli');

function selectMenuLi() {
    menuLiItens.forEach((liitens) => 
        liitens.classList.remove('activa')
    );
    this.classList.add('activa');
};

menuLiItens.forEach((liitens) =>
    liitens.addEventListener('click', selectMenuLi)
);

