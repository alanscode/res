var scoreBoard = function(game) {

	this.game = game;
    

};


scoreBoard.prototype = {

	create: function() {

       this.fpo = this.game.add.sprite(this.game.world.centerX , this.game.world.centerY, 'scoreBoard_fpo');

        this.fpo.anchor.setTo(0.5 , 0.5);
        this.fpo.scale.setTo(this.game.scaleRatio , this.game.scaleRatio);

	},

	update: function() {

         //if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.game.input.onDown.add(function() {


		       this.fpo.destroy();
		       var fpo = this.game.add.sprite(this.game.world.centerX , this.game.world.centerY, 'scoreBoard_fpo2');

		        fpo.anchor.setTo(0.5 , 0.5);
		        fpo.scale.setTo(this.game.scaleRatio , this.game.scaleRatio);

		        this.game.input.onDown.add(function() {

		        	this.game.state.start("BlankScene");

		        }.bind(this));


            
            

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