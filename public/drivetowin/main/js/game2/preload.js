var preload = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
preload.prototype = {

	preload: function(){

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.updateLayout();



    	// Get random board
    	var numboards = 2;
    	this.game.game2.board_num = Math.floor(Math.random() * ((numboards+1) - 1) + 1);

        
        /* Title Screen */
        //this.game.load.image('title_screen', 'assets/global/images/start-screen.jpg');
        //this.game.load.image('title_startbutton', 'assets/global/images/start-button.jpg');

        
        


        /* Putting Game */


        /* Instructions */
        this.game.load.image('putting_instructions', 'assets/images/putting/instructions.png');

		/* Environment */
		this.game.load.image('putting_board_borders', 'assets/images/putting/trans.png');
		this.game.load.image('putting_board', 'assets/images/putting/board' + this.game.game2.board_num + '_background.png');
		this.game.load.physics('putting_board_physicsData', 'assets/images/putting/board' + this.game.game2.board_num + '_borders.json');

		this.game.load.physics('putting_hole_physicsData', 'assets/images/putting/hole.json');


        this.game.load.spritesheet('putting_paddle', 'assets/images/putting/golfer.png' , 115 , 145 , 3);
        this.game.load.image('putting_ball', 'assets/images/putting/ball.png');
        this.game.load.image('putting_launcher', 'assets/images/putting/arrow.png');

        /*
        this.game.load.image('putting_board_fpo', 'assets/putting/images/board-fpo.jpg');
        this.game.load.image('putting_board_piece', 'assets/putting/images/collider.jpg');
        this.game.load.image('putting_big_board_piece', 'assets/putting/images/big-board-piece.jpg');
        */




		//this.game.load.spritesheet("numbers","assets/numbers.png",100,100);

		
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
		
		
		this.game.state.start("PuttingGame");
        


		// Instantiate level indicator
		//this.game.level = new level();
		



	}


    
}