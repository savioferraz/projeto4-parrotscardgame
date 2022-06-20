let qtdcartas;
let figurascartas = [
    "bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"
];
let jogadas = 0;
let acertos = 0;
var bloquear = false;
var temCartaVirada = false;
var primeiraCarta;
var segundaCarta;

iniciar();
function iniciar(){
    qtdcartas = prompt ("Com quantas cartas deseja jogar? (utilize apenas números pares de 4 a 14)");
while (isNaN(qtdcartas) || (qtdcartas % 2 != 0) || (qtdcartas < 3) || (qtdcartas > 14)) {
    iniciar();
}
distribuirCartas(qtdcartas);
}

function distribuirCartas(num){
    contador = 0;
    let figurasArray = figurascartas.slice(0, num/2);
    let cartasArray = figurasArray.concat(figurasArray);
    cartasArray.sort(embaralhar);

    while (contador < qtdcartas) {
        const cartasTemplate = `
        <div class="cartaLayout" onclick="virar(this)">
            <div class="cartaConteudo" data-figura="${cartasArray[contador]}">
                <div class="frente"><img src="./images/front.png" style="width:100px;height:100px";></div>
                <div class="verso"><img src="./images/${cartasArray[contador]}.gif" style="width:100px;height:100px"></div>
            </div> 
    </div>`;
    let tabuleiro = document.querySelector(".tabuleiro");
    tabuleiro.innerHTML += cartasTemplate;
    contador ++;
    }
}

function embaralhar() {
    return Math.random() - 0.5;
}

function virar(elemento) {
    cartaVirada = elemento.querySelector(".cartaConteudo");
    cartaVirada.classList.add("virado");
    cartaVirada.parentNode.removeAttribute("onclick");
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
    primeiraCarta.parentNode.removeAttribute("onclick");
    segundaCarta.classList.add("removido");
    segundaCarta.parentNode.removeAttribute("onclick");
    temCartaVirada = false;
    primeiraCarta = undefined;
    segundaCarta = undefined;
    acertos ++;
    if (acertos === (qtdcartas/2)) {
        alert (`Parabéns! Você venceu com ${jogadas/2} jogadas!`);
        jogarNovamente();
    }
}

function desvirarCartas(){
    primeiraCarta.classList.remove("virado");
    primeiraCarta.parentNode.setAttribute("onclick", "virar(this)");
    segundaCarta.classList.remove("virado");
    segundaCarta.parentNode.setAttribute("onclick", "virar(this)");
    temCartaVirada = false;
    primeiraCarta = undefined;
    segundaCarta = undefined;
}

function jogarNovamente() {
    let resposta = prompt("Gostaria de jogar novamente? (responda 'sim' ou 'não')");
    if (resposta === "sim") {
        window.location.reload();
    }
    else if (resposta === "não") {
        alert ("Obrigado, até a próxima!");
    }
    else {
        jogarNovamente();
    }
}