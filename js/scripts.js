$(document).ready(function() {
    $('#mycarousel').carousel({ interval: 1000});
    $('#carouselButton').click(function() {
        if ($('#carouselButton').children('span').hasClass('fa-pause')) {
            $('#mycarousel').carousel('pause'); 
            $('#carouselButton').children('span').removeClass('fa-pause');
            $('#carouselButton').children('span').addClass('fa-play');
        } else {
            $('#mycarousel').carousel('cycle'); 
            $('#carouselButton').children('span').removeClass('fa-play');
            $('#carouselButton').children('span').addClass('fa-pause');                    
        }
    });
        
    $(window).on('load resize', windowSmall);
    $(window).on('load resize', windowLarge);
});

$('#reserveATableButton').click(function() {
    $('#reserveatablemodal').modal('show');
});

$('#loginButton').click(function() {
    $('#loginModal').modal('show');
});

$('#registerButton').click(function() {
    $('#registerModal').modal('show');
});

$('.close').click(function() {
    $('.modal').modal('hide');
});

function windowSmall() {
    if ($(window).width() < '580'){
        $('.registerForm').removeClass('offset-1');
        $('.registerForm').addClass('ml-3');
    }
}

function windowLarge() {
    if ($(window).width() > '580'){
        $('.registerForm').addClass('offset-1');
        $('.registerForm').removeClass('ml-3');
    }
}


