<head>
    <meta property="og:title" content="Honda Drive to Win" />
    <meta property="og:site_name" content="Honda Drive to Win" />
    <meta property="og:url" content="http://HondaDrivetoWin.com" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="I just played The Drive to Win. Think you can top my score? Play now at HondaDriveToWin.com." />
    <meta property="og:image" content="http://hondadrivetowin/web/images/shareimage.jpg" />


    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width,user-scalable=no" />

    <title>Honda Classic</title>

    <script src="web/js/jqueryDeps.min.js"></script>   
    <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/bd9dd571-8713-419f-95aa-b166a2102e5c.css" />
    <link href="web/mobile/css/mobile-website.css" rel="stylesheet" />
    <link href="web/css/game.css" rel="stylesheet" />
    <script src="web/js/jquery.placeholder.min.js"></script>
    <script type="text/javascript" src="web/js/website.js"></script>
    <script>var isMobile = true; </script>

</head>
<body>


    <!-- Google Tag Manager -->
    <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-TRMWZ5"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-TRMWZ5');</script>
    <!-- End Google Tag Manager -->
    <!--website-->
    <div id="webcontainer" class="main-Container" style="width: 100%; overflow: hidden; display:block;">
        <div id="panelsI">


            <div id="panel1" class="panel" style="">

                <div class="form-title joystixP" id="form-copy" style=""><img src="web/images/form-title-message.png" width="100%" />
                    <div onclick="fullScreen('#foundation', 1, 1);" style=" position: absolute; height: 20%; width: 37%; bottom: 52%; left: 30%; cursor: pointer; "></div>
                    <div onclick="slideToPrize();" style="position: absolute; height: 20%; width: 6%; bottom: 27%; left: 90%; cursor: pointer;"></div>
                </div>
                <div class="form-title joystixP" id="form-copy-thankyou" style="display:none;"><img src="web/images/form-thanks.png" width="100%" />
                 <div onclick="fullScreen('#foundation', 1, 1);" style=" position: absolute; height: 20%; width: 37%; bottom: 52%; left: 11%; cursor: pointer; "></div>
                    <div onclick="slideRight();" style="position: absolute; height: 20%; width: 15%; bottom: 27%; left: 46%; cursor: pointer;"></div>
                </div>
                <div class="form-title joystixP" id="form-copy-registerednotplayed" style="display:none;"><img src="web/images/form-thanks.png" width="100%" /></div>
                <div class="form-title joystixP" id="form-copy-sorry" style="display:none;"><img src="web/images/form-thanks-alreadyentered.png" width="100%" /></div>


                <div class="thank-you joystixP" style="display: none; position: absolute; top: 45%;left: 0;right: 0;margin: auto;width: 50%;"><img src="web/images/thanks.png" style=" width: 100%; "/></div>

                <div class="form-wrapper">

                    <form id="gameform">
                        <div id="firstname">
                            <input name="firstname1" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="First name">
                        </div>
                        <div id="lastname">
                            <input name="lastname" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="Last name">
                        </div>
                        <div id="email">
                            <input name="email" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="Email">
                        </div>
                        <div id="phone">
                            <input name="phone" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="Phone number">
                        </div>
                        <div id="street">
                            <input name="street" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="Street address">
                        </div>
                        <div id="apt">
                            <input name="apt" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="apt/suite">
                        </div>
                        <div id="city">
                            <input name="city" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="City">
                        </div>
                        <div id="state">
                            <input name="state" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="State" maxlength="2">
                        </div>
                        <div id="zip">
                            <input name="zip" type="text" class="joystixP" value="" size="8" tabindex="1" placeholder="Zip code">
                        </div>
                        <div id="rules">
                            <div class="check-box">
                                <input type="checkbox" name="input-rules" value="valuable" id="input-rules">
                                <label class="customLabel" for="input-rules"></label>
                            </div>
                            <div class="privacy-top" style=" position: absolute; left: 6%; width: 75%; "><img src="web/mobile/images/rules.png" style="width:100%;" /></div>
                            <div style="position: absolute; width: 17%; height: 5%; left: 41%;"><a style="position: relative; display: block; height: 100%; width: 100%;" href="web/rules/HondaClassic_OfficialRules.pdf" target="_blank"></a></div>
                            <div style="position: absolute; width: 17%; height: 5%; left: 63%;"><a style="position: relative; display: block; height: 100%; width: 100%;" href="http://automobiles.honda.com/information/consumer-privacy-policy.aspx" target="_blank"></a></div>
                            <!--<p class="joystixP"><label for="input-rules">i have read and agree to the <u><a href="#">official rules</a></u> and <u><a href="http://automobiles.honda.com/information/consumer-privacy-policy.aspx" target="_blank">privacy policy</a></u>.</label></p>-->
                        </div>
                        <div id="emails">
                            <div class="check-box">
                                <input type="checkbox" name="optin" value="valuable" id="input-emails">
                                <label class="customLabel" for="input-emails"></label>
                            </div>
                            <div class="privacy-bttm" style=" position: absolute; left: 6%; width: 75%; "><img src="web/mobile/images/yes.png" style="width:100%;" /></div>
                            <!--<p class="joystixP"><label for="input-emails">yes, i’d like to receive emails from honda about new models, special promotions and site features.</label></p>-->
                        </div>
                        <div class="buttons" style="margin-top: 3%; float: none !important;">
                            <img src="web/images/submit.png" class="submit" style=" width: 100%; "/><img src="web/images/maximum.png" class="" style=" width: 80%; margin-top: 2px; "/>
                        </div>

                    </form>

                </div>
                <div style="position: absolute; right: 0;  width: 23%; height: 14%; bottom: 20%; "><div onclick="slideRight();" style="width: 100%; height: 100%; display: block;" class="joystixP signs"></div></div>
                <div style="width: 8%; position: absolute; bottom: 2%; height: 3%; right: 47%; cursor:pointer;" onclick="fullScreen('#legal-popup', 1, 1);"></div>
                <div style="width: 8%; position: absolute; bottom: 2%; height: 3%; right: 24%;"><a style="position: relative; display: block; height: 100%; width: 100%;" href="http://www.shophonda.com/" target="_blank"></a></div>

            </div>
            <div id="panel2" class="panel" style="">

                <div style="position:absolute; left: 0; bottom: 18%; width: 33%; height: 13%; "><div onclick="slideLeft(); gifmaker('web/images');" style="width: 100%; height: 100%; display: block;" class="joystixP signs"></div></div>
                <div style="position: absolute; left: 42%; bottom: 77px; width: 14%; height: 30%; cursor: pointer;"><div onclick="startGame();" style="width: 100%; height: 100%; display: block;"></div></div>
                <div style="position: absolute; right: 0; bottom: 20%; width: 33%; height: 12%;"><div onclick="slideRight();" style="width: 100%; height: 100%; display: block;" class="joystixP signs"></div></div>
                <div style="width: 8%; position: absolute; bottom: 2%; height: 3%; right: 25%;"><a style="position: relative; display: block; height: 100%; width: 100%;" href="http://www.shophonda.com/" target="_blank"></a></div>
                <div id="gameArea" style="width: 100%; font-family: joystix; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%;">

                    <div id="gameCanvasWrapper"></div>
                </div>
                <div class="copyright"><a href="http://automobiles.honda.com/information/consumer-privacy-policy.aspx" target="_blank"><div class="privacy"></div></a><a href="http://automobiles.honda.com/information/legal-terms.aspx" target="_blank"><div class="terms"></div></a></div>
                <div style=" width: 8%; position: absolute; bottom: 2%; height: 3%; right: 47%; cursor:pointer;" onclick="fullScreen('#legal-popup', 1, 1);"></div>
            </div>
            <div id="panel3" class="panel" style="">
                <div style="position: absolute; left: 0; bottom: 20%; width: 20%; height: 16%;"><div onclick="slideLeft();" style="width: 100%; height: 100%; display: block;" class="joystixP signs"></div></div>
                <div class="click-here" onclick="slideToForm()"></div>
                <div style=" width: 6%; position: absolute; bottom: 2%; height: 3%; right: 14%;"><a style="position: relative; display: block; height: 100%; width: 100%;" href="http://www.shophonda.com/" target="_blank"></a></div>
                <div style="width: 8%; position: absolute; bottom: 2%; height: 3%; right: 37%; cursor:pointer;" onclick="fullScreen('#legal-popup', 1, 1);"></div>
            </div>
            <div class="clouds">
                <img class="cloud cloud1" style='top: 10%; left:-1%' data-top="10" data-duration='190000' src="web/images/cloud1.png" />
                <img class="cloud cloud2" style='top: 15%; left:28%' data-top="15" data-duration='190000' src="web/images/cloud2.png" />
                <img class="cloud cloud3" style='top: 05%; left:90%' data-top="5" data-duration='190000' src="web/images/cloud3.png" />
                <img class="cloud cloud4" style='top: 20%; left:57%' data-top="20" data-duration='190000' src="web/images/cloud4.png" />
            </div>
            <div class="duck"> <img src="web/images/duck.gif" /> </div>
            <div class="gopher"><img src="" /> </div>

        </div>
        <div class="lightbox" id="foundation" style="">
            <div><img src="web/images/charity_popup.png" style="width:450px; " /></div>
        </div>
        <div class="lightbox" id="legal-popup" style="">
            <div>
                <img src="web/mobile/images/mobile-legal-popup.png" style="width:450px; " />
            <div class='rule-policy' style="position: absolute; height: 8%;/* left: 20%; */ width: 450px; margin-top: -60px;margin: -60px auto;left: 0;right: 0;"><a style="position: relative; display: block; height: 100%; width: 100%;" href="web/rules/HondaClassic_OfficialRules.pdf" target="_blank"></a></div>
            </div>
        </div>

    </div>

    <!--game-->
    <div id="gamecontainer" class="game-Container">
        <div id="pausemenu">
            <img id="sounds" src="assets/unmuted.png" />
            <img id="pauseimg" src="assets/pausemenu1.png" />
            <div id="resumex"></div>
            <div id="resume"></div>
            <div id="quit"></div>
        </div>
    </div>

    <!--leaderboard-->
    <div id="leadercontainer" class="leaderboard-main-Container" style="width: 100%; overflow: hidden; display:none;">
        <div id="lb-panel" class="panel" style="">
            <div id="inner-container" style="">
                <div class="top5">
                    <div class="title">
                        <!-- lb1 -->
                        <p class="joystixP" id="form-already-filled" style="display:none;">Congrats! You’ve completed the game!<br />Enter your initials below to see how your time stacks up!</p>

                    </div>
                    <div class="leaderboard joystixP">
                        <table style="display:none;">
                            <tr class="score-row-template">
                                <td>
                                    <div class="row rank"></div>
                                </td>
                                <td>
                                    <div class="row time"></div>
                                </td>
                                <td>
                                    <div class="row initials"></div>
                                </td>
                            </tr>

                            <tr class="score-form-template">
                                <td>
                                    <div class="row rank"></div>
                                </td>
                                <td>
                                    <div class="row time"></div>
                                </td>
                                <td>
                                    <div class="row text-name-container">
                                        <span class="initials"></span>
                                        <form name="leaderboard">
                                            <div class="text-name">
                                                <input class="joystixP" autocomplete="off" type="text" name="first" maxlength="1" onkeyup=" autotab(null, this, document.leaderboard.second);" />
                                            </div>
                                            <div class="text-name">
                                                <input class="joystixP" autocomplete="off" type="text" name="second" maxlength="1" onkeyup="autotab(document.leaderboard.first, this, document.leaderboard.third);" />
                                            </div>
                                            <div class="text-name">
                                                <input class="joystixP" autocomplete="off" type="text" name="third" maxlength="1" onkeyup="autotab(document.leaderboard.second, this, null);" />
                                            </div>
                                        </form>
                                    </div>
                                </td>
                            </tr>

                        </table>
                        <table id="topscores" style="width: 100%;"></table>

                    </div>


                </div>
                <div class="close" onclick="quitGame();"></div>
                <div class="play" onclick="startGame();"></div>

                <!--shopping-->
                <div class="build" onclick="window.open('http://automobiles.honda.com/tools/build-price'); dataLayer.push({'event': 'btn_leaderboard_build'});" style="position: relative; width: 16%; bottom: -14%; height: 8%; left: 3%; cursor: pointer;"></div>
                <div class="dealer" onclick="window.open('http://automobiles.honda.com/tools/dealer-locator'); dataLayer.push({'event': 'btn_leaderboard_dealer'});" style=" position: relative; width: 16%; bottom: -6%; height: 8%; left: 21%; cursor: pointer; "></div>
                <div class="shop" onclick="window.open('http://shop.honda.com'); dataLayer.push({'event': 'btn_leaderboard_shophonda'});" style=" position: relative; width: 16%; bottom: 2%; height: 8%; left: 39%; cursor: pointer; "></div>

                <!--social-->
                <div class="fb" style="position: relative; width: 5%; height: 8%; left: 74.5%; bottom: 10%; cursor:pointer;"><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.HondaDrivetoWin.com" target="_blank" style="display: block; width: 100%; height: 100%;" onclick="dataLayer.push({'event': 'btn_leaderboard_facebook'});"></a></div>
                <div class="tw" onclick="Twitter();" style="position: relative; width: 5%; height: 8%; left: 83%; bottom: 18%; cursor:pointer;"></div>
                <div class="email" style="position: relative; width: 5%; height: 8%; left: 91%; bottom: 26%; cursor:pointer;"><a href="mailto:?subject=Hey!&body=I just played The Drive to Win. Think you can top my score? Play now at HondaDriveToWin.com." style="display: block; width: 100%; height: 100%;" onclick="dataLayer.push({'event': 'btn_leaderboard_email'});"></a></div>
            </div>


        </div>
    </div>

    <!--orientation-->
    <div class="orientation">
        <div><img src="web/images/turn_phone.png" /></div>
    </div>
  
  <script src="js/lib/phaserDeps.js"></script>
  <script src="js/game.min.js"></script>
  <script src="js/game1/game1.js"></script>
  <script src="js/game2/game2.js"></script>
    <script src="js/game2/ball.js"></script>
    <script src="js/game2/controls.js"></script>
    <script src="js/game2/launcher.js"></script>
    <script src="js/game2/paddle.js"></script>
  <script src="js/game3/game3.js"></script>
    <script>
        (function () {
            window.game = new Phaser.Game(1920, 1080, Phaser.CANVAS, "game");

            game.state.add("Boot", boot);
            game.state.add("Preload", preload);
            game.state.add("Intro", intro);
            game.state.add("Game1", game1);
            game.state.add("Game2", game2);
            game.state.add("Game3", game3);
            game.state.add("CutScene", cutscene);

        })();
    </script>
