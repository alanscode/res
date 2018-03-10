var preload = function(game){}

preload.prototype = {

	preload: function(){ 
        var loadingBar = this.add.sprite( (this.game.width / 2)  , (this.game.height / 2) , "loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.add.sprite("loading");
        //this.load.setPreloadSprite(loadingBar);

        
        /* Title Screen */
        this.game.load.image('title_screen', 'assets/global/images/start-screen.jpg');
        this.game.load.image('title_startbutton', 'assets/global/images/start-button.jpg');


        /* Intro */
        this.game.load.video('intro', 'assets/intro/videos/intro.webm');

        /* Driving Game */
        this.game.load.image('drivingGame_fpo', 'assets/drivingGame/images/fpo.jpg');

        /* Cut Scene 1 */
        this.game.load.video('cut_scene_1', 'assets/cutScene1/videos/cutscene1.webm');


        /* Putting Game */
        this.game.load.image('putting_paddle', 'assets/putting/images/golfer.png');
        this.game.load.image('putting_ball', 'assets/putting/images/yarn004_crop.jpg');
        this.game.load.image('putting_launcher', 'assets/putting/images/arrow.png');
        this.game.load.image('putting_board_fpo', 'assets/putting/images/board-fpo.jpg');
        this.game.load.image('putting_board_piece', 'assets/putting/images/collider.jpg');
        this.game.load.image('putting_big_board_piece', 'assets/putting/images/big-board-piece.jpg');

        /* Cut Scene 2 */
        this.game.load.video('cut_scene_2', 'assets/cutScene1/videos/cutscene1.webm');


        /* Parking Game */
        this.game.load.image('parkingGame_fpo', 'assets/parkingGame/images/fpo.jpg');


        /* End Scene */
        this.game.load.video('end_scene', 'assets/endScene/videos/mario.webm');


        this.game.load.image('scoreBoard_fpo', 'assets/scoreBoard/images/fpo.jpg');
        this.game.load.image('scoreBoard_fpo2', 'assets/scoreBoard/images/fpo2.jpg');


        // Old background
        //this.game.load.image('putting_background', 'assets/putting/images/grass.jpg');


        // Environment
        //this.game.load.tilemap('putting_board', 'assets/putting/maps/board1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('putting_board', 'assets/putting/maps/board2.json', null, Phaser.Tilemap.TILED_JSON);
        //this.game.load.image('putting_background', 'assets/putting/images/board1.jpg');
        this.game.load.image('putting_background', 'assets/putting/images/board2.jpg');
        this.game.load.image('putting_collider', 'assets/putting/images/collider.jpg');


		//this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
	},
  	
  	create: function(){
		//this.game.state.start("Title");
        this.game.state.start("Intro");



	}
}