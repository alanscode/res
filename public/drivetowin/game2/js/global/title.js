var title = function(game){}

title.prototype = {

  	create: function(){

		var startScreen = this.game.add.sprite( (this.game.width / 2)  , (this.game.height / 2) , "title_screen");
		startScreen.anchor.setTo(0.5,0.5);

		var startButton = this.game.add.button(startScreen.x , startScreen.y , "title_startbutton" , this.start , this);
		startButton.anchor.setTo(0.5,0.5);
	},

	start: function(){
		
		this.game.state.start("PuttingGame");

		// Start timer
		this.game.timer.start();

		// Set level
		this.game.level.setLevel(1);
	}

    
}