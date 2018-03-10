var pauseMenu = function(game) {

    this.game = game;

    this.pauseButton = null;

    this.pauseMenu = null;



    this.init = function() {

    }


    this.showPauseMenu = function() {

        this.pauseMenu = this.game.add.sprite(this.game.world.centerX , this.game.world.centerY , 'global_pause_menu');
        this.pauseMenu.anchor.setTo(0.5 , 0.5);
        this.pauseMenu.scale.setTo(this.game.scaleRatio , this.game.scaleRatio);
        this.pauseMenu.alpha = 0.5;

        this.game.paused = true;

        this.game.input.onDown.add(
            function () {
                this.game.paused = false;
                this.pauseMenu.destroy();
            }
        ,this);

    }


    this.init();
    return this;
    

};


pauseMenu.prototype = {

    show: function() {

        this.pauseButton = this.game.add.sprite(this.game.world.width - 100 , 50 , 'global_pause_button');
        this.pauseButton.anchor.setTo(0.5 , 0.5);
        this.pauseButton.scale.setTo(0.1,0.1);
        this.pauseButton.inputEnabled = true;

        this.pauseButton.visible = true;


        // Click handler
        this.pauseButton.events.onInputDown.add(function() {
            this.showPauseMenu();
        }, this);


    }

};