game2.launcher = function(game){
    
    
    // Game instance
    this.game = game;



    // Variables
    this.initialX = this.game.world.width * 0.835;
    this.initialY = this.game.world.height * 0.5;
    this.direction = null;
    this.launched = null;
    this.initialAngle = 0;
    this.maxAngle = 30;
    this.speedIncrement = 4;




    // Create sprite
    this.createSprite = function() {

        // Create launcher
        this.sprite = this.game.add.sprite( this.initialX , this.initialY , 'putting_launcher');
        this.sprite.anchor.setTo(1 , 0.5);


        // Init
        this.init();

        
    };



    // Initializes variables and state and so forth (also used by reset)
    this.init = function() {

        this.direction = 'up'
        this.sprite.angle = this.initialAngle;
        this.launched = false;

    }



    

    // Create sprite
    this.createSprite();
    return this;




};





game2.launcher.prototype = {


    update: function() {

        // Move launcher as long as it hasn't launched yet
        if (!this.launched) {

            // Change direction at boundaries
            if (this.sprite.angle <= -this.maxAngle) {
                this.direction = 'up';
            } else if (this.sprite.angle >= this.maxAngle) {
                this.direction = 'down';
            }
        
            // Change angle of launcher
            if (this.direction == 'down') {
                this.sprite.angle -= this.speedIncrement;
            } else {
                this.sprite.angle += this.speedIncrement;
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


    launch: function() {
        this.launched = true;
    },
    
    

    sprite: this.sprite
    
    
  

    
};