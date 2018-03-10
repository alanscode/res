var game1 = function (game) {
    var ball;
    var ground;
    var golfer;
    var carts;
    var mowers;
    var gophers;
    var sands;
    var ponds;
    var ridgeline;
    var arrow;
    var yardsTxt;
    var resetTween;
    var powermeter;
    var button;
    var ballStartingPoint = { x: 200, y: 800 };
    var worldwidth = 36000;
    var launched = false;
    var started = false;
    var yardsGained = 0;
    var collidedWithTrap = false;
    var rectIgnore;
    var fx = {};

    var debugging = false;

    var panRightKeyD;
    var panLeftKeyA;

    this.preload = function () {

        game.load.spritesheet('golfer', 'assets/game1/golfer.png', 380, 340, 11, 0, 20);

        game.load.spritesheet('grasshit', 'assets/game1/grasshit.png', 90, 45, 5);

        game.load.spritesheet('sandhit', 'assets/game1/sandhit.png', 80, 45, 7);

        game.load.spritesheet('waterhit', 'assets/game1/waterhit.png', 140, 65, 5);

        game.load.spritesheet('mower', 'assets/game1/mower.png', 195, 140, 3);

        game.load.spritesheet('gopher', 'assets/game1/gopher.png', 120, 120);

        game.load.spritesheet('cart', 'assets/game1/cart.png', 335, 310, 4);

        game.load.spritesheet('duck', 'assets/game1/duck.png', 70, 35, 3);

        game.load.image('backgroundstart', 'assets/game1/background_start.png');

        game.load.image('background', 'assets/game1/background.png');

        game.load.image('ball', 'assets/game1/ball.png');

        game.load.image('tee', 'assets/game1/tee.png');

        game.load.image('flag', 'assets/game1/flag.png');

        game.load.image('cartsmall', 'assets/game1/cartsmall.png');

        game.load.image('arrow', 'assets/game1/arrow.png');

        game.load.image('gobutton', 'assets/game1/gobutton.png');

        game.load.image('startmenu', 'assets/game1/startmenu.png');

        game.load.image('pond', 'assets/game1/pond.png');

        game.load.image('sand', 'assets/game1/sand.png');

        game.load.image('cloud1', 'assets/game1/cloud1.png');

        game.load.image('cloud2', 'assets/game1/cloud2.png');

        game.load.image('cloud3', 'assets/game1/cloud3.png');

        game.load.image('ridgeline', 'assets/game1/cloud4.png');

        //sounds
        game.load.audio('swing', 'assets/game1/sounds/swing.mp3');

        game.load.audio('cartbounce', 'assets/game1/sounds/cartbounce.mp3');

        game.load.audio('gopher', 'assets/game1/sounds/gopher.mp3');

        game.load.audio('mower', 'assets/game1/sounds/mower.mp3');

        game.load.audio('claps', 'assets/game1/sounds/claps.mp3');
    }

    this.create = function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.world.setBounds(0, 0, worldwidth, 1080);

        game.stage.disableVisibilityChange = true;

        game.clearBeforeRender = true;

        this.createGround();

        this.createClouds();

        this.createGolfer();

        this.createArrow();

        this.createCart();

        this.createMower();

        this.createYardScore();

        this.createResetTween();

        this.createSandPit();

        this.createPond();

        this.createGopher();

        this.createBall();

        this.createStartMenu();

        this.loadSounds();

        if (debugging) {

            panRightKeyD = game.input.keyboard.addKey(Phaser.KeyCode.D);

            panLeftKeyA = game.input.keyboard.addKey(Phaser.KeyCode.A);

        }

        rectIgnore = new Phaser.Rectangle(1710, 820, 120, 120);
    }

    this.update = function () {

        this.checkGameCollisions();

        var startingOffset = 2;

        var yrdsToComplete = 350;

        var yardsThisTry = Math.ceil(ball.x / 100) - startingOffset;

        var resetting = resetTween.isRunning;

        if (!resetting && yardsGained < yrdsToComplete) {

            yardsTxt.setText(yardsGained + yardsThisTry + " / " + yrdsToComplete + " yds");

        }
        else if (yardsGained >= yrdsToComplete) {

            yardsTxt.setText("COMPLETED!");

        }

        if (!resetting && launched && ball.body.deltaX() == 0 && ball.body.deltaY() == 0) {

            yardsGained += yardsThisTry;

            if (yardsGained >= yrdsToComplete) {

                this.goalCompleted();

            }
            else {

                resetTween.start();
            }

        }
        else if (started) {

            this.selectAngle();

            powermeter.runMeter();
        }

        if (debugging) {

            if (panRightKeyD.isDown)
                game.camera.x += 50;


            if (panLeftKeyA.isDown)
                game.camera.x -= 50;

        }
    }

    this.render = function () {
        //game.debug.spriteInfo(ball, 600, 32);


        //if (ball.y < 0) {
        //    game.debug.text("above screen", 32, 32);
        //}


        //carts.forEach(function (c){
        //    game.debug.body(c);
        //});

        //mowers.forEach(function (c){
        //    game.debug.body(c);
        //});


        if (debugging)
        {
            this.game.debug.inputInfo(200, 200);
        }

        //game.debug.text(ball.body.drag, 32, 32);

        //game.debug.geom(shopHondaLink, 'rgba(200,0,0,0.5)');

    }

    this.checkGameCollisions = function () {

        game.physics.arcade.collide(ball, ground, ground.collideWithGroundHandler, null, this);

        game.physics.arcade.overlap(ball, sands, sands.overlapWithBallHandler, null, this);

        game.physics.arcade.overlap(ball, ponds, ponds.overlapWithBallHandler, null, this);

        game.physics.arcade.collide(ball, carts, carts.collideWithBallHandler, null, this);

        game.physics.arcade.collide(ball, mowers, mowers.collideWithBallHandler, null, this);

        game.physics.arcade.overlap(ball, gophers, gophers.collideWithBallHandler, null, this);

        game.physics.arcade.overlap(ball, ridgeline, ridgeline.collidedWithRidgelineHandler, null, this);
        
    }

    this.goalCompleted = function () {

        button.inputEnabled = false;

        launched = false;

        game.pauseGameTimer();

        var flag = game.add.sprite(ball.x, 0, 'flag');

        flag.anchor.set(.5);

        game.add.tween(flag).to({ y: 650 }, 500, Phaser.Easing.Linear.None, true);

        fx.claps.play();

        game.time.events.add(Phaser.Timer.SECOND * 3, function () {

            game.state.start("CutScene", true, false, "Vid2", "Game2");

        }, this);

    }

    this.createMower = function () {

        mowers = game.add.physicsGroup();

        mowers.enableBody = true;

        mowers.physicsBodyType = Phaser.Physics.ARCADE;

        var xposition = game.rnd.integerInRange(4800, 5300);

        var yposition = 745;

        mowers.add(game.add.sprite(xposition, yposition, 'mower'));

        xposition = game.rnd.integerInRange(11000, 11500);

        mowers.add(game.add.sprite(xposition, yposition, 'mower'));

        xposition = game.rnd.integerInRange(16500, 16900);

        mowers.add(game.add.sprite(xposition, yposition, 'mower'));

        xposition = game.rnd.integerInRange(23600, 24200);

        mowers.add(game.add.sprite(xposition, yposition, 'mower'));

        mowers.forEach(function (m) {

            m.anchor.set(.5);

            m.scale.setTo(1.5);

            m.body.collideWorldBound = true;

            m.body.immovable = true;

            m.body.checkCollision.left = true;

            m.body.checkCollision.right = false;

            m.body.checkCollision.up = true;

            m.body.setSize(195, 75, 15, 50);

            m.animations.add("mow").play(3, true);

        });

        game.add.tween(mowers).to({ x: 500 }, 10000, "Linear", true, 0, -1, true);

        var colliding = false;

        mowers.collideWithBallHandler = function (b, m) {

            if (colliding == false)
            {
                colliding = true;

                fx.mower.play();

                b.alpha = 0;

                b.body.enable = false;

                b.y += -50;

                game.time.events.add(1000, function () {

                    b.body.enable = true;

                    b.alpha = 1;

                    b.resetBallPhysics();

                    b.body.velocity.setTo(2800, -900);

                    launched = true;

                    colliding = false;

                }, this);
            }
        }
    }

    this.createGopher = function () {

        gophers = game.add.physicsGroup();

        gophers.enableBody = true;

        gophers.physicsBodyType = Phaser.Physics.ARCADE;

        //gopher1
        var position = { x: game.rnd.integerInRange(3500, 4500), y: game.rnd.integerInRange(800, 750) };

        gophers.add(game.add.sprite(position.x, position.y, 'gopher'));

        //gopher3
        position = { x: game.rnd.integerInRange(10200, 10500), y: game.rnd.integerInRange(800, 750) };

        gophers.add(game.add.sprite(position.x, position.y, 'gopher'));

        //gopher3
        position = { x: game.rnd.integerInRange(15900, 16200), y: game.rnd.integerInRange(800, 750) };

        gophers.add(game.add.sprite(position.x, position.y, 'gopher'));

        gophers.forEach(function (g) {

            g.anchor.set(.5);

            g.body.setSize(50, 100);

            g.body.immovable = true;

            g.animations.frame = 12;

        });

        var animRunning = false;

        gophers.collideWithBallHandler = function (b, g) {

            if (!animRunning) {

                animRunning = true;

                b.alpha = 0;

                b.body.enable = false;

                var anim = g.animations.add("jump");

                anim.play(15, false);

                fx.gopher.play();

                anim.onComplete.add(function () {

                    g.frame = 12;

                    animRunning = false;

                }, this);

                var event = game.time.events.add(600, function () {

                    b.body.enable = true;

                    b.y -= 50;

                    b.alpha = 1;

                    b.resetBallPhysics();

                    b.body.velocity.setTo(3600, -900);

                    launched = true;

                }, this);
            }
        }
    }

    this.createCart = function () {

        carts = game.add.physicsGroup();

        carts.enableBody = true;

        carts.physicsBodyType = Phaser.Physics.ARCADE;

        var yposition = 750;

        //cart1
        carts.add(game.add.sprite(game.rnd.integerInRange(6000, 7500), yposition, 'cart'));

        //cart2
        carts.add(game.add.sprite(game.rnd.integerInRange(7700, 8200), yposition, 'cart'));

        //cart3
        carts.add(game.add.sprite(game.rnd.integerInRange(12600, 13200), yposition, 'cart'));

        //cart4
        carts.add(game.add.sprite(game.rnd.integerInRange(19200, 19800), yposition, 'cart'));

        //cart5
        carts.add(game.add.sprite(game.rnd.integerInRange(25000, 26000), yposition, 'cart'));

        //cart5
        carts.add(game.add.sprite(game.rnd.integerInRange(32500, 33500), yposition, 'cart'));

        //set props
        carts.forEach(function (c) {

            c.anchor.set(.5);

            c.body.setSize(270, 100, -20, -140);

            c.body.collideWorldBound = true;

            c.body.immovable = true;

            c.body.checkCollision.left = true;

            c.body.checkCollision.right = false;

            c.body.checkCollision.down = false;

            c.body.checkCollision.up = true;

        });

        carts.collideWithBallHandler = function (b, c) {

            fx.cartbounce.play();

            c.animations.add('carting').play(4, false);

            b.resetBallPhysics();

            b.body.velocity.setTo(2500, -900);

        }

    }

    this.createSandPit = function () {

        sands = game.add.physicsGroup();

        sands.enableBody = true;

        sands.physicsBodyType = Phaser.Physics.ARCADE;

        var yposition = 840;

        var xposition = game.rnd.integerInRange(9200, 9700);

        sands.add(game.add.sprite(xposition, yposition, 'sand'));

        xposition = game.rnd.integerInRange(17800, 18400);

        sands.add(game.add.sprite(xposition, yposition, 'sand'));

        xposition = game.rnd.integerInRange(21500, 22200);

        sands.add(game.add.sprite(xposition, yposition, 'sand'));

        xposition = game.rnd.integerInRange(31000, 32000);

        sands.add(game.add.sprite(xposition, yposition, 'sand'));

        sands.forEach(function (s) {

            s.anchor.set(.5);

            s.body.immovable = false;

            s.body.setSize(900, 10, 0, -30);

        });

        var maxAnimations = 2;

        var animationCount = 0;

        sands.overlapWithBallHandler = function (b, s) {

            collidedWithTrap = true;

            b.body.drag.x = 1000;

            if (launched && animationCount < maxAnimations) {

                animationCount++;

                var sandhit = game.add.sprite(b.x, b.y, 'sandhit', 0);

                sandhit.anchor.setTo(.5, .5);

                var anim = sandhit.animations.add('sandhit');

                anim.play(6, false);

                anim.onComplete.add(function (splash) {

                    animationCount--;

                    splash.destroy();

                }, this);

            }
        }
    }

    this.createPond = function () {

        ponds = game.add.physicsGroup();

        ponds.enableBody = true;

        ponds.physicsBodyType = Phaser.Physics.ARCADE;

        //pond1
        var xposition = game.rnd.integerInRange(2300, 3000);

        var yposition = 820;

        var pond = game.add.sprite(xposition, yposition, 'pond');

        ponds.add(pond);

        //pond2
        xposition = game.rnd.integerInRange(14000, 15500);

        pond = game.add.sprite(xposition, yposition, 'pond');

        ponds.add(pond);

        //pond3
        xposition = game.rnd.integerInRange(29300, 29500);

        pond = game.add.sprite(xposition, yposition, 'pond');

        ponds.add(pond);

        //pond4
        xposition = 34500;

        pond = game.add.sprite(xposition, yposition, 'pond');

        ponds.add(pond);

        ponds.forEach(function (p) {

            p.anchor.set(.5);

            p.body.immovable = false;

            p.body.setSize(800, 10, 0, -10);

            p.duck = game.add.sprite(p.x + game.rnd.integerInRange(40, 120), 800, 'duck');

        });

        var animating = false;

        ponds.overlapWithBallHandler = function (b, p) {

            collidedWithTrap = true;

            if (launched && !animating) {

                animating = true;

                b.alpha = 0;

                b.body.velocity.setTo(0);

                waterhit = game.add.sprite(b.x, b.y, 'waterhit', 0);

                waterhit.anchor.setTo(.5, .5);

                var anim = waterhit.animations.add('waterhit');

                anim.play(5, false);

                anim.onComplete.add(function (splash) {

                    animating = false;

                    splash.destroy();

                }, this);

                p.duck.animations.add('quake').play(3, true);

            }
        }
    }

    this.createGround = function () {

        var startingWidth = 2138;

        ground = game.add.physicsGroup();

        ground.enableBody = true;

        ground.physicsBodyType = Phaser.Physics.ARCADE;

        //starting bg
        ground.add(game.add.sprite(0, 0, 'backgroundstart'));

        //repeating bg
        ground.add(game.add.tileSprite(startingWidth, 0, worldwidth - startingWidth, 1080, 'background'));

        ground.forEach(function (item) {

            item.body.immovable = true;

            item.body.setSize(item.body.width, 50, 0, 820);

        });

        var maxAnimations = 3, animationCount = 0;

        ground.collideWithGroundHandler = function (b, g) {

            if (b.body.deltaY() > 1 && launched && !collidedWithTrap && animationCount <= maxAnimations) {

                b.body.drag.x = 550;

                animationCount++;

                var grasshit = game.add.sprite(b.x, b.y, 'grasshit', 0);

                var anim = grasshit.animations.add('grasshit');

                anim.play(5, false);

                anim.onComplete.add(function (splash) {

                    animationCount--;

                    splash.destroy();

                }, this);

            }
        }
    }

    this.createBall = function () {

        game.add.sprite(ballStartingPoint.x - 10, ballStartingPoint.y + 20, 'tee');

        ball = game.add.sprite(ballStartingPoint.x, ballStartingPoint.y, 'ball');

        ball.anchor.set(.5);

        game.physics.arcade.enable(ball);

        if (!debugging) {
            game.camera.follow(ball);
        }

        ball.body.mass = 1;

        ball.allowRotation = true;

        ball.resetBallPhysics = function () {

            ball.body.drag.setTo(250, 0);

            ball.body.bounce.set(.4);

            ball.body.gravity.setTo(0, 700);

            ball.alpha = 1;
        }

        ball.resetBallPhysics();
    }

    this.createGolfer = function () {

        golfer = game.add.sprite(200, 650, 'golfer', 0);

        golfer.anchor.set(.5);

        cartmall = game.add.sprite(400, 550, 'cartsmall', 0);

        cartmall.anchor.set(.5);
    }

    this.createArrow = function () {

        arrow = game.add.sprite(ballStartingPoint.x + 10, ballStartingPoint.y, 'arrow');

        arrow.anchor.set(0, 0.5);

        game.physics.enable(arrow, Phaser.Physics.ARCADE);

        arrow.scale.set(.5);

        arrow.alpha = 0;
    }

    this.createYardScore = function () {

        yardsTxt = game.add.text(32, 100, '', { font: "32px Joystix W00 Monospace", fill: "black", align: "center" });

        yardsTxt.fixedToCamera = true;
    }

    this.createResetTween = function () {

        resetTween = game.add.tween(game.camera.x).to({ x: ballStartingPoint.x }, 500, Phaser.Easing.Linear.None);

        resetTween.onComplete.add(this.reset, this);
    }

    this.createStartMenu = function () {

        var startbutton = game.add.sprite(0, 0, 'startmenu');

        startbutton.inputEnabled = true;

        startbutton.input.useHandCursor = true;

        startbutton.events.onInputDown.add(function (s, pointer) {

            if (game.shopHondaLinkClicked(pointer.x, pointer.y)) return false;

            this.createPowerButton();

            game.startGameTimer();

            setTimeout(function () {

                game.createPauseButton('1');

            }, 1000);

            // Tracking
            //dataLayer.push({'event': 'btn_stage1_letsgo'});


            

            arrow.rotation = -.2;

            startbutton.alpha = 0;

            arrow.alpha = 1;

            started = true;

            startbutton.destroy();

            var useridcookie = getCookie('userid');

            if (useridcookie) {
                //already registered, check if they have bonus entry
                $.ajax({
                    method: "POST",
                    url: handlerHost + "web/handlers/bonus_entry.php",
                    data: {
                        UserId: useridcookie
                    }
                }).done(function (response) {

                    response = JSON.parse(response);

                    if (response.limit == "OVER_LIMIT") {
                        window.game.entryOverlimit = true;
                    } else if (response.limit == "OK") {
                        window.game.entryOverlimit = false;
                    }


                });
            }
            else {
                setCookie('alreadyplayed', 'true');
            }


        }, this);
    }

    this.createPowerButton = function () {

        var metertween;

        var xposition = game.width - 150;

        var yposition = game.height - 200;

        var redcircle = game.add.graphics(0, 0);

        redcircle.beginFill(0xFF0000, 1);

        redcircle.drawCircle(xposition, yposition, 120);

        redcircle.fixedToCamera = true;

        powermeter = game.add.graphics(0, 0);

        powermeter.position.setTo(xposition, yposition);

        powermeter.pivot.setTo(xposition, yposition);

        powermeter.rotation = 1.5;

        powermeter.fixedToCamera = true;

        var angle = { min: 0, max: 0 };

        powermeter.runMeter = function () {

            powermeter.clear();

            powermeter.beginFill(0x808080);

            powermeter.arc(game.width - 150, game.height - 200, 60, game.math.degToRad(angle.min), game.math.degToRad(angle.max), true);

            powermeter.endFill();
        }

        powermeter.restart = function () {

            angle.min = 0;

            angle.max = 0;

            metertween = game.add.tween(angle).to({ max: 360 }, 800, "Linear", true, 0, -1, false);
        }

        powermeter.restart();

        button = game.add.image(game.width - 150, game.height - 200, 'gobutton');

        button.anchor.set(.5);

        button.inputEnabled = true;

        button.input.useHandCursor = true;

        button.fixedToCamera = true;

        button.fire = function () {

            if (!launched) {

                button.events.onInputDown.removeAll();

                var shotpower = (angle.max / 360) * 3500;

                metertween.stop();

                var anim = golfer.animations.add('swing');

                anim.play(11, false);

                anim.onComplete.add(function () {

                    golfer.frame = 0

                }, this);

                var event = game.time.events.add(800, function () {

                    fx.swing.play();

                    launched = true;

                    game.physics.arcade.velocityFromRotation(arrow.rotation, shotpower, ball.body.velocity);

                    button.events.onInputDown.add(button.fire, this);

                });
            }
        };

        button.events.onInputDown.add(button.fire, this);

        var spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        spacekey.onDown.add(button.fire, this);

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        enterKey.onDown.add(button.fire, this);
    }

    this.reset = function () {

        launched = false;

        ball.body.x = ballStartingPoint.x - 10;

        ball.body.y = ballStartingPoint.y;

        ball.resetBallPhysics();

        powermeter.restart();

        arrow.rotation = -.2;

        arrow.alpha = 1;

        collidedWithTrap = false;

    }

    this.selectAngle = function () {

        var angleTop = -48;

        var angleBottom = -5;

        if (game.input.activePointer.isDown) {

            if (!rectIgnore.contains(game.input.activePointer.x, game.input.activePointer.y)) {

                arrow.rotation = game.physics.arcade.angleBetween(arrow, game.input.activePointer);

                if (arrow.angle < angleTop) {
                    arrow.angle = angleTop;
                }

                if (arrow.angle > angleBottom) {
                    arrow.angle = angleBottom;
                }
            }
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

            if (arrow.angle > angleTop)
                arrow.rotation -= .02;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

            if (arrow.angle < angleBottom)
                arrow.rotation += .02;
        }
    }

    this.createClouds = function () {

        var countOfClouds = 10;

        var startingRange = 300;

        for (var i = 0; i < countOfClouds; i++) {

            var cloudType = "cloud" + game.rnd.integerInRange(1, 3);

            var randomX = game.rnd.integerInRange(startingRange, startingRange + 2000);

            var randomY = game.rnd.integerInRange(1, 120);

            var cloud = game.add.sprite(randomX, randomY, cloudType);

            //game.add.tween(cloud).to({ x: worldwidth }, 500000, Phaser.Easing.Linear.None).start();

            startingRange += 2000;

        }

        ridgeline = game.add.sprite(game.rnd.integerInRange(6000, 8200), -100, "ridgeline");
        
        ridgeline.anchor.set(.5);

        game.physics.arcade.enable(ridgeline);

        var collidingWithRidgeLine = false;

        ridgeline.collidedWithRidgelineHandler = function (b, r) {

            if (!collidingWithRidgeLine) {

                collidingWithRidgeLine = true;

                game.camera.unfollow(ball);

                game.camera.follow(ridgeline);

                b.alpha = 0;

                b.body.enable = false;

                b.allowGravity = false;

                b.body.velocity.setTo(0, 0);

                var ridgelineTweenY = game.add.tween(r).to({ y: 100 }, 500, "Linear", true, 0, 0, false);

                 ridgelineTweenY.onComplete.add(function () {

                    var ridgelineTweenUpDown = game.add.tween(r).to({ y: '+100' }, 1000, "Linear", true, 0, -1, true);

                 });

                var ridgelineTweenX = game.add.tween(r).to({ x: 35350 }, 5000, "Linear", true, 0, 0, false);

                var ballTweenX = game.add.tween(b).to({ x: 35100 }, 5000, "Linear", true, 0, 0, false);               

                ballTweenX.onComplete.add(function () {

                    b.y = r.y+100;

                    b.alpha = 1;

                    b.body.bounce.set(0);

                    b.body.enable = true;

                    b.allowGravity = true;

                    setTimeout(function(){                        

                        var driveOffTween = game.add.tween(r).to({ x: worldwidth+300 }, 450, "Linear", true, 0, 0, false);

                    }, 2000)                    

                }, this);

            }
               
        }

    }

    this.loadSounds = function () {

        fx.swing = game.add.audio('swing');

        fx.gopher = game.add.audio('gopher');

        fx.cartbounce = game.add.audio('cartbounce');

        fx.mower = game.add.audio('mower');

        fx.mower.allowMultiple = false;

        fx.claps = game.add.audio('claps');
    }

    this.shutdown = function () {

        yardsGained = 0;

        started = false;

        launched = false;

        collidedWithTrap = false;

        button.inputEnabled = true;

        this.reset();

        game.tweens.removeAll();
    }

}
