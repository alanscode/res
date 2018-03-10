game2.controls = function(game){


    // Game instance
    this.game = game;






    this.lastMouseYPos = '';
    this.game.input.addMoveCallback(

        function(pointer, x , y , state , objectCategory) {
            this.game.game2.Customobjects.controls.mouseMoved(x , y , state);
        }.bind(this)

    );














    return this;



};





game2.controls.prototype = {


    update: function() {


        switch (this.game.gameState) {

            case this.game.gameStates.LAUNCH:

                // Spacebar press
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.game2.Customobjects.launcher.launch();
                }

                // Mouse click
                if (this.game.input.activePointer.leftButton.isDown) {
                    this.game.game2.Customobjects.launcher.launch();
                }

                // Mobile touch
                if (this.game.input.pointer1.isDown) {
                    this.game.game2.Customobjects.launcher.launch();
                }

                break;




            case this.game.gameStates.INPLAY:

                // Keyboard up = Paddle Up
                if (this.game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown) {
                    this.game.game2.Customobjects.paddle.paddleUp();
                }

                // Keyboard down = Paddle Down
                if (this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown) {
                    this.game.game2.Customobjects.paddle.paddleDown();
                }


                break;




        }







    },


    render: function() {

    },



    sprite: this.sprite,



    mouseMoved: function(x , y , state) {

        if (this.game.gameState != this.game.gameStates.INPLAY) {
            return;
        }

        if (this.lastMouseYPos == '') {
            this.lastMouseYPos = y;
        } else {
            var diff = y - this.lastMouseYPos;
            this.game.game2.Customobjects.paddle.movePaddleByNum(diff);
            this.lastMouseYPos = y;
        }




    }







};
