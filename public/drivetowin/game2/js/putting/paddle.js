puttingGame.paddle = function(game , controls){
    
    
    // Sprite instance
    this.sprite = null;
    
    
    // Game instance
    this.game = game;
    

    // Controls instance
    this.controls = controls;


    // Variables
    this.paddleSpeed = 3;
    this.paddleStartX = this.game.world.width * 0.95;
    this.paddleStartY = this.game.world.height * 0.5;






    this.createSprite = function() {

        // Create paddle
        this.sprite = this.game.add.sprite( this.paddleStartX , this.paddleStartY , 'putting_paddle');
        this.sprite.anchor.setTo(0.5 , 0.5);
        this.sprite.scale.x = -0.1;
        this.sprite.scale.y = 0.1;
        this.game.physics.arcade.enableBody(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1 , 1);
        this.sprite.body.immovable = true;

        // Init
        this.init();

        
    };


    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

        this.sprite.x = this.paddleStartX;
        this.sprite.y = this.paddleStartY;

    };






    
    
    // Create sprite
    this.createSprite();
    return this;










    
}





puttingGame.paddle.prototype = {


    update: function() {

        // Paddle control
        if (this.controls.paddleUp()) {
            this.sprite.y -= this.paddleSpeed;
        }
        if (this.controls.paddleDown()) {
            this.sprite.y += this.paddleSpeed;
        }


    },
    
    
    render: function() {
        
    },
    
    
    
    reset: function() {
  
        // Init
        this.init();
    
    },
    
    
    sprite: this.sprite
    
};