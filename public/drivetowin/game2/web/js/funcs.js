$(document).ready(function() {

	$('#panelsI').height( $(window).height() );

});

function slideRight() {

	var ml = $('#panelsI').css('margin-left');
	ml = parseInt(ml.replace('px' , ''));
	$('#panelsI').animate({'margin-left' : ml + -1 * $(window).width() + 'px'});

}


function slideLeft() {

	var ml = $('#panelsI').css('margin-left');
	ml = parseInt(ml.replace('px' , ''));
	$('#panelsI').animate({'margin-left' : ml + $(window).width() + 'px'});

}


function startGame() {

	$('#gameArea').show();
	var mg = new mainGame();
	mg.start();

}


function closeGame() {

	$('#gameArea').hide();

}