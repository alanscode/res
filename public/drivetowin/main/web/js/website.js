var bg_r = 1360 * 3 / 830;
var page_r = 1360 / 830;
var current = 1;

// Used to send ajax requests to https
var handlerHost = '';
try {
  if (   (document.location.host.toLowerCase()== 'hondadrivetowin.com') || (document.location.host.toLowerCase()== 'www.hondadrivetowin.com')   )  {
    if ("withCredentials" in new XMLHttpRequest()) {
      handlerHost = 'https://' + document.location.host + '/';
    }
  }
} catch (ex) {
}

$(document).ready(function () {

    $('.background').height($(window).height());

    //   $(window).on('resize', function () { setBgSize();  })

    if (!isMobile) {
        $(window).on('resize', function () {
            setBgSize();
            checkOrientation();
            setPauseMenu();
        });
    } else{
     setTimeout(function () {
        $('canvas').css('display', 'none');
     }, 500);
    };

    window.addEventListener("orientationchange", function () {
        checkOrientation();
		setTimeout(function(){
			setBgSize();
		},500);
    }, false);

    $('#panelsI').width($(window).width() * 3);
    $('#panelsI').height($('#panelsI').width() / bg_r);
    setBgSize();
    checkOrientation();
    setPauseMenu();
    animateClouds();

    //placeholder fix for IE9
    $('input').placeholder();


    //lightbox close
    $('.lightbox').click(function () {
        $('.lightbox').fadeOut();
    });



});


//jquery extension
$.fn.restrict = function (pattern, allowed) {
    // default to allow backspace, delete, tab, escape, enter
    allowed = allowed || [0, 46, 8, 9, 27, 13];
    $(this).keypress(function (event) {
        if (event.which) {
            var key = event.which;
            if ($.inArray(key, allowed) > -1) {
                return true;
            }
            var character = String.fromCharCode(key);
            if (pattern.test(character)) {
                return true;
            }
            event.preventDefault();
            return false;
        };
    });
    return this;
};

//Auto Tab

function autotab(previous, original, destination) {

    if (destination != null && original.getAttribute && original.value.length == original.getAttribute("maxlength")) {
        destination.focus();
    }

    if (original.value.length == 0 && previous != null) {
        $(previous).focus();
    }

}



function animateClouds() {
    function getRandom(min, max) {
        var r = Math.random() * (max - min) + min;
        return r;
    }


    var animateCloud = function ($e) {
        var duration;
        if ($e.data('duration')) {
            duration = $e.data('duration') * 1;
        }
        else {
            duration = getRandom(20, 50) * 1000;
            $e.data('duration', duration);
        }

        var left = Math.max(($e[0].style.left.replace('%', '')) * 1, 0);
        var relativeDuration = (100 - left) / 100 * duration;

        $e.animate(
            { 'left': '100%' },
            {
                'duration': relativeDuration,
                'easing': 'linear',
                'queue': false,
                'complete': function () {
                    $(this).css({ 'left': '-10%' });
                    animateCloud($e);
                }
            });
    };
    var shakeCloud = function ($e) {
        var top = ($e[0].style.top.replace('%', '') * 1) + getRandom(-1, 1);
        var initialTop = $e.data('top') * 1;
        top = Math.min(initialTop + 2, top);
        top = Math.max(initialTop - 2, top);

        $e.animate(
            { 'top': top + '%' },
            {
                'duration': 500,
                'easing': 'linear',
                'queue': false,
                'complete': function () {
                    shakeCloud($e);
                }
            });
    };
    $('.clouds .cloud').each(function () {
        animateCloud($(this));
        shakeCloud($(this));
    });
}
function setBgSize() {
    if ($(window).width() >= 480
        //&& $(window).width() < 1920)
    ) {
        $('#panelsI').width(Math.min($(window).width(), 1920) * 3);
        $('#panelsI').height($('#panelsI').width() / bg_r);
    }

    if ($('#panelsI').height() > $(window).height()) {
        $('#panelsI').height(Math.min(1100, $(window).height()));
        $('#panelsI').width($(window).height() * bg_r);
    }

    var mainContainerWidth = $('#panelsI').width() / 3;
    $('.main-Container').width(mainContainerWidth)
                        .css({ 'font-size': mainContainerWidth / 100 + 'px' });

    $('#panelsI').css('margin-left', -current * $('#panelsI').width() / 3);

    $('#panelsI').css('margin-top', Math.max(($(window).height() - $('#panel2').height()) / 2, 0));
    $('.main-Container').css('margin-left', Math.max(($(window).width() - $('#panel2').width()) / 2, 0));


}

