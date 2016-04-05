$(document).ready(function () {

    (function autoPlay() {
        setInterval(function () {
            moveRight();
        }, 5000);
    })();

    var slidesLi = $('#slider ul li');
    var slidesUl = $('#slider ul');

    var slideCount = slidesLi.length;
    var slideWidth = slidesLi.width();
    var slideHeight = slidesLi.height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider')
        .css({width: slideWidth, height: slideHeight});

    slidesUl
        .css({width: sliderUlWidth, marginLeft: -slideWidth});

    $('#slider ul li:last-child').prependTo(slidesUl);

    function moveLeft() {
        slidesUl.animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo(slidesUl);
            slidesUl.css('left', '');
        });
    }

    function moveRight() {
        slidesUl.animate({
            left: -slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo(slidesUl);
            slidesUl.css('left', '');
        });
    }

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });
});
