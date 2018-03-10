var gameWidth = 1400;
var gameHeight = 800;

/*var physicsConfig = {
    arcade: true,
    ninja: false,
    p2: false
};*/

var game = new Phaser.Game(gameWidth , gameHeight , Phaser.CANVAS, '' , { preload: preload, create: create, update: update, render: render} , '' , '');


function preload() {
    game.load.image('paddle', 'http://ritaranchpethospital.com/blog/wp-content/uploads/2013/08/cat-claw.jpg');
    game.load.image('ball', 'https://wakeandwhimsy.files.wordpress.com/2014/01/yarn004_crop.jpg');
    game.load.image('background', 'http://www.southernhillsanimalhospital.com/sites/site-1450/images/kittens.jpg');
    
}

var paddle , ball , text;
var ballReleased = false;
var ballSpeed = 900;
function create() {
        


    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //game.physics.arcade.gravity.y = 500;
    
    var bg = game.add.tileSprite( 0 , 0 , gameWidth , gameHeight , 'background');
    
    // Create paddle
    paddle = game.add.sprite(100 , 100 , 'paddle');
    //game.physics.enable(paddle , Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(paddle);
    paddle.scale.x = 0.1;
    paddle.scale.y = 0.1;
    paddle.anchor.setTo(0.5 , 0.5);
    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.setTo(1 , 1);
    paddle.body.immovable = true;


    // Create ball
    ball = game.add.sprite( gameWidth / 2 , gameHeight / 2 , 'ball');
    //game.physics.enable(ball , Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(ball);
    ball.scale.x = 0.01;
    ball.scale.y = 0.01;
    ball.anchor.setTo(0.5 , 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.5 , 0.5);

    // Win text
    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 200, align: "center" };
    text = game.add.text(-1000, -1000, "You Won!!!!", style);
    text.anchor.set(0.5);

    
    
    
    game.input.onDown.add(function() {
        
        if (ballReleased) {
            ball.x = game.world.centerX;
            ball.y = game.world.centerY;
            ball.body.velocity.x = 0;
            ball.body.velocity.y = 0;
            ballReleased = false;
        } else {
            ball.body.velocity.x = -ballSpeed;
            ball.body.velocity.y = -ballSpeed;
            ballReleased = true;
        }
        
        
        
    }, this);

    
}


function update() {

    // Paddle control
    paddle.y = game.input.y;

    
    // Collision detection
    game.physics.arcade.collide(ball, paddle, null, null, this);

    
    // Check goal
    if ( (ball.x >= ( gameWidth - ball.width ) ) && (ball.y < 100) ) {
        text.x = 100;
        text.y = 100;
        ball.body.velocity.x = 0;
        ball.body.velocity.y = 0;
    }
    
}


function render() {
    
}