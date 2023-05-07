
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let direction = 0;
  let openMouth=0;
  let count=0;
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0];
  newimg.width = 100;

  // TODO: set position here
  newimg.style.left=position.x+"px"
  newimg.style.top=position.y+"px"
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction,
    openMouth,
    count,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    item.count++;
    checkCollisions(item);
    if(item.count%10==0 && item.openMouth===0){
      item.openMouth=1;
    }else if(item.count%10==0) item.openMouth=0;
    console.log("item direction: " + item.direction+" item.openMouth: " + item.openMouth)
     item.newimg.src = pacArray[item.direction][item.openMouth];
     

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x+"px";
    item.newimg.style.top = item.position.y+"px";

  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if((item.position.x+item.velocity.x+item.newimg.width>window.innerWidth) ||item.position.x+item.velocity.x<0){
    item.velocity.x=-item.velocity.x;
    if(item.direction===0){
      item.direction=1;
    }else item.direction=0;
    
  }
  if((item.position.y+item.velocity.y+item.newimg.height>window.innerHeight) ||item.position.y+item.velocity.y<0){
    item.velocity.y=-item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
