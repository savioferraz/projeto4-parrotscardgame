let qtdcartas = 8;
let figurascartas = [
    "bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"
];
let temCartaVirada = false;
let primeiraCarta;
let segundaCarta;

// iniciar();
// function iniciar(){
//     qtdcartas = prompt ("Com quantas cartas deseja jogar? (utilize apenas números pares de 4 a 14)");
// while (isNaN(qtdcartas) || (qtdcartas % 2 != 0) || (qtdcartas < 3) || (qtdcartas > 14)) {
//     iniciar();
// }
// }

for (let i = 0; i < (qtdcartas / 2); i++){
    const cartasTemplate = `
     <div class="cartaLayout" onclick="virar(this)">
        <div class="cartaConteudo" data-figura="${figurascartas[i]}">
            <div class="frente"><img src="./images/front.png" style="width:100px;height:100px";></div>
            <div class="verso"><img src="./images/${figurascartas[i]}.gif" style="width:100px;height:100px"></div>
        </div> 
   </div>`;
document.querySelector(".tabuleiro").innerHTML += cartasTemplate;
document.querySelector(".tabuleiro").innerHTML += cartasTemplate;
}

function virar(elemento) {
    cartaVirada = elemento.querySelector(".cartaConteudo");
    cartaVirada.classList.add("virado");
    if (!temCartaVirada) {
        temCartaVirada = true;
        primeiraCarta = cartaVirada;
    }
    else if (temCartaVirada) {
        segundaCarta = cartaVirada;
    }
    setTimeout(checarPar, 1000);
}

function checarPar() {
    if (primeiraCarta.dataset.figura === segundaCarta.dataset.figura) {
        removerCartas();
    }
    desvirarCartas()
}

function removerCartas() {
    primeiraCarta.classList.add("removido");
    segundaCarta.classList.add("removido");
}

function desvirarCartas(){
    primeiraCarta.classList.remove("virado");
    segundaCarta.classList.remove("virado");
}
