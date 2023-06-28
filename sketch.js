//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 27;
let raio = diametro/2;

//Variaveis da velocidade da bolinha
let velocidadeXBolinha = 3;
let velocidadeYBolinha = 3;

//Variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Variaveis Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Variaveis sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentoBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoBiblioteca(xRaquete,yRaquete);
  mostrarRaquete(xRaqueteOponente,yRaqueteOponente);
  //movimentaRaqueteOponenteBot();
  verificaColisaoBiblioteca(xRaqueteOponente,yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  movimentaRaqueteOponente();
  bolinhaNaoFicaPresa();
}

function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0 ){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function mostrarRaqueteOponente(){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaqueteOponente(){
  if (xBolinha - raio < xRaqueteOponente + raqueteComprimento && yBolinha - raio > yRaqueteOponente + raqueteAltura && yBolinha + raio < yRaqueteOponente){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoBiblioteca(x,y){
 colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponenteBot(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 -70;
  yRaqueteOponente += velocidadeYOponente;
}

function movimentaRaqueteOponente(){
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(255, 140, 0);
  rect(50, 10, 40, 20);
  rect(510, 10, 40, 20);
  fill(255);
  text(meusPontos, 70, 26);
  fill(255);
  text(pontosOponente, 530, 26);
}

function marcaPonto(){
  if (xBolinha > 585){
    meusPontos += 1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
  }
  if (xBolinha < 15){
    pontosOponente += 1;
    ponto.play();
    xBolinha = 300;
    yBolinha = 200;
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
    xBolinha = 300;
    yBolinha = 200;
  }
}