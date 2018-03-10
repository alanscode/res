var timer = function(game) {

    this.game = game;    


    this.time = 0;
    this.running = false;
    this.visible = false;
    
    this.timerInterval = null;

    this.text = null



    this.init = function() {

        this.timerInterval = setInterval(
            function() {

                if (this.game.paused) return;

                if (!this.running) return;


                this.time++;

                if (this.visible) {
                    this.text.setText(this.formatTime());
                }


            }.bind(this) , 1000
        );

    };


    
    this.formatTime = function() {

        var min = Math.floor(this.time / 60);
        if (min < 10) {
            min = '0' + min;
        }

        var sec = this.time % 60;
        if (sec < 10) {
            sec = '0' + sec;
        }

        return min + ':' + sec;


    };


    this.init();
    return this;



    
};





timer.prototype = {


    start: function() {

        var style = { font: "bold 40px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = this.game.add.text(0, 0, this.formatTime(), style);

        this.running = true;
        this.visible = true;

    },

    pause: function() {

        this.running = false;

    },

    stop: function() {

        this.running = false;
        this.visible = false;

    },

    resume: function() {

        var style = { font: "bold 40px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = this.game.add.text(0, 0, this.formatTime(), style);

        this.running = true;
        this.visible = true;

    }
    
};