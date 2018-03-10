var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });
var sprite;
var cursors;
var exit;
var car;
var car2;
var car3;
var blocks = [];
var activeCar = car;
var activeCarX, activeCarY;
var isDragging = false;


function preload() {

    game.load.image('car', 'images/car_top_20.png');
    game.load.image('exit', 'images/exit.png');
}

var result = 'Click a body';
function create() {

    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.setBoundsToWorld();

    car = game.add.sprite(200, 150, 'car');
    car2 = game.add.sprite(200, 500, 'car');
    car3 = game.add.sprite(500, 500, 'car');
    exit = game.add.sprite(750, 100, 'exit');

    game.physics.box2d.enable([car, car2, car3, exit]);

    car2.body.angle = 90;
    exit.scale.setTo(.4);

    car.key = "car";
    car2.key = "car2";
    car3.key = "car3";

    car.body.setZeroDamping();
    car2.body.setZeroDamping();
    car3.body.setZeroDamping();

    car.body.fixedRotation = true;
    car2.body.fixedRotation = true;
    car3.body.fixedRotation = true;

    

    car.body.collideWorldBounds = true;
    car2.body.collideWorldBounds = true;
    car3.body.collideWorldBounds = true;


    activeCar = car;

    car.body.static = true;
    car2.body.static = true;
    car3.body.static = true;
    exit.body.static = true;

    text = game.add.text(20, 20, '', { fill: '#ffffff' });

    car.body.setBodyContactCallback(exit, exitCar, this);

    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);


}

function exitCar(body1, body2, fixture1, fixture2, begin) {

    console.log('exitCar');

    if (!begin) {
        return;
    }
    
    
}

function mouseDragStart(e) {

    isDragging = true;

    var currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);
    console.log('clicked:');
    if (currentBody.length > 0) {
        activeCar = currentBody[0].sprite;
        activeCarX = activeCar.body.x;
        activeCarY = activeCar.body.y;

        activeCar.body.static = false;

        console.log(activeCar.key);
    }

    game.physics.box2d.mouseDragStart(game.input.activePointer);

}

var mousePointer;
function mouseDragMove() {
    mousePointer = game.input.activePointer;
    game.physics.box2d.mouseDragMove(mousePointer);

    
}

function mouseDragEnd(e) {
    if (activeCar) {
        activeCar.body.static = true;
    }
    game.physics.box2d.mouseDragEnd();

    isDragging = false;
}


function update() {


    car.body.setZeroVelocity();
    car2.body.setZeroVelocity();
    car3.body.setZeroVelocity();

    if (isDragging) {
        if (Math.abs((activeCar.angle / 90) % 2) == 0) {
            if (activeCarY) {
                activeCar.body.y = activeCarY;
            }
        } else {
            if (activeCarX) {
                activeCar.body.x = activeCarX;
            }
        }
    }



}


function click(pointer) {
    return;


    var bodies = game.physics.p2.hitTest(pointer.position, [car, car2, car3, exit]);

    if (bodies.length === 0) {
        result = "You didn't click a Body";
        $('#out').text("You didn't click a Body");
    }
    else {
        result = "You clicked: ";
        $('#out').text("You click a Body");
        for (var i = 0; i < bodies.length; i++) {
           result = result + bodies[i].parent.sprite.key;
            activeCar = bodies[i].parent.sprite;

            if (i < bodies.length - 1) {
                result = result + ', ';
            }
        }

    }

}
function render() {

}










