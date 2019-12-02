//slick slider

$(function () {
    $('.js-slider').slick({
        infinite: true,
        slidesToShow: 1,
        // autoplay: false,
        // autoplaySpeed: 30000,
        // speed: 600,
        cssEase: 'cubic-bezier(0.000, 0.840, 0.475, 0.985)',
        arrows: true,
    });
});