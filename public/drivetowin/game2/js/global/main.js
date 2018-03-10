var mainGame = function() {


    this.start = function() {


        var gameWidth = $(window).width();
        var gameHeight = (gameWidth * 9) / 16;

        gameWidth = 1600;
        gameHeight = 900;
        //gameWidth = '100%';
        //gameHeight = '100%';
        //gameWidth = 800;
        //gameHeight = 450;
        

      
        
        var game = new Phaser.Game(gameWidth , gameHeight , Phaser.AUTO , "gameCanvasWrapper");


        game.state.add("Boot" , boot);
        game.state.add("Preload" , preload);
        game.state.add("Title", title);
        game.state.add("Intro", intro);

        game.state.add("DrivingGame", drivingGame);

        game.state.add("CutScene1", cutScene1);

        game.state.add("PuttingGame" , puttingGame);

        game.state.add("CutScene2", cutScene2);

        game.state.add("ParkingGame" , parkingGame);

        game.state.add("EndScene" , endScene);
        //game.state.add("GameOver" , gameOver);

        game.state.add("ScoreBoard" , scoreBoard);

        game.state.add("BlankScene" , blankScene);
        


        game.state.start("Boot");


    }
    

};


mainGame.prototype = {

    start: function() {

        this.start();
    
    }

};