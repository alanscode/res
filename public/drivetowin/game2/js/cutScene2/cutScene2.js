var cutScene2 = function(game) {

    this.game = game;
    


    this.complete = function() {

        video.stop();

        video.destroy();

        this.game.state.start("ParkingGame");

        //this.game.level.setLevel(2);




    }

};


cutScene2.prototype = {

    create: function() {

        this.game.timer.pause();

        video = this.game.add.video('cut_scene_2');

        video.play(true);

        video.addToWorld(this.game.world.centerX , this.game.world.centerY , 0.5 , 0.5 , this.game.world.width / video.width , this.game.world.width / video.width);

    },

    update: function() {
        
        this.game.input.onDown.add(function() {
            this.game.input.onDown.removeAll();
            this.complete();
        }, this);
         //if (this.game.input.onDown) {
//          this.complete();
        //}


    },

    render: function() {

    },

    play: function() {

 
    
    }


};