puttingGame.launcher = function(game , controls){
    
    
    // Game instance
    this.game = game;

    // Controls instance
    this.controls = controls;



    // Variables
    this.initialX = this.game.world.width * 0.75;
    this.initialY = this.game.world.height * 0.5;
    this.direction = null;
    this.launched = null;
    this.maxAngle = 45;
    this.speedIncrement = 4;




    // Create sprite
    this.createSprite = function() {

        // Create launcher
        this.sprite = this.game.add.sprite( this.initialX , this.initialY , 'putting_launcher');
        this.sprite.anchor.setTo(1 , 0.5);
        this.sprite.scale.x = 0.3;
        this.sprite.scale.y = 0.3;
        this.game.physics.arcade.enableBody(this.sprite);

        // Init
        this.init();

        
    };



    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

        this.direction = 'up'
        this.launched = false;


    }



    

    // Create sprite
    this.createSprite();
    return this;




};





puttingGame.launcher.prototype = {


    update: function() {
        
        // Move launcher as long as it hasn't launched yet
        if (!this.launched) {
        
            // Change direction at boundaries
            if (this.sprite.angle <= -this.maxAngle) {
                this.direction = 'down';
            } else if (this.sprite.angle >= this.maxAngle) {
                this.direction = 'up';
            }
        
            // Change angle of launcher
            if (this.direction == 'up') {
                this.sprite.angle -= this.speedIncrement;
            } else {
                this.sprite.angle += this.speedIncrement;
            }
            
            // If user launches ball, update state
            if (this.controls.launchBall()) {
                this.launched = true;
            }
            
        }
        
    
        


    },
    
    
    render: function() {
        
    },


    reset: function() {

        // Init
        this.init();

    },
    
    
    getAngle: function() {
        return this.sprite.angle;
    },


    getLaunchedStatus: function() {
        return this.launched;
    },
    
    

    sprite: this.sprite
    
    
  

    
};