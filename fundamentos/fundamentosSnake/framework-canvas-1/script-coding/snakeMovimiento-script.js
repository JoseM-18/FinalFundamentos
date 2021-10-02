// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {}
let FOTO = null;
const SIZE = 10;
const dx = 9;
const dy = 9;
const alto = 499;
const ancho = 499;
let comeserpiente = null;
const rate=10;
const audio3 = new Audio("sonidos/intro1.wav");
const explosion=new Audio("sonidos/explosion.mp3");
const cargabomba=new Audio("sonidos/cargabomba.mp3");
const suspenso=new Audio("sonidos/suspenso.wav");
 

//Reproduce el audio cuando la serpierte entra o sale del portar.
//@param ()
//@returns sound
function teleportsound(){
  const audio2 = new Audio("sonidos/teleport.wav");
    audio2.play();
}

//Reproduce el audio de la comida cuando la serpiente se alimenta.
//@param ()
//@returns sound
function foodSound(){
  const audio1 = new Audio("sonidos/comer.wav");
    audio1.play();
}



//Reproduce audio cuando la serpierte muere.
//@param ()
//@returns sound
function deathSound(){
   const audio4 = new Audio("sonidos/death.wav");
    audio4.play();
}
 //Actualiza la direccion de la serpiente. Creando una nuevo cabeza hacia la direccion deseada y removiendo la cola
 //@param {array, array, num} datos
 //@returns {object} 
function moveSnake(snake, dir, a = -1) {
  const head = first(snake);
  return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake.slice(0, length(snake) + a));
}

//actualiza la serpiente agregando un valor a la cola 
//@para {array,array} datos
//@returns {object} lista  

function crecer(snake, dir) {
  const head = first(snake);
  return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake.slice(0, length(snake)));
}



/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(9);
  createCanvas(alto, ancho);
  Mundo = 
  { foto: loadImage("images/playa.png"), comeserpiente:loadImage("images/pepino.png"),
   snake: [{ x: 6, y: 27 }, { x: 5, y: 27  }, { x: 4, y: 27  }, { x: 3, y: 27 }, { x: 2, y: 27  }, { x: 1, y: 27  }],
   dir: { x: 1, y: 0 }, portal: { x: 102, y: 430 }, puntoRojo: { x: 350, y: 430 }, score: 0,rate:5, x: 1, y: 270, ancho: 30, alto: 40, dirx: 10, diry: 10,lives:3,
   color:{a:14,b:209,c:69},mina:{x:150,y:150,time:0,cantidad:1}, ultMovimiento:"right",burbuja1:loadImage("images/burbuja1.png"),burbuja3:loadImage("images/burbujacoco.png"),
   bomba:loadImage("images/bomba.png"),voy:loadImage("images/vooy.png"),gameover:loadImage("images/gameover.png"),s1:loadImage("images/s1.png"),s2:loadImage("images/s2.png"),
   pdirx:0,pdiry:0,espacio:0,tiempoS:0,tiempoz:1}
  
}

////////////////////////
function drawFood(portal) {
  forEach(portal, part => {
    fill(200, 20, 10);
    ellipse(part.x * dx, part.y * dy, dx, dy);
  });
}



//pinta la serpiente por cada posicion de la lista en el tablero y recibe tres parametros (a,b,c) que determinan el color de la serpiente
//@para {object,num, num,num} 
//@returns {object} lista  
function pintarSnake(snake,a,b,c) {

  fill(a,b,c);

  forEach(snake, s => {
    rect(s.x*dx , s.y*dy , dx, dy);
  });
}

//pintar Mina recibe la posicion de la mina, le agrega color ancho y alto
//@para {object}
//@returns rectangulo

function pintarMina(mina) {
  fill(14,209,69);
  image(Mundo.bomba,mina.x*dx ,mina.y*dy , dx+50, dy+40);
  
}

//Dibuja el muñeco que persigue la serpiente dentro del mapa.
//@param {array}
//@returns {objecto}
function pintarComeserpiente(Mundo) {

  fill(232, 249, 9);
  image(Mundo.comeserpiente, Mundo.x, Mundo.y, Mundo.ancho, Mundo.alto);

}

//pinta las vidas de la serpiente
//@para {array}
//@returns {objeto} 

function drawLives(lives) {
  textFont('Showcard gothic', 30);
  text("Lives: " + lives, 10, 490);
}
//pinta el score del jugador
//@para {array} 
//@returns {objeto} 

