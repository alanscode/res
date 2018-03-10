var drivingGame = function(game) {

	this.game = game;
    

};


drivingGame.prototype = {

	create: function() {

       var fpo = this.game.add.sprite(this.game.world.centerX , this.game.world.centerY, 'drivingGame_fpo');

        fpo.anchor.setTo(0.5 , 0.5);
        fpo.scale.setTo(this.game.scaleRatio , this.game.scaleRatio);

        //this.game.level.setLevel(1);
        this.game.timer.start();
        

        this.game.pauseMenu.show();


	},

	update: function() {

         //if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.game.input.onDown.add(function() {
            
            this.game.timer.stop();

            this.game.state.start("CutScene1");

        }, this);
 	  

         //}
         //if (this.game.input.onDown) {
//        	this.complete();
		//}


	},

	render: function() {

	},

    play: function() {

 
    
    }


};