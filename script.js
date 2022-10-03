// Contador de vez
let vez = 0;

// Iniciando jogadas para jogadores
let jogadasA = new Array(0);
let jogadasB = new Array(0);

// Coletando o nome dos jogadores
const playerA = prompt("Escolha o nome do primeiro jogador:");
const playerB = prompt("Escolha o nome do segundo jogador:");

// Casas que já foram jogadas:
let historico = new Array(0);

// Outras variáveis mais genéricas:
let aux;
let tempo;
let vencedor = "Jogo em progresso!";

// Vitorias possíveis:
const vitorias = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[3, 5, 7],
[1, 5, 9]];

//  Função para coletar o tempo atual:
function pegaTempo() {
  return Math.floor(Date.now() / 1000)
};

// Pegando o tempo incial:
tempo = pegaTempo();

// Função para escolher quem vai começar:
function quemComeca(playerA, playerB) {
  let x = Math.ceil(Math.random() * 1000);
  if (x % 2 == 0) {
    document.getElementById("primeiro").innerHTML = playerA;
    document.getElementById("segundo").innerHTML = playerB;
    alert("O jogador que vai começar será: " + playerA);
    return [playerA, playerB];
  } else {
    document.getElementById("primeiro").innerHTML = playerB;
    document.getElementById("segundo").innerHTML = playerA;
    alert("O jogador que vai começar será: " + playerB);
    return [playerB, playerA];
  }
};

// Jogador a iniciar
const iniciante = quemComeca(playerA, playerB);
document.getElementById("sJogadorDaVez").innerHTML = iniciante[0];

// Função que trava mouse e casas:
function travaCasas() {
  document.getElementById("1").className = "tileAcabou";
  document.getElementById("2").className = "tileAcabou";
  document.getElementById("3").className = "tileAcabou";
  document.getElementById("4").className = "tileAcabou";
  document.getElementById("5").className = "tileAcabou";
  document.getElementById("6").className = "tileAcabou";
  document.getElementById("7").className = "tileAcabou";
  document.getElementById("8").className = "tileAcabou";
  document.getElementById("9").className = "tileAcabou";
};

// Função que verifica se dois arrays são iguais
function contemArray(a, b) {
  let contem = a.every(ai => b.includes(ai));
  if (contem) {
    return true;
  } else {
    return false;
  }
};

// Função que determina vitória ou velha
function vitoria(jogadas, player) {
  for (var i = 0; i < vitorias.length; i++) {
    let x = vitorias[i];
    if (contemArray(x, jogadas)) {
      document.getElementById("sJogadorDaVez").innerHTML = player;
      return true;
    }
  }
  return false;
};

// Função que determina se a casa já foi jogada:
function repetiu(id) {
  if (historico.includes(+id)) {
    alert("Essa casa já foi escolhida! Escolha outra!");
    vencedor = "Jogo em progresso!";
  }
  return vencedor;
};

// Função que ajusta outputs da jogada:
function deuNoQue(jogadas, player) {
  if (vitoria(jogadas, player)) {
    //  Modificamos a vez para 999
    vez = 999;
    //  Guardamos o vencedor:
    aux = player;
    // Guaradamos a frase:
    vencedor = player + " venceu!";
    //  Acionamos o freio de cliques:
    travaCasas();
    // Pegamos o tempo decorrido:
    final = pegaTempo();
    if (player == iniciante[0]) {
      document.getElementById("primeiroPontos").innerHTML = Number(document.getElementById("primeiroPontos").innerHTML) + 1;
    } else {
      document.getElementById("segundoPontos").innerHTML = Number(document.getElementById("segundoPontos").innerHTML) + 1;
    }
    // Declarando o vencedor:
    document.getElementById("vencedor").innerHTML = vencedor;
    document.getElementById("tempo").innerHTML = final - tempo;
    debbugMeu();
    restart();
    // Caso não haja vitória, apenas seguimos aumentando a vez:
  } else {
    vez++;
    final = tempo;
    debbugMeu();
  }
  return [aux, vez, vencedor, final];
};

// Função para descobrir o que acontece na última rodada:
function ultimaDeuNoQue(jogadas, player) {
  if (vitoria(jogadas, player)) {
    //  Guardamos o vencedor:
    vez = 999;
    aux = player;
    // Guaradamos a frase:
    vencedor = player + " venceu!";
    //  Acionamos o freio de cliques:
    travaCasas();
    if (player == iniciante[0]) {
      document.getElementById("primeiroPontos").innerHTML = Number(document.getElementById("primeiroPontos").innerHTML) + 1;
    } else {
      document.getElementById("segundoPontos").innerHTML = Number(document.getElementById("segundoPontos").innerHTML) + 1;
    }
    // Declarando o vencedor:
    document.getElementById("vencedor").innerHTML = vencedor;
    document.getElementById("tempo").innerHTML = final - tempo;
    debbugMeu();
    restart();
    // Caso não haja vitória, deu velha
  } else {
    vez = 0;
    vencedor = "Deu velha!";
    travaCasas();
    // Declarando o vencedor:
    document.getElementById("vencedor").innerHTML = vencedor;
    document.getElementById("tempo").innerHTML = final - tempo;
    debbugMeu();
    restart();

  }

  final = pegaTempo();
  return [aux, vez, vencedor, final];
};

