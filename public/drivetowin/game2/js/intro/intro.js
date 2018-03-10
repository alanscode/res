var intro = function(game) {

	this.game = game;
    


    this.complete = function() {

    	video.stop();

        video.destroy();

    	this.game.state.start("DrivingGame");

    }

};


intro.prototype = {

	create: function() {

        video = this.game.add.video('intro');

        video.play(true);

        video.addToWorld(this.game.world.centerX , this.game.world.centerY , 0.5 , 0.5 , this.game.world.width / video.width , this.game.world.width / video.width);

	},

	update: function() {

        this.game.input.onDown.add(function() {
            this.game.input.onDown.removeAll();
            this.complete();
        }, this);

         //if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         	


	},

	render: function() {

	}


};