var cutscene = function (game) {

    this.preload = function () {

    }

    this.init = function (videoname, nextstate) {

        var isMobile = game.device.iOS || game.device.android;

        // For all devices
        if (!isMobile) {

            video = game.add.video(videoname);

            video.touchLocked = false;

            video.play(false);

            video.addToWorld(0, 0);

            var skipbutton = game.add.sprite(1750, 900, 'SkipButton');

            skipbutton.inputEnabled = true;

            skipbutton.input.useHandCursor = true;

            skipbutton.events.onInputDown.add(function () {

                //if (isMobile) {

                //    document.getElementById('mobileVideo').pause();
                //    document.getElementById('mobileVideo').webkitExitFullScreen();
                //    $('#mobileVideo').remove();

                //} else {

                video.stop();

                //}


                moveToNextState();

            }, this);


            video.onComplete.add(function () {

                video.stop();

                moveToNextState();

            }, this);

        } else {



          $('body').append('<img id="m_animation" src="' + game.cache.getImage(videoname).src + '?r=' + Math.random() + '"  style="position: absolute; left: 0; top: 0; width: 100%; height: auto; border: 0;" />');

          // Center image vertically
          var imageHeight = ((1080 * $(window).width()) / 1920);    // Get image height from ratio
          $('#m_animation').css('top' , ($(window).height() - imageHeight) / 2 + 'px' );


          var numSeconds = 0;
          switch (videoname) {
            case 'Vid1':
              numSeconds = 18;
              break;
            case 'Vid2':
              numSeconds = 10;
              break;
            case 'Vid3':
              numSeconds = 14;
              break;
            case 'Vid4':
              numSeconds = 19;
              break;
          }

          var bgSound = game.add.audio('video_sound');
          //game.sound.setDecodedCallback([ bgSound ], function() { alert('loaded');}, this);
          bgSound.play();


          $('#m_animation').on('click' , function() {

            $(this).remove();

            bgSound.destroy();

            moveToNextState();

          });

          var mobileCutsceneTimer = setTimeout(function() {

            $('#m_animation').remove();

            bgSound.destroy();

            moveToNextState()

          } , numSeconds * 1000);

        }


        function moveToNextState() {

            // Clear animated .gif timeout
            clearTimeout(mobileCutsceneTimer);

            if (nextstate) {
                game.state.start(nextstate);
            }
            else {
                showLeaderboard();
            }
        }

    }

}
