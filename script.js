const basket = document.getElementById('basket');
const gameArea = document.getElementById('gameArea');
const step = 20; // não esquecer


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


function createFruit(imageSrc, speed) {
  const fruit = document.createElement('img');
  fruit.src = imageSrc;
  fruit.classList.add('fruit');
  
  fruit.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 40)) + 'px';
  fruit.style.top = '0px';
  
  gameArea.appendChild(fruit);

  const fallInterval = setInterval(() => {
    let top = parseInt(fruit.style.top);
    fruit.style.top = (top + speed) + 'px';

    if (top + 40 >= gameArea.clientHeight) {
      clearInterval(fallInterval);
      fruit.remove();
    }
  }, 30);
}
// colocar as fotos

setInterval(() => createFruit('banana.jpg', 5), 3000);       
setInterval(() => createFruit('apple.jpg', 3), 4000);        
setInterval(() => createFruit('watermelon.jpg', 2), 5000);  