//Declaracion de varaibles HTML
const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
//Configuracion del juego
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
//Ciclo para 
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))
//Definicion de aliens en la pantalla
const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

//Dibuja todas las posiciones de los aliens invasores+
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()
//Funcion para remover un cuadrito de los aliens cuando les toque bala
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}
//Disparo
squares[currentShooterIndex].classList.add('shooter')

//Movimiento de la nave disparadora
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
      //Mover a la izquierda
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
      //Mover a la derecha
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)
//Movimiento de los aliens
function moveInvaders() {
    //Movimiento de un espacio de derecha a izquierda y viceversa
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()
//Funcion perdedor, por si toca suelo los aliens
  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }//Funcion ganador: cuando todos los aliens hayan sido eliminados
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 600)
//Funcion del disparo
function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  //Movimiento rectilineo del laser
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')
//En caso de que el disparo toque a un alien
    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)
//Remover el alien
      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  //Boton tecla arriba para disparo
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
 /*  Temas vistos
    • querySelector(): Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) que coincida con el grupo especificado de selectores.
  • addEventListener(): Registra un evento a un objeto en específico.
  • Switch cases: evalúa una expresión, comparando el valor de esa expresión con una instancia case, y ejecuta declaraciones asociadas a ese case, así como las declaraciones en los case que siguen.
  • indexOf(): retorna el primer índice en el que se puede encontrar un elemento dado en el array, ó retorna -1 si el elemento no esta presente.
  • includes(): Determina si una matriz incluye un determinado elemento, devuelve true o false según corresponda.
  • classList: Devuelve una colección activa de DOMTokenList de los atributos de clase del elemento.
  • setInterval(): Ejecuta una función o un fragmento de código de forma repetitiva cada vez que termina el periodo de tiempo determinado. Devuelve un ID de proceso.
  • clearInterval(): Cancela una acción reiterativa que se inició mediante una llamada a setInterval.
  • push(): Añade uno o más elementos al final de un array y devuelve la nueva longitud del array
 
 
 
 */