function setPauseMenu() {
    setTimeout(function () { 
            var $myCan = $('canvas'),
            vpw = $myCan.width(),
            vph = $myCan.height();

            $('#pausemenu').css({ 'height': vph + 'px', 'width': vpw + 'px' });
    }, 200);
};

function checkOrientation() {

    if (window.orientation != '0') {
        $(".orientation").hide()
       // setBgSize();
    }
    else {
        $(".orientation").show()
      //  setBgSize();
    }

    //if (window.innerHeight > window.innerWidth) {
    //    $('.orientation').show();
    //} else {
    //    $('.orientation').hide();
    //}
}

//swipe events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* right swipe */
            if (current == 1 || current == 0) {
              //  slideRight();
            }

        } else {
            /* left swipe */
            if (current == 1 || current == 2) {
             //   slideLeft();
            }
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

$('body').on("swipeleft", function () {
    console.log("You swiped left!");
});
function slideRight() {

    
    //current++;
    //var ml = $('#panelsI').css('margin-left');
    //ml = parseInt(ml.replace('px', ''));
    //$('#panelsI').animate({ 'margin-left': ml + -1 * $('#panelsI').width() / 3 + 'px' });

    //if (current == 2) {

    //    // Tracking
    //    dataLayer.push({'event': 'btn_home_seeprizes'});

    //}

}
function slideToPrize() {
    //current = current + 2;
    //var ml = $('#panelsI').css('margin-left');
    //ml = parseInt(ml.replace('px', ''));
    //$('#panelsI').animate({ 'margin-left': ml + -2 * $('#panelsI').width() / 3 + 'px' });


    //// Tracking
    //dataLayer.push({'event': 'btn_home_seeprizes'});


}

function slideLeft() {
    //current--;
    //var ml = $('#panelsI').css('margin-left');
    //ml = parseInt(ml.replace('px', ''));
    //$('#panelsI').animate({ 'margin-left': ml + $('#panelsI').width() / 3 + 'px' });

    //// Tracking
    //if (current == 0) {
    //    var axel = Math.random() + "";
    //    var a = axel * 10000000000000;
    //    $('body').append('<iframe src="https://4114413.fls.doubleclick.net/activityi;src=4114413;type=honda751;cat=sweep0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

    //    // Tracking
    //    dataLayer.push({'event': 'btn_home_sweeps'});
    //}



}

function slideToForm() {
    //current = current - 2;
    //var ml = $('#panelsI').css('margin-left');
    //ml = parseInt(ml.replace('px', ''));
    //$('#panelsI').animate({ 'margin-left': ml + 2 * $('#panelsI').width() / 3 + 'px' });

    //// Tracking
    //if (current == 0) {
    //    var axel = Math.random() + "";
    //    var a = axel * 10000000000000;
    //    $('body').append('<iframe src="https://4114413.fls.doubleclick.net/activityi;src=4114413;type=honda751;cat=sweep0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

    //    // Tracking
    //    dataLayer.push({'event': 'btn_home_sweeps'});

    //}


}

function startGame() {
    $('canvas').css('display','block');
    $('.game-Container').show();
    $('.main-Container').hide();
    $('.leaderboard-main-Container').hide();

    game.gameTime = "00:00";
    game.paused = false;

    game.state.start("Boot");

    // Tracking
    //dataLayer.push({'event': 'btn_home_play'});

    return false;
}
function quitGame() {

    $('.main-Container').show();
    $('.game-Container').hide();
    $('#pausemenu').hide();
    $('.leaderboard-main-Container').hide();

    $('canvas').css('display', 'none');

    setBgSize();

    return false;
}

// gif
function gifmaker(url) {
    // wait 3sec
    setTimeout(function () {

        //play animation
        $('.gopher > img').attr('src', url + '/Gopher-noloop.gif');
        $('.gopher').show();
        //wait 3 sec and replace src
        setTimeout(function () {
            //src change
            $('.gopher > img').attr('src', url + '/Gopher-ear.gif');
        }, 3000);


    }, 2000);

}



if (window.addEventListener) {
    window.addEventListener('load', win_load);
} else if (window.attachEvent) {
    window.attachEvent('onload', win_load);
}

function win_load() {
    $(document).ready(function () {
        jQuery.validator.addMethod("accept", function (value, element, param) {
            return value.match(new RegExp("." + param + "$"));
        });
        // Validate Form
        $(function () {
            $('#gameform').validate({
                debug: true,
                highlight: function (element, errorClass) {

                    // inputs
                    if ($(element).is('input')) {
                        $(element).parent("div").css('border', 'red solid 2px')
                    };

                },
                unhighlight: function (element, errorClass) {
                    // inputs
                    if ($(element).is('input')) {
                        $(element).parent("div").css('border', '#fff solid 2px')
                    };

                },
                rules: {
                    firstname1: {
                        required: true
                    },
                    lastname: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    phone: "required",
                    street: "required",
                    city: "required",
                    state: {
                        required: true,
                        minlength: 2,
                        maxlength: 2,
                        accept: "[a-zA-Z]+"
                    },
                    zip: {
                        required: true,
                        number: true,
                        minlength: 5,
                        maxlength: 5
                    },
                    "input-rules": "required"

                },
                messages: {
                    firstname: {
                        required: "Enter your first name"
                    },
                    lastname: "Enter your last name",
                    phone: "Enter your address",
                    email: "Enter your address",
                    street: "Enter your address",
                    city: "Enter your city",
                    state: "Enter your city",
                    zip: {
                        required: "Enter your zip",
                        minlength: "Minmum 5",
                        maxlength: "Maximum 5",
                        number: "Numbers only"
                    },
                    "input-rules": ""

                },
                ignore: [],
                errorElement: 'div',
                submitHandler: function (form) {
                 //   submit();
                }
            });

            $('.submit').on('click', function () {
                $('#gameform').submit();
                if ($('#gameform').valid() == false) {
                    $('.submit').attr('src', 'web/images/submit-error.png');
                } else {
                    $('.submit').attr('src', 'web/images/submit.png');

                    // Tracking
                    var axel = Math.random() + "";
                    var a = axel * 10000000000000;
                    $('body').append('<iframe src="https://4114413.fls.doubleclick.net/activityi;src=4114413;type=honda751;cat=sweep00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');


                    // Tracking
                    //dataLayer.push({'event': 'btn_sweeps_submit'});


                }
            });
        });



    });
    function submit() {
        //Form submit

        $.ajax({
            method: "POST",
            url: handlerHost + "web/handlers/register.php",
            data: {
                FirstName: document.forms[0].firstname1.value,
                LastName: document.forms[0].lastname.value,
                Email: document.forms[0].email.value,
                HomePhone: document.forms[0].phone.value,
                Address1: document.forms[0].street.value,
                Address2: document.forms[0].apt.value,
                City: document.forms[0].city.value,
                State: document.forms[0].state.value,
                Zip: document.forms[0].zip.value,
                Optin: document.forms[0].optin.checked
            }
        }).done(function (response) {

            response = JSON.parse(response);

            if (response.status == 'success') {

                var userid = response.userid;

                setCookie('userid', userid);

                if (response.registeredtoday == 'true') {

                    if (response.bonusentry == 'true') {
                        //max entries
                        sorryAlreadyEntered(); //sf8
                    }
                    else {
                        //registered (play again for bonus entry)
                        registeredNotPlayed(); //sf5
                        callBonusEntry(userid);
                    }

                }
                else {
                    //not registered today
                    thanksNewEntry();
                    callBonusEntry(userid);
                }


            }
        }).fail(function (e) {
            console.log(e);
        });

        function callBonusEntry(id) {
            var alreadyPlayed = getCookie('alreadyplayed');

            if (alreadyPlayed == 'true') {
                $.ajax({
                    method: "POST",
                    url: handlerHost + "web/handlers/bonus_entry.php",
                    data: {
                        UserId: id
                    }
                })
                .done(function (response) {
                    //we done

                });
            }
        }

        function thanksNewEntry() {
            $('form-text, .form-wrapper').fadeOut();
            $('#form-copy').fadeOut();
            $('#form-copy-thankyou').fadeIn(600);

            $('.thank-you').show();
        }

        function registeredNotPlayed() {
            $('form-text, .form-wrapper').fadeOut();
            $('#form-copy').fadeOut();
            $('#form-copy-registerednotplayed').fadeIn(600);

            $('.thank-you').show();
        }

        function sorryAlreadyEntered() {
            $('.form-text, .form-wrapper').fadeOut();
            $('#form-copy').fadeOut();
            $('#form-copy-sorry').fadeIn(600);

            $('.thank-you').show();
        }
    }

};

var startedSubmission = false;

function showLeaderboard() {

    startedSubmission = false;

    window.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR)

    document.getElementById('gamecontainer').style.display = 'none';

    document.getElementById('leadercontainer').style.display = 'block';

    document.leaderboard.first.value = '';

    document.leaderboard.second.value = '';

    document.leaderboard.third.value = '';

    var useridcookie = getCookie('userid');

    $('#form-already-filled').show();

    $.ajax({

        method: "POST",
        url: handlerHost + "web/handlers/topscores.php",
        data: { 'TimeScore': game.gameTime }

    }).done(function (response) {

        $('#topscores .score-row-template').empty();

        $('.text-name-container .initials').html('');

        $('.text-name-container form').show();

        response = JSON.parse(response);

        function addForm() {

            var $form = $('.score-form-template:first').detach();

            $form.find('.rank').html(response.ranked + '.');

            $form.find('.time').html(response.timescore);

            $('#topscores').append($form);

        }

        if (response.status == 'success') {
            var $temp = $('.score-row-template:first').clone();

            var rank = 0;

            for (var i = 0; i < response.topscores.length; i++) {

                rank++;

                if (rank == response.ranked) {
                    addForm();
                    rank++;
                }

                var $row = $temp.clone();
                $row.find('.rank').html(rank + '.');
                $row.find('.time').html(response.topscores[i].score);
                $row.find('.initials').html(response.topscores[i].initial);

                $('#topscores').append($row);

            }

            if (response.ranked > response.topscores.length) {
                addForm();
            }
        }

        setTimeout(function () {
            $(document.leaderboard.first).focus();
        }, 0);

        $(document.leaderboard.third).on('keyup', submitScore);

        $(document.leaderboard.first).restrict(/[a-zA-Z]/);
        $(document.leaderboard.second).restrict(/[a-zA-Z]/);
        $(document.leaderboard.third).restrict(/[a-zA-Z]/);

    });


}


