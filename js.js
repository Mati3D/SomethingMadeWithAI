const gameDiv = document.getElementById('game');
const playerDiv = document.getElementById('player');
const instructionsDiv = document.getElementById('instructions');

let bricks = [];

gameDiv.addEventListener('click', addBrick);

function addBrick(event) {
  const brickDiv = document.createElement('div');
  brickDiv.classList.add('brick');
  brickDiv.style.left = (event.clientX - gameDiv.offsetLeft - 20) + 'px';
  brickDiv.style.top = (event.clientY - gameDiv.offsetTop - 10) + 'px';
  gameDiv.appendChild(brickDiv);
  bricks.push(brickDiv);
  brickDiv.addEventListener('mousedown', startDrag);
}

function startDrag(event) {
  const brickDiv = event.target;
  const offsetX = event.clientX - brickDiv.offsetLeft;
  const offsetY = event.clientY - brickDiv.offsetTop;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
  
  function drag(event) {
    brickDiv.style.left = (event.clientX - gameDiv.offsetLeft - offsetX) + 'px';
    brickDiv.style.top = (event.clientY - gameDiv.offsetTop - offsetY) + 'px';
    checkCollisions();
  }
  
  function stopDrag(event) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }
}

document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
  let x = playerDiv.offsetLeft;
  let y = playerDiv.offsetTop;
  let dx = 0;
  let dy = 0;
  switch (event.key) {
    case 'ArrowLeft':
      dx = -10;
      break;
    case 'ArrowRight':
      dx = 10;
      break;
    case 'ArrowUp':
      dy = -10;
      break;
    case 'ArrowDown':
      dy = 10;
      break;
  }
  const newX = x + dx;
  const newY = y + dy;
  if (newX < 0 || newX > gameDiv.offsetWidth - playerDiv.offsetWidth ||
      newY < 0 || newY > gameDiv.offsetHeight - playerDiv.offsetHeight) {
    return;
  }
  let canMove = true;
  const playerRect = playerDiv.getBoundingClientRect();
  for (let i = 0; i < bricks.length; i++) {
    const brickRect = bricks[i].getBoundingClientRect();
    if (playerRect.right + dx >= brickRect.left && playerRect.left + dx <= brickRect.right &&
        playerRect.bottom + dy >= brickRect.top && playerRect.top + dy <= brickRect.bottom) {
      console.log('Collision detected!');
      canMove = false;
      break;
    }
  }
  if (canMove) {
    x += dx;
    y += dy;
    playerDiv.style.left = x + 'px';
    playerDiv.style.top = y + 'px';
  }
}

function checkCollisions() {
  const playerRect = playerDiv.getBoundingClientRect();
  for (let i = 0; i < bricks.length; i++) {
    const brickRect = bricks[i].getBoundingClientRect();
    if (playerRect.right >= brickRect.left && playerRect.left <= brickRect.right &&
        playerRect.bottom >= brickRect.top && playerRect.top <= brickRect.bottom) {
      console.log('Collision detected!');
      playerDiv.style.left = playerRect.left + 'px';
      playerDiv.style.top = playerRect.top + 'px';
      break;
    }
  }
}