function drawScore(score) {
  textFont('Showcard gothic', 30);
  text("Score: " + score, 350, 490);
  
}
// Dibuja algo en el canvas. Aqui se ponen todas las funciones de dibujo y esta funcion las dibuja en el tablero
//@para {array} 
//@returns {objeto} 
function drawGame(Mundo) {

  image(Mundo.foto, 0, 0);
  pintarSnake(Mundo.snake,Mundo.color.a,Mundo.color.b,Mundo.color.c);
  fill(248, 7, 7);
  s = Mundo.portal;
  m = Mundo.puntoRojo;

  drawScore(Mundo.score);
  rect(m.x, m.y, 10, 10, 10);
  fill(150, 150, 150);
  rect(s.x, s.y, 30, 30, 40);
  pintarComeserpiente(Mundo);
  drawLives(Mundo.lives);
  pintarMina(Mundo.mina);

  if(Mundo.score>6){
    if(Mundo.tiempoz % 2 ==0){  
    image(Mundo.s1,120,100,300,300) 
    }
    if(Mundo.tiempoz % 2 !=0){
      image(Mundo.s2,120,100,300,300)
    } 
  }
  if (Mundo.lives==0){
    image(Mundo.gameover,0,0,499,499) ;
  }
  
  if(Mundo.score>2 && Mundo.score<4){
    image(Mundo.burbuja1,1,50,160,120) ;
  }
   if(Mundo.score>3 && Mundo.score<5){
    image(Mundo.burbuja3,200,55,160,120) ;
  }if(Mundo.score>4 && Mundo.score<6){
    image(Mundo.voy,15,170,160,120) ;
  }
  
}

// Esta funcion ya evaluada la posicion del comeserpiente con la de la mina,si lo toca,almacena la direccion del comeserpiente en la variable pdirx y pdiry. Agrega un tiempo y mantiene al comerserpiente congelado por este lapso.
//@para {array} 
//@returns {objeto}
function mina(Mundo){
  mancho = Mundo.ancho;

  if(evaluarPosicion(Mundo)){
    explosion.play();
    return update(Mundo, { dirx:0, diry:0,mina:{x:600,y:600,time:35},pdirx:mdirx,pdiry:mdiry });

  }if(Mundo.mina.time==2){ 
    
    return update(Mundo, { dirx:Mundo.pdirx , diry:Mundo.pdiry,mina:{time:Mundo.mina.time-1} });
    
  }return update(Mundo, { dirx:0, diry:0,mina:{time:Mundo.mina.time-1} });

}

// Esta funcion evalua la posicion del comeserpiente con la de la mina, retorna falso o verdadero y se utiliza en la funcuin mina
//@para {array} 
//@returns bool

function  evaluarPosicion(Mundo){
  malto = Mundo.alto;
  mancho = Mundo.ancho;
  mx = Mundo.x;
  my = Mundo.y;
  mmx=Mundo.mina.x;
  mmy=Mundo.mina.y;
  return  ((mx + mancho > mmx*dx &&  mx + mancho < mmx*dx+59) && (my + malto > mmy*dy+19 &&  my + malto < mmy*dx+59));
}





// Esta funcion evalua la posicion del comeserpiente para verificar si tOca una mina, un borde o toca a la serpiente Y SEGUN LA ACCION desencadena otra funcion.
//@para {array} 
//@returns objeto
function cocoLoco(Mundo) {
    malto = Mundo.alto;
    mancho = Mundo.ancho;
    mx = Mundo.x;
    my = Mundo.y;
    mdirx = Mundo.dirx;
    mdiry = Mundo.diry;

    if ( (evaluarPosicion(Mundo)) || Mundo.mina.time>1 ){
        return mina(Mundo);

    } if (mx + mancho > ancho) {
      return update(Mundo, { x: mx - mdirx, dirx: -mdirx });
    } if (mx < 1) {
      return update(Mundo, { x: mx - mdirx, dirx: -mdirx });
    } if (my + malto > alto) {
      return update(Mundo, { y: my - mdiry, diry: -mdiry });
    } if (Mundo.y < 1) {
      return update(Mundo, { y: my - mdiry, diry: -mdiry });
    }
    return update(Mundo, { x: Mundo.x + mdirx, y: Mundo.y +mdiry });
  }

  
  
//cambia la posicion de la serpiente
//@para {array} datos
//@returns {objeto} datos
function teletransporte(snake) {
  //const head = first(snake);
  //return update(Mundo,{snake: [{ x: snake.x, y: snake.y }] });
  return cons({ x: 47, y: 43 }, snake.slice(0, length(snake)));
}




//disminuye la vida de la serpiente deacuerdo a la cantidad de sus muertes
//@para {array,array} datos
//@returns {objeto} datos
function quitarVidas(Mundo,colisionM){
  if(colisionM){
  return update(Mundo, { dir: { x: 0, y: -1 }, 
  snake: teletransporte(Mundo.snake),lives:Mundo.lives - 1 ,
  color:{a:100*Mundo.lives,b:209,c:1},x:1,y:300,ultMovimiento:"up",});

  }return update(Mundo, { dir: { x: 0, y: -1 }, snake: teletransporte(Mundo.snake),lives:Mundo.lives - 1 , puntoRojo:{x:350,y:250} ,color:{a:100*Mundo.lives,b:209,c:1},ultMovimiento:"up"});
}




