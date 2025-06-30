const basket = document.getElementById('basket');
const gameArea = document.getElementById('gameArea');
const step = 20; // para mover

document.addEventListener('keydown', (event) => {
  const left = basket.offsetLeft;

  if (event.key === 'ArrowLeft' && left > 0) {
    basket.style.left = `${left - step}px`;
  }
  if (event.key === 'ArrowRight' && left + basket.offsetWidth < gameArea.clientWidth) {
    basket.style.left = `${left + step}px`;
  }
});