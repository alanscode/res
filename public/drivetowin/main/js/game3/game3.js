

var game3 = function (game) {

    //level layout 
    var layout = {
        levels: [
                    {//0  New level 1
                        cars:
                            [
                             { x: 1, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                            { x: 2.5, y: 1, sprite: 'car_black', angle: 180 },
                            { x: 4, y: 1.5, sprite: 'car_black2', angle: 90 },
                            { x: 4.5, y: 3, sprite: 'car_blue', angle: 0 },
                            { x: 5.5, y: 3, sprite: 'car_green', angle: 0 },
                            { x: 5.5, y: 1, sprite: 'car_red2', angle: 180 },
                            { x: 3, y: 3.5, sprite: 'car_black2', angle: 90 },
                            { x: 5, y: 4.5, sprite: 'car_red', angle: 90 },
                            { x: 3.5, y: 5, sprite: 'car_black', angle: 180 },
                            { x: 5, y: 5.5, sprite: 'car_red', angle: 90 },
                            { x: 1, y: 4.5, sprite: 'car_warmgrey', angle: 90 },
                            ],
                        exit: { x: 1445, y: 460, sprite: 'exit' }
                    }
                    //,
                    //{//1 DELETE
                    //    cars:
                    //        [
                    //            { x: 1, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                    //            { x: .5, y: 1, sprite: 'car_black', angle: 180 },
                    //            { x: 4.5, y: .5, sprite: 'car_black2', angle: 90 },
                    //            { x: 3.5, y: 2, sprite: 'car_blue', angle: 0 },
                    //            { x: 4.5, y: 3, sprite: 'car_green', angle: 0 },
                    //            { x: 5.5, y: 2.5, sprite: 'car_red2', angle: 180 },
                    //            { x: 1.5, y: 3.5, sprite: 'car_black2', angle: 90 },
                    //            { x: 1, y: 5.5, sprite: 'car_red', angle: 90 },
                    //            { x: 2.5, y: 5, sprite: 'car_black', angle: 180 },
                    //            { x: 4, y: 5.5, sprite: 'car_red', angle: 90 },
                    //            { x: 5, y: 4.5, sprite: 'car_warmgrey', angle: 90 },
                    //        ],
                    //    exit: { x: 1445, y: 460, sprite: 'exit' }
                    //}
                    ,
                        {//2  New level 2
                            cars:
                                [


                                { x: 1.5, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                                { x: .5, y: 1, sprite: 'car_black', angle: 180 },
                                { x: 4, y: .5, sprite: 'car_black2', angle: 90 },
                                { x: 3.5, y: 2, sprite: 'car_black', angle: 180 },
                                { x: 5.5, y: 3, sprite: 'car_red2', angle: 180 },
                                { x: 5, y: 1.5, sprite: 'car_red', angle: 90 },
                                { x: 4, y: 3.5, sprite: 'car_warmgrey', angle: 90 },
                                { x: 5, y: 4.5, sprite: 'car_red', angle: 90 },
                                { x: 3.5, y: 5, sprite: 'car_green', angle: 0 },
                                { x: 2.5, y: 4, sprite: 'car_blue', angle: 0 },
                                { x: .5, y: 5, sprite: 'car_grey', angle: 180 },
                                { x: 2, y: 5.5, sprite: 'car_warmgrey', angle: 90 },
                                ],
                            exit: { x: 1445, y: 460, sprite: 'exit' }
                        }
                    ,
                        {//3  New level 3
                            cars:
                                [
                                { x: 1, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                                { x: 1.5, y: 1, sprite: 'car_cream', angle: 180 },
                                { x: 5, y: .5, sprite: 'car_warmgrey', angle: 90 },
                                { x: 3, y: .5, sprite: 'car_black2', angle: 90 },
                                { x: 2.5, y: 2, sprite: 'car_black', angle: 180 },
                                { x: 5.5, y: 2, sprite: 'car_red2', angle: 180 },
                                { x: 4, y: 1.5, sprite: 'car_red', angle: 90 },
                                { x: 4, y: 4.5, sprite: 'car_warmgrey', angle: 90 },
                                { x: 5.5, y: 5, sprite: 'car_red2', angle: 180 },
                                { x: 3.5, y: 3, sprite: 'car_green', angle: 0 },
                                { x: 4.5, y: 3, sprite: 'car_blue', angle: 0 },
                                { x: .5, y: 5, sprite: 'car_grey', angle: 180 },
                                ],
                            exit: { x: 1445, y: 460, sprite: 'exit' }
                        }
                      //  ,
                    //{//4 Keep
                    //    cars:
                    //        [
                    //            { x: 1, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                    //            { x: 4, y: .5, sprite: 'car_red', angle: 90 },
                    //            { x: 5.5, y: 1.5, sprite: 'car_red2', angle: 180 },
                    //            { x: 3, y: 1.5, sprite: 'car_red', angle: 90 },
                    //            { x: 4.5, y: 2, sprite: 'car_blue', angle: 0 },
                    //            { x: 2.5, y: 3, sprite: 'car_blue', angle: 0 },
                    //            { x: 3.5, y: 3, sprite: 'car_green', angle: 0 },
                    //            { x: 1, y: 3.5, sprite: 'car_red', angle: 90 },
                    //            { x: 5, y: 3.5, sprite: 'car_red', angle: 90 },
                    //            { x: 1, y: 4.5, sprite: 'car_red', angle: 90 },
                    //            { x: 2.5, y: 5, sprite: 'car_green', angle: 0 },
                    //            { x: 4.5, y: 4.5, sprite: 'car_black2', angle: 90 },
                    //            { x: 1, y: 5.5, sprite: 'car_red', angle: 90 },
                    //            { x: 4.5, y: 5.5, sprite: 'car_black2', angle: 90 },
                    //        ],
                    //    exit: { x: 1445, y: 460, sprite: 'exit' }
                    //}
                      ,
                    {//5 KEEP
                        cars:
                            [
                                { x: 1, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                                { x: 1.5, y: 1, sprite: 'car_blue', angle: 0 },
                                { x: 3, y: .5, sprite: 'car_red', angle: 90 },
                                { x: 5, y: .5, sprite: 'car_warmgrey', angle: 90 },
                                { x: 3.5, y: 2, sprite: 'car_blue', angle: 0 },
                                { x: 5, y: 1.5, sprite: 'car_red', angle: 90 },
                                { x: 4.5, y: 3.5, sprite: 'car_red2', angle: 180 },
                                { x: 5.5, y: 3, sprite: 'car_blue', angle: 0 },
                                { x: .5, y: 4.5, sprite: 'car_red2', angle: 180 },
                                { x: 2.5, y: 3.5, sprite: 'car_black2', angle: 90 },
                                { x: 2.5, y: 5, sprite: 'car_blue', angle: 0 },
                                { x: 5.5, y: 5, sprite: 'car_green', angle: 0 },
                            ],
                        exit: { x: 1445, y: 460, sprite: 'exit' }
                    }
                    //    ,
                    //{//6 DELETE
                    //    cars:
                    //        [
                    //            { x: 2, y: 2.5, sprite: 'car_white', angle: 90, playerCar: true },
                    //            { x: 1, y: .5, sprite: 'car_red', angle: 90 },
                    //            { x: 2.5, y: 1, sprite: 'car_blue', angle: 0 },
                    //            { x: 5, y: .5, sprite: 'car_warmgrey', angle: 90 },
                    //            { x: 1, y: 1.5, sprite: 'car_red', angle: 90 },
                    //            { x: 5.5, y: 2.5, sprite: 'car_red2', angle: 180 },
                    //            { x: .5, y: 3.5, sprite: 'car_red2', angle: 180 },
                    //            { x: 2.5, y: 3.5, sprite: 'car_black2', angle: 90 },
                    //            { x: 3.5, y: 5, sprite: 'car_blue', angle: 0 },
                    //            { x: 5, y: 4.5, sprite: 'car_warmgrey', angle: 90 },
                    //            { x: 1, y: 5.5, sprite: 'car_red', angle: 90 },
                    //            { x: 5, y: 5.5, sprite: 'car_red', angle: 90 },
                    //        ],
                    //    exit: { x: 1445, y: 460, sprite: 'exit' }
                    //}
        ]
    };

    var sprite;
    var cursors;
    var exit;
    var car;
    var cars;
    var activeCar = car;
    var activeCarX, activeCarY;
    var isDragging = false;
    var currentLevel = 0;
    var g = this;

    this.startGame = function () { loadNextLevel(); }

    //load a level
    var loadNextLevel = function () {

        //   console.log(g, this.cars, g.cars);

        //generate a random level index
        var level = Math.floor(Math.random() * layout.levels.length);
        currentLevel = level;
        //  setConsole('Random level loaded:' + level);

        //remove old cars 
        while (cars.length > 0) {
            cars.getAt(0).destroy();
        }
        if (cars) { cars.removeAll(); }
        if (exit) { exit.destroy(); }

        //get json data
        var ld = layout.levels[level];

        //add all cars loop
        for (i = 0; i < ld.cars.length; i++) {

            var cl = ld.cars[i];//car layout 

            var c = game.add.sprite(460 + 160 * cl.x, 60 + 160 * cl.y, cl.sprite);

            game.physics.box2d.enable(c);
            c.body.angle = cl.angle;
            if (cl.playerCar) {
                car = c;
            }

            //add car to group
            cars.add(c);
        }
        //exit
        exit = game.add.sprite(ld.exit.x, ld.exit.y, ld.exit.sprite);

        //physics enabled
        game.physics.box2d.enable([cars, exit]);

        cars.setAll('body.fixedRotation', true);
        cars.setAll('body.static', true);//static makes sure sprites dont move when other sprite collides
        exit.body.static = true;
        activeCar = car;//current active car

        //when main car collides exit 
        car.body.setBodyContactCallback(exit, exitCar, this);

        //car animation
        car.animations.add('car-animation', [0, 1, 2, 3, 4, 5], 2, true);
        car.animations.play('car-animation');
        setTimeout(function () {
            car.animations.stop();
            car.frame = 5;
        }, 2500);

        console.log(level)
    }

    this.preload = function () {

        //load all images
        //  game.load.image('car_white', 'assets/game3/car_white.png');
        game.load.spritesheet('car_white', 'assets/game3/car_white_SH.png', 130, 247);
        game.load.image('car_warmgrey', 'assets/game3/car_warmgrey.png');
        game.load.image('car_red', 'assets/game3/car_red.png');
        game.load.image('car_grey', 'assets/game3/car_grey.png');
        game.load.image('car_green', 'assets/game3/car_green.png');
        game.load.image('car_cream', 'assets/game3/car_cream.png');
        game.load.image('car_blue', 'assets/game3/car_blue.png');
        game.load.image('car_black', 'assets/game3/car_black.png');
        game.load.image('car_red2', 'assets/game3/car2_red.png');
        game.load.image('car_black2', 'assets/game3/car2_black.png');
        game.load.image('exit', 'assets/game3/exit.png');
        game.load.image("background", "assets/game3/background.png");
        game.load.image("bound_h", "assets/game3/bound_h.png");
        game.load.image("bound_v", "assets/game3/bound_v.png");
        game.load.image('start', 'assets/game3/CutScene.png');

        //load sound fx
        game.load.audio('carfx', 'assets/game3/car.mp3');

        //responsive game
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    this.create = function () {
        //  console.log('game3 started');

        //  console.log(cars, this.cars, game3.cars);


        // create sound fx
        carfxMusic = game.add.audio('carfx');



        //background
        background = game.add.tileSprite(0, 0, 1920, 1070, "background");

        //	Enable p2 physics
        game.physics.startSystem(Phaser.Physics.BOX2D);
        game.world.bounds.setTo(0, 0, 1450, 1020);//set the bottom and right bounds of paly area
        game.physics.box2d.setBoundsToWorld();//apply the bounds to game world

        //  'game.world.bounds.setTo' set the bound on bottom and right side. 

        var b_h1 = game.add.sprite(1920 / 2, 45, 'bound_h');
        game.physics.box2d.enable(b_h1);
        b_h1.body.static = true;

        var b_v1 = game.add.sprite(460, 1080 / 2, 'bound_v');
        game.physics.box2d.enable(b_v1);
        b_v1.body.static = true;

        //create a group of cars. 
        cars = game.add.group();

        //  mouse drag events
        //    console.log(mouseDragStart);
        game.input.onDown.add(mouseDragStart, this);
        game.input.addMoveCallback(mouseDragMove, this);
        game.input.onUp.add(mouseDragEnd, this);



        

        //start image
        var start = game.add.sprite(0, 0, 'start');

        start.inputEnabled = true;

        start.input.useHandCursor = true;

        start.events.onInputDown.add(
            function (s, pointer) {

                if (game.shopHondaLinkClicked(pointer.x, pointer.y)) return false;

                start.kill();

                loadNextLevel();

                game.startGameTimer();

                setTimeout(function () {

                    game.createPauseButton('3');

                }, 1000);               


                // Tracking
                //dataLayer.push({'event': 'btn_stage3_letsgo'});

            },

            this);


        //  loadNextLevel();
    };

    //when car reaches exit 
    function exitCar(body1, body2, fixture1, fixture2, begin) {

        if (!begin) {
            return;
        }

        //When car is reached the exit, disable drag
        mouseDragEnd();

        //move the car outside
        driveAway();
        //  console.log('Exit');
    }

    function mouseDragStart(e) {
        //flag - if 'activeCar' is dragging
        isDragging = true;

        //get the currently clicked car
        var currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);

        // if there any cars selected
        if (currentBody.length > 0 && currentBody[0].sprite.key != "exit") {

            //save the clicked car in global variable
            activeCar = currentBody[0].sprite;

            //store the X and Y positions of car, when darg  started
            activeCarX = game.input.activePointer.x;
            activeCarY = game.input.activePointer.y;

            //change static property so that it can be dragged.
            activeCar.body.static = false;

            //play sound
            //carfxMusic.play();
            carfxMusic.fadeIn(40);


        }

        //plugin function to init the drag process
        game.physics.box2d.mouseDragStart(game.input.activePointer);

    }

    var mousePointer;
    function mouseDragMove() {

        //current state of pointer (mouse/touch etc) 
        mousePointer = game.input.activePointer;

        //if car is being dragged
        if (isDragging) {

            //if car is in left-right direction, it moves only in X direction
            if (Math.abs((activeCar.angle / 90) % 2) == 1) {
                mousePointer.y = activeCarY;
            }
            else //if car is in up-down direction, it moves only in  y position
            {
                mousePointer.x = activeCarX;
            }
        }

        //plugin function to move sprite
        game.physics.box2d.mouseDragMove(mousePointer);
    }

    function mouseDragEnd(e) {
        //when car drag ended
        if (activeCar && activeCar.body) {

            //reset the static property of car
            activeCar.body.static = true;
        }

        //plugin funciton
        game.physics.box2d.mouseDragEnd();


        //update the flag
        isDragging = false;

        //stope sound
     //   carfxMusic.fadeOut(500);
        carfxMusic.fadeOut(50, 0);
    }

    //function to drive the car away. 
    function driveAway() {
        game.pauseGameTimer();
        function moveRight() {
            car.position.x += 50;

            if (car.position.x < (game.width + (car.width))) {
                setTimeout(function () { moveRight(); }, 30);
            }
        }

        //remove the body of car
        car.body = null;
        moveRight();

        setTimeout(function () {

            game.state.start("CutScene", true, false, "Vid4", "");
        }, 500);


    }

    this.update = function () {
    }

    this.render = function () {

    }

    this.shutdown = function () {
        while (cars.length > 0) {
            cars.getAt(0).destroy();
        }

        if (cars) {
            cars.removeAll();
        }

        if (exit) {
            exit.destroy();
        }
    }
    function setConsole(text) {

    }


}

