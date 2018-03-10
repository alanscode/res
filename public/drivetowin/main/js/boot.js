
var boot = function (main) {

    this.preload = function () {

        main.load.image('loading', 'assets/loading.png');
    }

    this.create = function () {

        main.scale.pageAlignHorizontally = true;

        main.scale.pageAlignVertically = true;

        main.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        main.scale.updateLayout();        
        
        main.createPauseButton = function (gamenum) {

            pause = main.add.sprite(main.width - 110, 40, 'PauseButton');

            pause.inputEnabled = true;

            pause.fixedToCamera = true;

            pause.input.useHandCursor = true;

            pause.scale.set(.7);

            var $pauseimg = $('#pauseimg').attr('src', 'assets/pausemenu' + gamenum + '.png');

            isIE = detectIE();

            pause.events.onInputDown.add(function () {

                setPauseMenu();

                pause.alpha = 0;

                pause.inputEnabled = false;

                main.paused = true;

                $('#pausemenu').show();

                if (isIE) {

                    var canvasMarginTop = $('canvas').css('margin-top');

                    $('#pausemenu').css('margin-top', canvasMarginTop);
                }

                main.pauseGameTimer();
            });

            $('#resume').on('click', resumeClicked);

            $('#resumex').on('click', resumeClicked);

            $('#quit').on('click', quitGame);            

            main.Muted = false;

            var $sounds = $('#sounds');

            $sounds.on('click', function () {

                if (main.Muted) {

                    sounds.src = 'assets/unmuted.png';

                }
                else {

                    sounds.src = 'assets/muted.png';

                }

                main.Muted = !main.Muted;

            });

            function resumeClicked() {

                main.paused = false;

                $('#pausemenu').hide();

                main.gameTimerText.text = "";

                setTimeout(function () {

                    pause.inputEnabled = true;

                    pause.alpha = 1;

                }, 1000);

                main.startGameTimer();

                main.sound.mute = main.Muted;

            }

            var $shoplink = $('#shopLink');

            $shoplink.unbind();

            $shoplink.on('click', function () {

                window.open('http://www.shophonda.com');

            });
        }

        main.startGameTimer = function () {
            
            if (!main.gameTimer)
                main.gameTime = "00:00";
                       
            main.gameTimerText = main.add.text(32, 32, "Elapsed Time " + main.gameTime, { font: "32px Joystix W00 Monospace", fill: "black", align: "center" });

            main.gameTimerText.fixedToCamera = true;            

            setTimeout(update, 1000);

            function update() {

                clearTimeout(main.gameTimer);

                var myTime = main.gameTime;

                var ss = myTime.split(":");

                var dt = new Date();

                dt.setHours(0);

                dt.setMinutes(ss[0]);

                dt.setSeconds(ss[1]);

                var dt2 = new Date(dt.valueOf() + 1000);

                var temp = dt2.toTimeString().split(" ");

                var ts = temp[0].split(":");

                main.gameTime = ts[1] + ":" + ts[2];

                main.gameTimerText.text = "Elapsed Time " + main.gameTime;

                main.gameTimer = setTimeout(update, 1000);
            }
        }

        main.pauseGameTimer = function () {
                        
            clearTimeout(main.gameTimer);
        }

        var shopHondaLink = null;

        main.shopHondaLinkClicked = function (x, y) {
            
            if(shopHondaLink == null)
                shopHondaLink = new Phaser.Rectangle(1600, 970, 240, 150);

            if (shopHondaLink.contains(x, y)) {

                window.open('http://www.shophonda.com');           

                return true;
            }

            return false;
        }

        main.state.start("Preload");
    }
};