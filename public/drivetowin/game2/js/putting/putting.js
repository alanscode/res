var puttingGame = function(game){
    

    // Game instance
    this.game = game;

    
    // Objects
    this.paddle = null;
    this.ball = null;
    this.controls = null;
    this.launcher = null
    
    
    // Environment
    this.gameBoard = null;
    this.backgroundLayer = null;
    this.collisionLayer = null;
    this.waterTileID = 1;
    this.sandTileID = 2;
    this.holeTileID = 3;
    this.borderTileID = 4;


    // Variables (these are off of "game" and not "this" so that all actors can use them)
    this.game.gameStates = {
        LAUNCH: 0,
        INPLAY: 1,
        WIN: 2
    };
    this.game.gameState = null;
    this.game.previousGameState = null;


    




    // Ball is not colliding with anything
    this.noCollision = function() {

        if (this.ball.getCollidingWith() == '') return;

        this.ball.setCollidingWith('');

    };
    
        
    // Ball is colliding with water
    this.waterCollision = function() {

        if (this.ball.getCollidingWith() == 'water') return;
        
        this.reset();
            
    };


    // Ball is colliding with sand
    this.sandCollision = function() {

        if (this.ball.getCollidingWith() == 'sand') return;

        this.ball.setCollidingWith('sand');

    };


    // Ball is colliding with hole
    this.holeCollision = function() {

        if (this.ball.getCollidingWith() == 'hole') return;

        this.win();

    };





    this.createGameBoard = function() {
        
        // Board and Tilesets
        this.gameBoard = this.game.add.tilemap('putting_board');
        this.gameBoard.addTilesetImage('Background', 'putting_background');   // Background image
        this.gameBoard.addTilesetImage('Collider', 'putting_collider');         // Collider

        // Background Layer
        this.backgroundLayer = this.gameBoard.createLayer('BackgroundLayer');
        //this.backgroundLayer.scale.set(2 , 2);
        this.backgroundLayer.resizeWorld();
        //this.backgroundLayer.debug = true;

        // Collision Layer
        this.colliderLayer = this.gameBoard.createLayer('ColliderLayer');
        //this.colliderLayer.scale.set(2 , 2);
        this.colliderLayer.resizeWorld();
        this.colliderLayer.visible = false; // Set to invisbible so you can't see the collision placeholders
        //this.colliderLayer.debug = true;


        // Set collision with borders
        this.gameBoard.setCollision([this.borderTileID], true, this.colliderLayer);

        // Set callbacks for collisions with water, sand, and hole
        this.gameBoard.setTileIndexCallback([this.waterTileID], this.waterCollision, this, this.colliderLayer);
        this.gameBoard.setTileIndexCallback([this.sandTileID], this.sandCollision, this, this.colliderLayer);
        this.gameBoard.setTileIndexCallback([this.holeTileID], this.holeCollision, this, this.colliderLayer);


        // Init
        this.init();        


    };



    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

        this.setGameState(this.game.gameStates.LAUNCH);

    };



    // Reset the game
    this.reset = function() {

        // Reset actors
        this.ball.reset();
        this.launcher.reset();
        this.paddle.reset();
        
        // Re-init
        this.init();

        // Fade back in launcher
        this.game.add.tween(this.launcher.sprite).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

    };


    // User won!
    this.win = function() {

        // Stop the timer
        this.game.timer.pause();

        // Kill the ball
        this.ball.sprite.kill();

        // Congratulate user
        var style = { font: "bold 40px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = this.game.add.text(0, 0, "Nice Shot!!! Please spacebar to continue", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, 800, 100);

        this.game.world.resize(this.game.width , this.game.height);

        // Set game state to "win"
        this.setGameState(this.game.gameStates.WIN);



    };


    // set game state
    this.setGameState = function(state) {

        this.game.previousGameState = this.game.gameState;
        this.game.gameState = state;

    }
    
    
    

    
    
}





puttingGame.prototype = {


    create: function() {
//this.game.world.setBounds(0, 0, 1900 , 1000);


        

        this.game.pauseMenu.show();

//console.log('pg_create' , this.game.world.width , this.game.world.height);
        // Arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.setBoundsToWorld();


        

        // Game Board
        this.createGameBoard();
//console.log('pg_create2' , this.game.world.width , this.game.world.height);        

        // Controls
        this.controls = new puttingGame.controls(this.game);


        // Create paddle
        this.paddle = new puttingGame.paddle(this.game , this.controls);


        // Create ball
        this.ball = new puttingGame.ball(this.game);
        
        
        // Create launcher
        this.launcher = new puttingGame.launcher(this.game , this.controls);
        this.game.timer.resume();
    },
    
    
    update: function() {

if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
    this.win();
}

        // Update actors
        this.ball.update();
        this.paddle.update();
        this.controls.update();
        this.launcher.update();
        
        
        
        // When launcher "launches" change game state
        if ( (this.game.gameState == this.game.gameStates.LAUNCH) && (this.launcher.getLaunchedStatus()) ) {
            
            // Fade out launcher
            this.game.add.tween(this.launcher.sprite).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            
            // Get angle of launcher and launch ball
            var angle = this.launcher.getAngle();

            this.ball.launch(angle + 180);

            // Set game state to "in play"
            this.setGameState(this.game.gameStates.INPLAY);
        
        }


        // You won!
        if (this.game.gameState == this.game.gameStates.WIN) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start("CutScene2");
            }

        }




        // Out of bounds detection for ball
        if (this.ball.isOutOfBounds()) {
            this.reset();
        }



        // Collision detection for ball
        this.game.physics.arcade.collide(this.ball.sprite, this.paddle.sprite); // Ball and paddle
        this.game.physics.arcade.collide(this.ball.sprite, this.colliderLayer);
        
        // Need to check for no collision at all by examining every overlapping tile
        this.game.physics.arcade.overlap(this.ball.sprite, this.colliderLayer , null , function(a,b) { 
            
            var colliders = this.colliderLayer.getTiles(a.body.x , a.body.y , b.width , b.height).filter(
                function(value) {
                    if (value.index >= 0) return true;
                    return false;
                }
            );
            // If no collisions, update
            if (colliders.length == 0) {
                this.noCollision();
            }

        
        }.bind(this));
        
        
        
        
        
        
        
    },
    
    
    render: function() {

        // Update actors
        this.ball.render();
        this.paddle.render();
        this.controls.render();
        this.launcher.render();

    }


};