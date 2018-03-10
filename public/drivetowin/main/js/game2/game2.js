var game2 = function(game){


    // Game instance
    this.game = game;

    this.game.game2 = {};





    // Objects
    this.game.game2.Customobjects = {
        paddle: null,
        ball: null,
        controls: null,
        launcher: null
    };


    // Environment


    // Variables (these are off of "game" and not "this" so that all actors can use them)
    this.game.gameStates = {
        LAUNCH: 0,
        INPLAY: 1,
        WIN: 2,
        INSTRUCTIONS: 3
    };
    this.game.gameState = null;
    this.game.previousGameState = null;
    this.launchHappened = false;
    this.fixingVelocity = false;
    this.fixingVelocityFromPaddle = false;

    this.game.game2.sounds = {

    };

    this.holePhysicsBodyRadius = 17;






    // Create the game board for use in background behind instructions screen
    this.createGameBoard = function() {

        var holeX = 0;
        var holeY = 0;
        if (this.game.game2.board_num == 1) {
            holeX = this.game.world.width * 0.204;
            holeY = this.game.world.height * 0.4257;
            this.game.game2.paddleUpperBound = 355;
            this.game.game2.paddleLowerBound = 770;
        }
        if (this.game.game2.board_num == 2) {
            holeX = this.game.world.width * 0.176;
            holeY = this.game.world.height * 0.503;
            this.game.game2.paddleUpperBound = 250;
            this.game.game2.paddleLowerBound = 842;
        }
        if (this.game.game2.board_num == 3) {
            holeX = this.game.world.width * 0.202;
            holeY = this.game.world.height * 0.497;
            this.game.game2.paddleUpperBound = 287;
            this.game.game2.paddleLowerBound = 808;
        }
        if (this.game.game2.board_num == 4) {
            holeX = this.game.world.width * 0.223;
            holeY = this.game.world.height * 0.348;
            this.game.game2.paddleUpperBound = 327;
            this.game.game2.paddleLowerBound = 848;
        }
        if (this.game.game2.board_num == 5) {
            holeX = this.game.world.width * 0.245;
            holeY = this.game.world.height * 0.407;
            this.game.game2.paddleUpperBound = 265;
            this.game.game2.paddleLowerBound = 757;
        }
        if (this.game.game2.board_num == 6) {
            holeX = this.game.world.width * 0.208;
            holeY = this.game.world.height * 0.780;
            this.game.game2.paddleUpperBound = 197;
            this.game.game2.paddleLowerBound = 801;
        }




        // Create collision groups
        this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.paddleCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.bordersCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.holeCollisionGroup = this.game.physics.p2.createCollisionGroup();



        // Create board
        var board = this.game.add.sprite( this.game.world.centerX , this.game.world.centerY , 'putting_board');
        board.anchor.setTo(0.5 , 0.5);




        // Load borders vertex data and create body
        var borders = this.game.add.sprite(this.game.world.width * 0 , this.game.world.height * 0, 'putting_board_borders');
        borders.anchor.setTo(0.5 , 0.5);
        game.physics.p2.enable(borders);
        borders.body.clearShapes();
        borders.body.loadPolygon('putting_board_physicsData','board_background');
        borders.body.setCollisionGroup(this.bordersCollisionGroup);
        borders.body.collides([this.bordersCollisionGroup , this.ballCollisionGroup]);
        borders.body.damping = 0;
        borders.body.static = true;
        //borders.body.debug = true;




        // Hole
        var hole = this.game.add.sprite(holeX , holeY , 'putting_board_borders');
        hole.anchor.setTo(0.5 , 0.5);
        game.physics.p2.enable(hole);
        hole.body.clearShapes();
        hole.body.setCircle(this.holePhysicsBodyRadius , 0 , 0 , 0);
        hole.body.setCollisionGroup(this.holeCollisionGroup);
        hole.body.collides([this.holeCollisionGroup , this.ballCollisionGroup]);
        hole.body.static = true;
        //hole.body.debug = true;




    };



    // Place elements on game board
    this.createGameBoardElements = function() {

        // Create Controls
        this.game.game2.Customobjects.controls = new game2.controls(this.game);


        // Create paddle
        this.game.game2.Customobjects.paddle = new game2.paddle(this.game);
        this.game.game2.Customobjects.paddle.sprite.body.setCollisionGroup(this.paddleCollisionGroup);


        // Create ball
        this.game.game2.Customobjects.ball = new game2.ball(this.game);
        this.game.game2.Customobjects.ball.sprite.body.setCollisionGroup(this.ballCollisionGroup);


        // Create launcher
        this.game.game2.Customobjects.launcher = new game2.launcher(this.game);






        // Set collisions
        this.game.game2.Customobjects.ball.sprite.body.collides([this.paddleCollisionGroup , this.ballCollisionGroup], function() {

            // Ball collided with paddle

            var speed = this.game.game2.Customobjects.ball.getSpeed();
            var angle = this.game.game2.Customobjects.ball.getCurrentAngle();
            if ( (speed > 0) &&  (speed < 750) ) {

                if (!this.fixingVelocity) {

                    this.fixingVelocity = true;
                    this.game.game2.Customobjects.ball.maintainVelocity();
                    this.fixingVelocity = false;
                }

            }

            if ( (angle > 88) && (angle < 92) ) {

                if (!this.fixingVelocity) {

                    this.fixingVelocity = true;
                    this.game.game2.Customobjects.ball.createVelocityFromAngle(85);
                    this.fixingVelocity = false;
                }

            }


        }, this);
        this.game.game2.Customobjects.paddle.sprite.body.collides([this.ballCollisionGroup , this.paddleCollisionGroup]);




        // Set out of bounds and collisions for ball
        this.game.game2.Customobjects.ball.sprite.events.onOutOfBounds.add(function() {
            // Ball went out of bounds; wait 3 seconds and then reset
            setTimeout(function() {
                this.reset();
            }.bind(this) , 1500);

        }.bind(this), this);


        this.game.game2.Customobjects.ball.sprite.body.collides(this.bordersCollisionGroup, function() {
            // Ball collided with border
            // reset speed if necessary since collision loses speed sometimes

            this.game.game2.sounds.bounce.play();


            var speed = this.game.game2.Customobjects.ball.getSpeed();
            if ( (speed > 0) &&  (speed < 750) ) {

                if (!this.fixingVelocity) {

                    this.fixingVelocity = true;
                    this.game.game2.Customobjects.ball.maintainVelocity();
                    this.fixingVelocity = false;
                }

            }


        }, this);




        this.game.game2.Customobjects.ball.sprite.body.collides(this.holeCollisionGroup, function() {
            // Ball collided with hole -> user won
            this.win();
        }, this);

        this.game.startGameTimer();

        setTimeout(function() {
            this.game.createPauseButton('2');
            
        }.bind(this), 1000);        

        setTimeout(function() {
            this.setGameState(this.game.gameStates.LAUNCH);
        }.bind(this) , 1000);


    };





    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

    };



    // Reset the game
    this.reset = function() {

        console.log('reset');


        // Reset actors
        this.game.game2.Customobjects.ball.reset();
        this.game.game2.Customobjects.launcher.reset();
        this.game.game2.Customobjects.paddle.reset();

        // Re-init
        this.setGameState(this.game.gameStates.LAUNCH);

        // Fade back in launcher
        this.game.add.tween(this.game.game2.Customobjects.launcher.sprite).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.launchHappened = false;

    };





    // User won!
    this.win = function() {

        this.game.game2.sounds.hole.play();

        // Kill the ball
        this.game.game2.Customobjects.ball.sprite.kill();

        this.game.world.resize(this.game.width , this.game.height);

        // Set game state to "win"
        this.setGameState(this.game.gameStates.WIN);


        this.game.pauseGameTimer();

        game.time.events.add(Phaser.Timer.SECOND * 3, function () {

            game.state.start("CutScene", true, false, "Vid3", "Game3");

        }, this);




    };






    // set game state
    this.setGameState = function(state) {

        this.game.previousGameState = this.game.gameState;
        this.game.gameState = state;

    };




    this.collideWithPaddle = function(ball, paddle) {

        if (this.fixingVelocityFromPaddle) return;

        if (this.game.game2.Customobjects.ball.sprite.y < this.game.game2.Customobjects.paddle.sprite.y) {
            returnAngle = 135;
        } else {
            returnAngle = 180;
        }

        this.fixingVelocityFromPaddle = true;

        this.game.game2.Customobjects.ball.createVelocityFromAngle(returnAngle);

        setTimeout(function() {
            this.fixingVelocityFromPaddle = false;
        }.bind(this) , 1000);

    };


};





