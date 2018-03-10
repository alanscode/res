var preload = function (game) {
    this.preload = function () {

        var loadingBar = this.add.sprite(game.world.centerX-400, game.world.centerY, "loading");

        this.load.setPreloadSprite(loadingBar);

        var loadingTxt = game.add.text(game.world.centerX, game.world.centerY - 100, 'Loading', { font: "80px Joystix W00 Monospace", fill: "white", align: "center" });
        loadingTxt.anchor.set(.5);

        if (game.device.iOS || game.device.android) {
          game.load.image('Vid1', 'assets/cutscene1.gif');
          game.load.image('Vid2', 'assets/cutscene2.gif');
          game.load.image('Vid3', 'assets/cutscene3.gif');
          game.load.image('Vid4', 'assets/cutscene4.gif');
          game.load.audio('video_sound', 'assets/cutscene.mp3');
        } else {
          game.load.video('Vid1', 'assets/CutScene1.mp4');
          game.load.video('Vid2', 'assets/CutScene2.mp4');
          game.load.video('Vid3', 'assets/CutScene3.mp4');
          game.load.video('Vid4', 'assets/CutScene4.mp4');
        }


        game.load.image('IntroMessage', 'assets/intromessage.png');
        game.load.image('PauseButton', 'assets/pausebutton.png');
        game.load.image('SkipButton', 'assets/skipbutton.png');
        game.load.image('PlayVidButton', 'assets/playvidbutton.png');

    }

    this.create = function () {

        game.state.start("CutScene", true, false, "Vid1", "Game1");

    }
}
