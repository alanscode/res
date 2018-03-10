puttingGame.ball = function(game){
    
    
    // Sprite instance
    this.sprite = null;
    
    
    // Game instance
    this.game = game;
    

    

    // Variables
    this.defaultVelocity = 600;
    this.sandVelocityMultiplier = 0.5;
    this.initialX = this.game.world.width * 0.8 ;
    this.initialY = this.game.world.height * 0.5;
    this.collidingWith = null;








    this.createSprite = function() {

        // Create ball
        this.sprite = this.game.add.sprite( this.initialX , this.initialY , 'putting_ball');
        this.sprite.anchor.setTo(0.5 , 0.5);
        this.sprite.scale.x = 0.005;
        this.sprite.scale.y = 0.005;
        this.game.physics.arcade.enableBody(this.sprite);
        this.sprite.body.bounce.setTo(1 , 1);

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




    
    this.updateVelocityForCollision = function() {


        switch (this.collidingWith) {
            

            case 'sand': // Colliding with sand
                
                // Get angle from velocity and speed (this is a reverse of game.physics.arcade.velocityFromAngle)
                var angle = this.game.math.radToDeg(Math.acos(this.sprite.body.velocity.x / this.sprite.body.speed));

                // Change velocity for sand collision
                this.sprite.body.velocity.x  *= this.sandVelocityMultiplier;
                this.sprite.body.velocity.y  *= this.sandVelocityMultiplier;
                
                break;
            
            case '': // Colliding with nothing

                this.sprite.body.velocity.x  *= (1 / this.sandVelocityMultiplier);
                this.sprite.body.velocity.y  *= (1 / this.sandVelocityMultiplier);

                break;
                
        }
        
        
            
    }

    


    
    
    // Create sprite
    this.createSprite();
    return this;










    
}





puttingGame.ball.prototype = {


    update: function() {


    },
    
    
    render: function() {
        
    },
    
    
    
    reset: function() {

        this.init();

    },
    
    
    sprite: this.sprite,
    
    
    
    setCollidingWith: function(collider) {
        
        if (this.collidingWith == collider) return;

        this.collidingWith = collider;
        this.updateVelocityForCollision();
        
    },
    
    
    getCollidingWith: function() {
        
        return this.collidingWith;
        
    },
    
    
    launch: function(angle) {
        this.game.physics.arcade.velocityFromAngle(angle, this.defaultVelocity, this.sprite.body.velocity);
    },


    isOutOfBounds: function() {


//console.log('pg_oob' , this.game.world.width , this.game.world.height);  
        return (this.sprite.x < this.game.world.bounds.x) || (this.sprite.x > (this.game.world.bounds.width - this.game.world.bounds.x)) || (this.sprite.y < this.game.world.bounds.y) || (this.sprite.world.y > (this.game.world.bounds.height - this.game.world.bounds.y));

    }

    
};