game2.prototype = {


    create: function() {

        //this.game.stage.backgroundColor = "#f00";


        // Create audio
        this.game.game2.sounds.swing = this.game.add.audio('putting_sound_swing');
        this.game.game2.sounds.hole = this.game.add.audio('putting_sound_hole');
        this.game.game2.sounds.bounce = this.game.add.audio('putting_sound_bounce');
        this.game.sound.setDecodedCallback([ this.game.game2.sounds.swing , this.game.game2.sounds.hole , this.game.game2.sounds.bounce ], function() {}, this);





        // P2 physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.defaultRestitution = 1;
        this.game.physics.p2.restitution = 1;
        this.game.physics.p2.friction = 0;
        this.game.physics.p2.stiffness = 0;
        this.game.physics.p2.relaxation = 0;
        this.game.physics.p2.frictionStiffness = 0;
        this.game.physics.p2.frictionRelaxation = 0;
        this.game.physics.p2.surfaceVelociy = 0;
        this.game.physics.p2.setImpactEvents(true);



        this.game.world.setBounds(0, 0, 1920, 1080);
        this.createGameBoard();
        var image = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'putting_instructions');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        image.input.useHandCursor = true;
        image.events.onInputDown.add(function (s, pointer) {

            if (game.shopHondaLinkClicked(pointer.x, pointer.y)) return false;

            // Create Game Board elements
            this.createGameBoardElements();


            // Tracking
            //dataLayer.push({'event': 'btn_stage2_letsgo'});


            image.destroy();
        }.bind(this), this);




    },



    preload: function() {


        // Get random board
        var numboards = 6;
        this.game.game2.board_num = Math.floor(Math.random() * ((numboards+1) - 1) + 1);


        /* Instructions */
        this.game.load.image('putting_instructions', 'assets/game2/instructions.png');

        /* Environment */
        this.game.load.image('putting_board_borders', 'assets/game2/trans.png');
        this.game.load.image('putting_board', 'assets/game2/board' + this.game.game2.board_num + '_background.png');
        this.game.load.physics('putting_board_physicsData', 'assets/game2/board' + this.game.game2.board_num + '_borders.json');

        this.game.load.physics('putting_hole_physicsData', 'assets/game2/hole.json');


        this.game.load.spritesheet('putting_paddle', 'assets/game2/golfer.png' , 115 , 145 , 3);
        this.game.load.physics('putting_paddle_physicsData', 'assets/game2/paddle.json');
        this.game.load.image('putting_ball', 'assets/game2/ball.png');
        this.game.load.image('putting_launcher', 'assets/game2/arrow.png');


        /* Sounds */
        this.game.load.audio('putting_sound_swing', 'assets/game2/swing.mp3');
        this.game.load.audio('putting_sound_hole', 'assets/game2/hole.mp3');
        this.game.load.audio('putting_sound_bounce', 'assets/game2/bounce.mp3');

    },





    update: function() {


        if ( (this.game.gameState == this.game.gameStates.LAUNCH) || (this.game.gameState == this.game.gameStates.INPLAY) ) {

            //this.game.game2.Customobjects.ball.logSpeed();



            // Update actors
            this.game.game2.Customobjects.ball.update();
            this.game.game2.Customobjects.paddle.update();
            this.game.game2.Customobjects.controls.update();
            this.game.game2.Customobjects.launcher.update();

        }



        // When launcher "launches" change game state
        if ( (this.game.gameState == this.game.gameStates.LAUNCH) && (this.game.game2.Customobjects.launcher.getLaunchedStatus()) && (!this.launchHappened) ) {

            this.launchHappened = true;

            this.game.game2.Customobjects.paddle.sprite.animations.play('swing' , 50 , false);

            // Fade out launcher
            this.game.add.tween(this.game.game2.Customobjects.launcher.sprite).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

            // Get angle of launcher and launch ball
            var angle = this.game.game2.Customobjects.launcher.getAngle();

            this.game.game2.Customobjects.ball.launch(angle);

            // Set game state to "in play"
            this.setGameState(this.game.gameStates.INPLAY);

        }


        // You won!
        if (this.game.gameState == this.game.gameStates.WIN) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start("CutScene2");
            }

        }







    },


    render: function() {


        if ( (this.game.gameState == this.game.gameStates.LAUNCH) || (this.game.gameState == this.game.gameStates.INPLAY) ) {

            // Update actors
            this.game.game2.Customobjects.ball.render();
            this.game.game2.Customobjects.paddle.render();
            this.game.game2.Customobjects.controls.render();
            this.game.game2.Customobjects.launcher.render();

        }

    },



    shutdown: function() {
        this.reset();
        this.setGameState(this.game.gameStates.INSTRUCTIONS);
    }



};
