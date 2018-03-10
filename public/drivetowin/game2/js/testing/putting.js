var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'js/testing/2layer.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('ground_1x1', 'js/testing/ground_1x1.png');
    game.load.image('phaser', 'js/testing/arrow.png');
    game.load.spritesheet('coin', 'js/testing/coin.png', 32, 32);


        game.load.tilemap('putting_board', 'assets/putting/images/board1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Background1', 'assets/putting/images/board1.jpg');
        game.load.image('Collider', 'assets/putting/images/collider.jpg');


}

var map;
var layer;
var layer2;

var sprite;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //map = game.add.tilemap('putting_board');
    map = game.add.tilemap('map');

    //map.addTilesetImage('ground_1x1');
    //map.addTilesetImage('coin');
    map.addTilesetImage('Background1');
    map.addTilesetImage('Collider');

    //map.setCollisionBetween(10, 3601);
    map.setCollisionBetween(1);

    //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
    //map.setTileIndexCallback(1, hitCoin, this);

    //  This will set the map location 2, 0 to call the function
    //map.setTileLocationCallback(2, 0, 1, 1, hitCoin, this);

    // game.device.canvasBitBltShift = false;

    //layer = map.createLayer('Background1Layer');
    layer = map.createLayer('BackgroundLayer');

    layer.resizeWorld();
    
    layer2 = map.createLayer('CollideLayer');

    layer2.resizeWorld();
    game.add.existing(layer2);


  map.setTileIndexCallback([1], hitCoin, this, layer2); //if hit, battlezone is entered
        //this.map.setCollisionByExclusion([],true,this.layer3);
        //this.map.setCollisionCallback(function() {return true;}, this.layer2);
        /*camera*/

    sprite = game.add.sprite(260, 100, 'phaser');
    sprite.anchor.set(0.5);
    game.physics.enable(sprite);
    game.physics.enable(layer);
    game.physics.enable(layer2);

    sprite.body.setSize(16, 16, 8, 8);

    //  We'll set a lower max angular velocity here to keep it from going totally nuts
    sprite.body.maxAngular = 500;

    //  Apply a drag otherwise the sprite will just spin and never slow down
    sprite.body.angularDrag = 50;

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();

}

function hitCoin(sprite, tile) {
console.log(1);
    tile.alpha = 0.2;

    layer.dirty = true;

    return false;

}

function update() {

    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(sprite, layer2);
    //game.physics.arcade.collide(sprite, layer , function() { console.log(1); } , function() { console.log(2); } ,this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 200;
    }

    if (cursors.up.isDown)
    {
        game.physics.arcade.velocityFromAngle(sprite.angle, 200, sprite.body.velocity);
    }

}

function render() {

    game.debug.body(sprite);

}