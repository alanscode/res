game2.paddle = function(game) {
    
    
    // Sprite instance
    this.sprite = null;
    
    
    // Game instance
    this.game = game;
    


    // Variables
    this.paddleSpeed = 9;
    this.paddleStartX = this.game.world.width * 0.885;
    this.paddleStartY = this.game.world.height * 0.44;

    this.paddleUpperBound = this.game.game2.paddleUpperBound;
    this.paddleLowerBound = this.game.game2.paddleLowerBound;






    this.createSprite = function() {

        // Create paddle
        this.sprite = this.game.add.sprite( this.paddleStartX , this.paddleStartY , 'putting_paddle');
        this.sprite.animations.add('swing');
        this.sprite.anchor.setTo(0.5 , 0.5);
        this.game.physics.p2.enableBody(this.sprite);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon('putting_paddle_physicsData','golfer');
        this.sprite.body.kinematic = true;
        //this.sprite.body.debug = 1;




        // Init
        this.init();

        
    };


    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

        this.sprite.body.y = this.paddleStartY;

    };



    this.movePaddleToY = function(yCoord) {
        
        if (yCoord < this.paddleUpperBound) yCoord = this.paddleUpperBound;
        if (yCoord > this.paddleLowerBound) yCoord = this.paddleLowerBound;

        this.sprite.body.y = yCoord;

    };






    
    
    // Create sprite
    this.createSprite();
    return this;










    
}





game2.paddle.prototype = {


    update: function() {

    },
    
    
    render: function() {
        
    },
    
    
    
    reset: function() {
  
        
        this.sprite.frame = 0;  // Reset sprite animation
        this.init();
    
    },
    
    
    sprite: this.sprite,



    paddleUp: function() {

        this.movePaddleToY(this.sprite.body.y - this.paddleSpeed);

    },

    paddleDown: function() {

        this.movePaddleToY(this.sprite.body.y + this.paddleSpeed);

    },

    movePaddleByNum: function(num) {

        this.movePaddleToY(this.sprite.body.y + num);

    }
    
};