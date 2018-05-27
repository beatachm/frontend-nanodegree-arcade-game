// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.row = -1;

    this.randomize = function(){
        var noneptyRows = allEnemies.reduce(function(map, enemy){
            map[enemy.row] = true;
            return map;
        }, {});
        var emptyRow = [1,2,3].find(function(r){return !noneptyRows[r];});
        if(typeof(emptyRow) !== 'undefined'){
            // if there is an empty row, put it there
            this.row = emptyRow;
        }
        else{
            // otherwise select new row randomly
            this.row = Math.round(Math.random() * 2) + 1;
        }
        this.speed = Math.random() * 250 + 150;
        this.x = -101;
        this.y = 83*this.row - 20;
    };

    this.randomize();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.speed);
    if(this.x > 5 * 101){
        this.randomize();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(td) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.col = 1;
    this.row = 5;
}

Player.prototype.update = function(){
    this.x = this.col * 101;
    this.y = this.row * 83;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10);
}

Player.prototype.handleInput = function(key){
    switch(key){
        case 'left': this.col = Math.max(0, this.col - 1); break;
        case 'right': this.col =Math.min(4, this.col + 1); break;
        case 'up': this.row = Math.max(0, this.row - 1); break;
        case 'down': this.row = Math.min(5, this.row + 1); break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

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
