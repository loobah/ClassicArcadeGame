// Enemies our player must avoid
// With X, Y and speed variables!
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    // Sets enemies running into and out of bounds smoothly
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.boundary) {
      this.x += this.speed * dt;
    }
    else {
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Hero class, with X and Y coords and starting point defined
class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY
    this.victory = false;
  }
  // Update position
  update() {
    // Check collision with enemies based on X and Y coords
    for(let enemy of allEnemies) {
      if (this.y === enemy.y &&
         (enemy.x + enemy.step/1.4 > this.x &&
          enemy.x < this.x + this.step/2)) {
        this.reset();
      }
    }
    // Check if player wins!
    // Player's X and Y reach final tile
    if(this.y === -28) {
      this.victory = true;
    }
  }
  // If colides, player goes back to initial position
  reset() {
    // Sets coords to starting point
    this.y = this.startY;
    this.x = this.startX;
  }
  // Renders player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Player boundaries on the canvas
  handleInput(input) {
    switch (input) {
      case 'left':
        if (this.x > 0) {
            this.x -= this.step;
        }
        break;
      case 'up':
        if (this.y > 0) {
            this.y -= this.jump;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
            this.x += this.step;
        }
        break;
      case 'down':
        if (this.y < this.jump * 4) {
            this.y += this.jump;
        }
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Enemies have diferent Y positions and speeds
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 350);
const bug3 = new Enemy(-101, 166, 275);
const allEnemies = [];
// Each enemy is pushed into array 'allEnemies'
allEnemies.push(bug1, bug2, bug3);

// Place the player object in a variable called player
const player = new Hero();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
