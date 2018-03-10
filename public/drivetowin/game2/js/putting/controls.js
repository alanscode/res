puttingGame.controls = function(game){
    
    
    // Game instance
    this.game = game;
    
    

    return this;



};





puttingGame.controls.prototype = {


    update: function() {


    },
    
    
    render: function() {
        
    },
    
    

    sprite: this.sprite,
    
    
    // Move paddle up
    paddleUp: function() {
        
        // Keyboard up
        if (this.game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown) {
            return true;
        }
        
        return false;
        
    },
    
    
    // Move paddle down
    paddleDown: function() {
        
        // Keyboard down
        if (this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown) {
            return true;
        }
        
        return false;
    
        
    },
    

    // Launch ball
    launchBall: function() {
        
        // Spacebar
        if (this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).isDown) {
              return true;
        }

        // Mouse click
        if (this.game.input.activePointer.leftButton.isDown) {
            return true;
        }
        
        return false;
        
    }
    
    

    
};