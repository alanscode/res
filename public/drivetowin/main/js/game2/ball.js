game2.ball = function(game){


    // Sprite instance
    this.sprite = null;


    // Game instance
    this.game = game;




    // Variables
    this.defaultVelocity = 850;
    this.initialX = this.game.world.width * 0.847;
    this.initialY = this.game.world.height * 0.5;
    this.collidingWith = null;









    this.createSprite = function() {

        // Create ball
        this.sprite = this.game.add.sprite( this.initialX , this.initialY , 'putting_ball');
        this.sprite.anchor.setTo(0.5 , 0.5);
        this.game.physics.p2.enableBody(this.sprite);
        this.sprite.body.fixedRotation = true;
        this.sprite.body.damping = 0;


        this.sprite.checkWorldBounds = true;


        // Init
        this.init();

    };


    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

        this.sprite.x = this.initialX;
        this.sprite.y = this.initialY;

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        this.collidingWith = '';

    };











    // Create sprite
    this.createSprite();
    return this;











}





game2.ball.prototype = {


    update: function() {

    },



    render: function() {

    },



    reset: function() {

        this.sprite.reset(this.initialX , this.initialY);

    },


    sprite: this.sprite,





    launch: function(angle) {

        this.game.game2.sounds.swing.play();
        this.createVelocityFromAngle(angle + 180);

    },


    createVelocityFromAngle: function(angle) {


        var velocityX = Math.cos(this.game.math.degToRad(angle)) * this.defaultVelocity;
        var velocityY = Math.sin(this.game.math.degToRad(angle)) * this.defaultVelocity;


        // wait a tiny tick for the golfer to swing
        setTimeout(function() {
            this.sprite.body.velocity.x = velocityX;
            this.sprite.body.velocity.y = velocityY;
        }.bind(this) , 100);


    },



    maintainVelocity: function() {

        var angle = this.getCurrentAngle();

        if (angle == 0) return;

        this.createVelocityFromAngle(angle);

    },



    getCurrentAngle: function() {

        var velocityX = this.sprite.body.velocity.x;
        var velocityY = this.sprite.body.velocity.y;

        var angle = Math.atan2(velocityX, velocityY);
        angle = (angle * 180 / Math.PI );


        if ( (velocityX < 0) && (velocityY < 0) ) {
            angle = Math.abs(angle - 90);
        }

        if ( (velocityX > 0) && (velocityY < 0) ) {
            var tmp = 135 - angle;
            angle = 135 + tmp;
            angle = angle + 180;
        }

        if ( (velocityX < 0) && (velocityY > 0) ) {
            angle = Math.abs(angle - 90);
        }

        if ( (velocityX > 0) && (velocityY > 0) ) {
            angle = Math.abs(angle - 90);
        }

        return angle;


    },




    getSpeed: function() {

        return Math.sqrt( (this.sprite.body.velocity.x*this.sprite.body.velocity.x) + (this.sprite.body.velocity.y+this.sprite.body.velocity.y)  );

    },


    logSpeed: function() {

        var speed = this.getSpeed();
        var angle = this.getCurrentAngle();


        var body = this.sprite.body;
        var angle, currVelocitySqr, vx, vy;
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        currVelocitySqr = vx * vx + vy * vy;
        console.log(speed , currVelocitySqr , angle);

    }




};