function submitScore() {

    var submitter = setTimeout(function () {

        if (!startedSubmission && document.leaderboard) {

            var initials = document.leaderboard.first.value + document.leaderboard.second.value + document.leaderboard.third.value;

            if (initials.length == 3) {

                startedSubmission = true;

                var userid = getCookie('userid');

                $.ajax({
                    method: "POST",
                    url: handlerHost + "web/handlers/scoresubmit.php",
                    data: {
                        'UserId': userid,
                        'Initials': initials,
                        'TimeScore': game.gameTime
                    },
                    complete: function () {

                        // Tracking
                        var axel = Math.random() + "";
                        var a = axel * 10000000000000;
                        $('body').append('<iframe src="https://4114413.fls.doubleclick.net/activityi;src=4114413;type=honda751;cat=video0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

                    }
                }).done(function (response) {

                    // Tracking
                    //dataLayer.push({ 'event': 'btn_leaderboard_initialsentered' });

                    $('.text-name-container form').hide();

                    $('.text-name-container .initials').html(initials);

                });
            }

        }
        else {
            clearTimeout(submitter);
        }

    }, 3000);

}

function fullScreen(el, type /*1 OR 2*/, device /*1 MOBILE - 2 DESKTOP*/) {
    // 1 center screen
    //2 full page ratio
    var $e = $(el);

    $e.css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: '100%',
        bottom: '100%',
        width: '100%',
        height: '100%',
        'z-index': 99,
        display: 'block'

    });
    $e.fadeIn();


    function updateLightboxSize() {

        var img = $e.find('img');

        var ww = $(window).width(),
            wh = $(window).height();

        var iw = img.width();
        var ih = img.height();

        if (type == 1) {//center screen
            if (device == 1) {
                img.css({
                    'width': '450px'
                });
            }
            else {
                img.css({
                    'width': '737px'
                });
            }
        }
        else if (type == 2) {// full page ratio

            iw = $('#panel1').width();

            img.css({
                'width': iw + 'px',
                'height': ''
            });
        }

        //vertical center
        ih = img.height();
        if (wh > ih) {
            var $rules = $('.rule-policy');
            var top = (wh - ih) / 2;
            if (device == 1) {
                $rules.css({
             //   'margin-top': top + 'px'
                    'width': '450px'
            });
            }
            img.css({
                'margin-top': top + 'px'
            });
        }

    }

    $(window).on('resize', function () {
        updateLightboxSize();
    });

    updateLightboxSize();

}