//esta funcion evalua multiples acciones, entre ellas, los choques con paredes y objetos en movimientos
//@para {array} datos
//@returns {objeto} datos

function acciones(Mundo) {
  x = first(Mundo.snake).x * dx;
  y = first(Mundo.snake).y * dy;
  f = Mundo.puntoRojo;

  if ((x > f.x - 10 && x < f.x + 10) && (y > f.y - 10 && y < f.y + 10)) {
    const x=Mundo.rate+3;
    frameRate(x);
    foodSound();
    
    return update(Mundo, { rate:x, snake: moveSnake(Mundo.snake, Mundo.dir, 1), puntoRojo: { x: Math.floor(Math.random() * (480 - 20)) + 0, y: Math.floor(Math.random() * (480 - 270)) + 270 }, score: Mundo.score + 1 });
    
  } if ((x < 135 && x > 107) && (y < 460) && (y > 427)) {
    teleportsound();
    return update(Mundo, { snake: teletransporte(Mundo.snake),dir: { x: 0, y: -1 },ultMovimiento:"up" });

  } if (x < 1 || x >= 480 || y < 1|| y >= 480||colisionComeserpiente(Mundo.snake,Mundo.x,Mundo.y) || colision(rest(Mundo.snake),first(Mundo.snake)) ) {
    deathSound();
    return quitarVidas(Mundo,colisionComeserpiente(Mundo.snake,Mundo.x,Mundo.y));
  }
  return update(Mundo,{snake: moveSnake(Mundo.snake, Mundo.dir) });
}



//Confirma si la cabeza está chocando con el cuerpo y retorna true de ser asi(lo cual provoca su muerte).
//@param {array,array}
//@returns bool
function colision(snake,head){
  const x=head.x;
  const y=head.y;
  const f=first(snake);

  if(isEmpty(snake)){
    return false;
  }
  if((x ===f.x ) && (y ==f.y )){ 
    return true;
  }
  
  return colision(rest(snake),head);
}



// Esta funcion confirma si la serpierte colisiona con el comeserpiente
//@para {array} 
//@returns bool
function colisionComeserpiente(snake1,x,y){
  snake=first(snake1)
  if(isEmpty(snake1)){
    
    return false;
  }
  if(((snake.x*9 >= x-15) && (snake.x*9<= x+26)) && (snake.y*9 >=y-7 && snake.y*9 <=y+30  )){ 
   
    return true;
  }
  
  return colisionComeserpiente(rest(snake1),x,y);
}



//Esta función no se utilizó.
function onMouseEvent(Mundo, event) {
  return update(Mundo,{});
}

//  
//@para {array} 
//@returns 
function onTic(Mundo) {

  if (Mundo.lives==0){
    return update(Mundo, { dirx: 0, diry: 0 });

  }if(Mundo.espacio>20){
    audio3.play();
    return update(Mundo, { })

  }if(Mundo.score>6){
    frameRate(5);
    suspenso.play();
    if(Mundo.tiempoS>8){
            return update(Mundo, { lives:0,tiempoz:Mundo.tiempoz+1});
            
    }return update(Mundo, { tiempoS:Mundo.tiempoS+0.1,tiempoz:Mundo.tiempoz+1});

  }if(Mundo.score>5 && Mundo.tiempoz==1){
    audio3.play();
    return cocoLoco(acciones(Mundo));
  }
  audio3.play();
  return acciones(Mundo);
}

/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent(Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
  switch (keyCode) {
    case UP_ARROW:
      if(Mundo.ultMovimiento!="down")
      {
        return update(Mundo, { dir: { y: -1, x: 0 },ultMovimiento:"up" });

      }return update(Mundo,{});
      break;


    case DOWN_ARROW:
      if(Mundo.ultMovimiento!="up")
        {

          return update(Mundo, { dir: { y: 1, x: 0 },ultMovimiento:"down" });

        }return update(Mundo,{});
        break;


    case LEFT_ARROW:
        if(Mundo.ultMovimiento!="right")
        {

          return update(Mundo, { dir: { y: 0, x: -1 },ultMovimiento:"left" });

        }return update(Mundo,{});
        break;



    case RIGHT_ARROW:
        if(Mundo.ultMovimiento!="left"){

          return update(Mundo, { dir: { y: 0, x: 1 },ultMovimiento:"right" });

        }return update(Mundo,{});
        break;


     // tecla de barra espaciadora   
    case 32:
      if(Mundo.mina.cantidad>0 && Mundo.score < 7 )
      { 
      cargabomba.play();
      return update(Mundo, {mina:{x:first(Mundo.snake).x, y:first(Mundo.snake).y , cantidad:Mundo.mina.cantidad-1 } });

      }if(Mundo.score>6){
        
        return update(Mundo,{espacio:Mundo.espacio+1})

      }return update(Mundo,{});

    default:
      console.log(keyCode);
      return update(Mundo, {});
  }
}




