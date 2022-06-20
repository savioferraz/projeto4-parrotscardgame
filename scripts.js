let qtdcartas = 14;
let figurascartas = [
    "bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"
];
let jogadas = 0;
let acertos = 0;
var bloquear = false;
var temCartaVirada = false;
var primeiraCarta;
var segundaCarta;

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
        <div class="cartaConteudo" style="order: ${i}" data-figura="${figurascartas[i]}">
            <div class="frente"><img src="./images/front.png" style="width:100px;height:100px";></div>
            <div class="verso"><img src="./images/${figurascartas[i]}.gif" style="width:100px;height:100px"></div>
        </div> 
   </div>`;
document.querySelector(".tabuleiro").innerHTML += cartasTemplate;
}

for (let i = (qtdcartas / 2); i < qtdcartas; i++){
    const cartasTemplate = `
     <div class="cartaLayout" onclick="virar(this)">
        <div class="cartaConteudo" style="order: ${i}" data-figura="${figurascartas[i-(qtdcartas/2)]}">
            <div class="frente"><img src="./images/front.png" style="width:100px;height:100px";></div>
            <div class="verso"><img src="./images/${figurascartas[i-(qtdcartas/2)]}.gif" style="width:100px;height:100px"></div>
        </div> 
   </div>`;
document.querySelector(".tabuleiro").innerHTML += cartasTemplate;
}

cartasNode = document.querySelectorAll(".cartaLayout");
const cartasArray = Array.from(cartasNode);

cartasArray.sort(embaralhar);

function embaralhar() {
    return Math.random() - 0.5;
}

function virar(elemento) {
    if (bloquear) return;
    if (this === primeiraCarta) return;
    cartaVirada = elemento.querySelector(".cartaConteudo");
    cartaVirada.classList.add("virado");
    if (!temCartaVirada) {
        temCartaVirada = true;
        primeiraCarta = cartaVirada;
        jogadas ++;
    }
    else if (temCartaVirada) {
        segundaCarta = cartaVirada;
        jogadas ++;
        setTimeout(checarPar, 1000);
        return;
    }
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
    temCartaVirada = false;
    primeiraCarta = undefined;
    segundaCarta = undefined;
    acertos ++;
    if (acertos === (qtdcartas/2)) {
        alert (`Parabéns! Você venceu com ${jogadas/2} jogadas!`);
    }
}

function desvirarCartas(){
    primeiraCarta.classList.remove("virado");
    segundaCarta.classList.remove("virado");
    temCartaVirada = false;
    primeiraCarta = undefined;
    segundaCarta = undefined;
}