//leaderboard
var l_bg_w = 1366,
    l_bg_h = 768;
var l_bg_r = l_bg_w / l_bg_h;



$(function () {

    $(window).on('resize', function () {
        resizeBg();
    });

    resizeBg();
});

// Twitter
function Twitter() {
    //if (text.length > 140) {
    //    //  console.log('Tweet should be less than 140 Chars');
    //}
    //  else {
    var twtLink = 'http://twitter.com/home?status=Play Drive to Win for a chance to win a trip the 2017 @Honda Classic. NoPurNec. Enter/Rules: www.HondaDrivetoWin.com';
    window.open(twtLink, '_blank');

    // Tracking
    //dataLayer.push({'event': 'btn_leaderboard_twitter'});
    // }
}

function resizeBg() {
    var ww = $(window).width(),
    wh = $(window).height();
    var w_r = ww / wh;
    var min_w = 480;

    var $panel = $('.leaderboard-main-Container #lb-panel');
    var $ic = $('.leaderboard-main-Container #inner-container');
    var ic_w = 0,
        ic_h = 0,
        ic_top = 0;

    if (ww < min_w || wh < (min_w / l_bg_r)) {
        //    console.log(1);
        //$panel.css('background-size', '480px auto');
        ic_w = min_w; ic_h = (min_w / l_bg_r);

    }
    else if (w_r < l_bg_r) { //image covering width
        //    console.log(2);
        //$panel.css('background-size', '100% auto');
        ic_w = ww; ic_h = (ww / l_bg_r);

    } else { //image covering height
        //    console.log(3);
        //$panel.css('background-size', 'auto 100%');
        ic_w = (wh * l_bg_r); ic_h = wh;

    }
    //else {

    //    $panel.css('background-size', 'auto');
    //    ic_w = '100%'; ic_h = '';

    //}


    if (ww < min_w) {
        $panel.css('background-position', '0 center');
        ic_top = (wh - ic_h) / 2;
    }
    else if (wh < (min_w / l_bg_r)) {
        $panel.css('background-position', 'center 0');
        ic_top = '';
    }
    else {
        $panel.css('background-position', 'center');
        ic_top = (wh - ic_h) / 2;
    }


    $ic.css({
        'width': ic_w + 'px',
        'height': ic_h + 'px',
        'margin-top': ic_top + 'px'
    });

    $('.leaderboard-main-Container').css({ 'font-size': ic_w / 100 + 'px' });
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + "; ";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