// Função para debugar no console:
function debbugMeu() {
  console.log("tempo: " + tempo);
  console.log("final: " + final);
  console.log("vencedor: " + vencedor);
  console.log("vez: " + vez);
  console.log("jogadasA: " + jogadasA);
  console.log("jogadasB: " + jogadasB);
  console.log("historico: " + historico);
  console.log("================================");
};

// Função de restart:
function restart() {
  // Resetando histórico e vez;
  tempo = pegaTempo();
  vencedor = "Jogo em progresso!";
  final = tempo;
  jogadasA = new Array(0);
  jogadasB = new Array(0);
  historico = new Array(0);
  vez = 0;

  // Limpando figuras do tabuleiro:
  document.getElementById("1").innerHTML = "";
  document.getElementById("2").innerHTML = "";
  document.getElementById("3").innerHTML = "";
  document.getElementById("4").innerHTML = "";
  document.getElementById("5").innerHTML = "";
  document.getElementById("6").innerHTML = "";
  document.getElementById("7").innerHTML = "";
  document.getElementById("8").innerHTML = "";
  document.getElementById("9").innerHTML = "";

  // Devolvendo a classe original:
  document.getElementById("1").className = "tile";
  document.getElementById("2").className = "tile";
  document.getElementById("3").className = "tile";
  document.getElementById("4").className = "tile";
  document.getElementById("5").className = "tile";
  document.getElementById("6").className = "tile";
  document.getElementById("7").className = "tile";
  document.getElementById("8").className = "tile";
  document.getElementById("9").className = "tile";

}

// Função principal que marca o símbolo nos quadrados e define as regras:
function marcarSimbolo(event) {

  // Coletando o evento e o id: 
  let clickado = event.target;
  let id = clickado.id;

  // Verificando se a casa já foi jogada:
  vencedor = repetiu(id)

  // Adicionamos a jogada ao histórico geral
  historico.push(+id);

  // Caso seja jogada ímpar e ainda tem jogo para jogar
  if (vez % 2 != 0 && vez < 8) {
    // Atualiza nome no jogador da vez:
    document.getElementById("sJogadorDaVez").innerHTML = iniciante[0];
    // Acrescenta a jogada no histórico do jogador
    jogadasA.push(+id);
    // Acrescenta Imagem no quadrado clicado com O:
    document.getElementById(id).innerHTML = "<img src='imgs/circle.jpg'>";
    // Entendendo o que houve:
    oqh = deuNoQue(jogadasA, playerA);
    vez = oqh[1];
    aux = oqh[0];
    vencedor = oqh[2];
    final = oqh[3];

    // Caso seja jogada par e ainda tem jogo para jogar
  } else if (vez % 2 == 0 && vez < 8) {
    // Atualiza nome no jogador da vez:
    document.getElementById("sJogadorDaVez").innerHTML = iniciante[1];
    // Acrescenta a jogada no histórico do jogador
    jogadasB.push(+id);
    // Acrescenta Imagem no quadrado clicado com X:
    document.getElementById(id).innerHTML = "<img src='imgs/xis.jpg'>";
    // Entendendo o que houve:
    oqh = deuNoQue(jogadasB, playerB);
    vez = oqh[1];
    aux = oqh[0];
    vencedor = oqh[2];
    final = oqh[3];

    // Caso seja a última jogada pode dar vitória ou velha
  } else if (vez == 8) {
    // Atualiza nome no jogador da vez:
    document.getElementById("sJogadorDaVez").innerHTML = iniciante[1];
    // Acrescenta a jogada no histórico do jogador A
    jogadasA.push(+id);
    // Acrescenta Imagem no quadrado clicado com X:
    document.getElementById(id).innerHTML = "<img src='imgs/xis.jpg'>";
    // Entendendo o que houve:
    oqh = ultimaDeuNoQue(jogadasA, playerA);
    vez = oqh[1];
    aux = oqh[0];
    vencedor = oqh[2];
    final = oqh[3];

    // Nesse caso sem vitória e sem casas para marcar temos velha:
  } else {
    if (vez == 999) {
      vencedor = aux + " venceu!";
      debbugMeu();
    } else {
      vencedor = "Deu velha!";
      debbugMeu();
    }
  }
};

