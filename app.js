let listaDeNumerosSortiados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if (`speechSynthesis` in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = `pt-BR`;
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
    }

function exibirMensangemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensangemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'acertou!');
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descubriu o número secreto com ${tentativas} ${palavratentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'Errou!');
            exibirTextoNaTela('p', 'O número secreto é menor');
         } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
         }
         tentativas ++;
         limparCampo();

    }
}

function gerarNumeroAleatorio() {
   let NumeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSortiados.length;

   if (listaDeNumerosSortiados == numeroLimite) {
    listaDeNumerosSortiados = [];
   }

   if (listaDeNumerosSortiados.includes(NumeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSortiados.push(NumeroEscolhido);
    console.log(listaDeNumerosSortiados);
    return NumeroEscolhido;
   }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensangemInicial();
    document.getElementById('reiniciar').setAttribute('disabled' ,true);
}
