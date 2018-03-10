var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {

	preload: function(){

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.updateLayout();

         window.brad = this.game; 
          this.game.load.image("loading","assets/global/images/loading.png"); 

        /* Need this here because we're initializing down below */
        this.game.load.image('global_pause_button', 'assets/pauseMenu/images/pause.png');
        this.game.load.image('global_pause_menu', 'assets/pauseMenu/images/fpo.jpg');


		
		 // Get scaling ratio
		 var w = this.world.width;
		 var h = this.world.height;
		 var builtW = 800;
		 var builtH = 450;

		 this.game.scaleRatio = w / builtW;
 

	},


  	create: function(){

		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.game.scale.updateLayout();




	    this.game.stage.backgroundColor = '#cccccc';
		
		
		this.game.state.start("Preload");
        

		// Instantiate timer
		this.game.timer = new timer(this.game);

		this.game.pauseMenu = new pauseMenu(this.game);

		// Instantiate level indicator
		//this.game.level = new level();
		



	}


    
}