const basket = document.getElementById('basket');
const gameArea = document.getElementById('gameArea');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const step = 20; //não esquecer
const fruitSound = new Audio('Default1.wav');
const wormSound = new Audio('def2.wav');


let score = 0;
let timeLeft = 45;
let timerInterval;
let bananaInterval;
let appleInterval;
let watermelonInterval;
let wormInterval;


startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  startGame();
});


document.addEventListener('keydown', (event) => {
  const left = basket.offsetLeft;

  if (event.key === 'ArrowLeft' && left > 0) {
    basket.style.left = `${left - step}px`;
  }
  if (event.key === 'ArrowRight' && left + basket.offsetWidth < gameArea.clientWidth) {
    let newPosition = left + step;
    if (newPosition + basket.offsetWidth > gameArea.clientWidth) {
      newPosition = gameArea.clientWidth - basket.offsetWidth;
    }
    basket.style.left = `${newPosition}px`;
  }
});

//para o bug


function startGame() {
  score = 0;
  timeLeft = 45;

  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('timer').textContent = `Time: ${timeLeft}s`;

 
  startFruitIntervals();
 
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}


function createFruit(imageSrc, speed, points) {
  const fruit = document.createElement('img');
  fruit.src = imageSrc;
  fruit.classList.add('fruit');

  if (imageSrc === 'pinneple.jpeg') {
    fruit.style.width = '100px';
    fruit.style.height = '100px';
  }

  const lanes = [0, 100, 200, 300, 400, 500];

  const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
  fruit.style.left = randomLane + 'px';
  fruit.style.top = '0px';

  gameArea.appendChild(fruit);

  const fallInterval = setInterval(() => {
    let top = parseInt(fruit.style.top);
    fruit.style.top = (top + speed) + 'px';

    const basketRect = basket.getBoundingClientRect();
    const fruitRect = fruit.getBoundingClientRect();

    if (
      fruitRect.bottom >= basketRect.top &&
      fruitRect.top <= basketRect.bottom &&
      fruitRect.left <= basketRect.right &&
      fruitRect.right >= basketRect.left
    ) {
      clearInterval(fallInterval); // Para o movimento
      fruit.remove(); // Remove a fruta da tela

      // Toca o som certo: minhoca ou fruta boa
      if (imageSrc === 'worm.jpg') {
        wormSound.play();
      } else {
        fruitSound.play();
      }

      // Atualiza a pontuação
      score += points;
      document.getElementById('score').textContent = `Score: ${score}`;

      // Se o score ficou 0 ou menor, acaba o jogo
      if (score <= 0) {
        endGame();
      }
    }

    // Se a fruta chegou no fundo do gameArea, remove também
    if (top + parseInt(fruit.style.height || '40') >= gameArea.clientHeight) {
      clearInterval(fallInterval);
      fruit.remove();
    }
  }, 30);
}


function startFruitIntervals() {
  bananaInterval = setInterval(() => createFruit('banana.jpg', 5, 10), 3000);
  appleInterval = setInterval(() => createFruit('apple.jpg', 3, 20), 4000);
  watermelonInterval = setInterval(() => createFruit('watermelon.jpg', 2, 30), 5000);
  pineappleInterval = setInterval(() => createFruit('pinneple.jpeg', 3, 50), 8000);
  wormInterval = setInterval(() => createFruit('worm.jpg', 3, -30), 5000);
}


function stopFruitIntervals() {
  // stop generating new fruits
  clearInterval(bananaInterval);
  clearInterval(appleInterval);
  clearInterval(watermelonInterval);
  clearInterval(pineappleInterval);
  clearInterval(wormInterval);

  // delete existing fruits
  const allRemainingFruits = document.querySelectorAll(".fruit")
  allRemainingFruits.forEach((fruitElm) => {
    fruitElm.remove()
  })
}


function endGame() {
  stopFruitIntervals();
  clearInterval(timerInterval);


  const gameOverScreen = document.getElementById('gameOverScreen');
  const finalScore = document.getElementById('finalScore');
  gameOverScreen.style.display = 'block';
  finalScore.textContent = `Your score: ${score}`;
}


const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
  document.getElementById('gameOverScreen').style.display = 'none';
  startGame();
});