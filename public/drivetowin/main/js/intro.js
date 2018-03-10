var intro = function (game) {
    this.preload = function () {
        game.load.image('IntroMessage', 'assets/intromessage.png');
    }
    //var rect;
    this.create = function () {

        game.stage.backgroundColor = "#000";

        var intro = game.add.sprite(0, 0, 'IntroMessage');

        intro.inputEnabled = true;

        intro.input.useHandCursor = true;

        intro.events.onInputDown.add(function (s, pointer) {           

            if (game.shopHondaLinkClicked(pointer.x, pointer.y)) return false;
            
            // Tracking
            //dataLayer.push({'event': 'btn_game_letsgo'});


            game.state.start("CutScene", true, false, "Vid1", "Game1");

        }, this);

    }

}