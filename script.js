const basket = document.getElementById('basket');
const gameArea = document.getElementById('gameArea');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const step = 20; //não esquecer


let score = 0;
let timeLeft = 45;
let timerInterval;
let bananaInterval;
let appleInterval;
let watermelonInterval;


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

  fruit.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 40)) + 'px';
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
      clearInterval(fallInterval);
      fruit.remove();

      
      score += points;
      document.getElementById('score').textContent = `Score: ${score}`;
    }

    
    if (top + 40 >= gameArea.clientHeight) {
      clearInterval(fallInterval);
      fruit.remove();
    }
  }, 30);
}


function startFruitIntervals() {
  bananaInterval = setInterval(() => createFruit('banana.jpg', 5, 10), 3000);
  appleInterval = setInterval(() => createFruit('apple.jpg', 3, 20), 4000);
  watermelonInterval = setInterval(() => createFruit('watermelon.jpg', 2, 30), 5000);
}


function stopFruitIntervals() {
  // stop generating new fruits
  clearInterval(bananaInterval);
  clearInterval(appleInterval);
  clearInterval(watermelonInterval);

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