const uniqueSlider = document.querySelector('.js_unique_slider');
const uniqueTitleSlider = document.querySelector('.js_unique_title_slider');

if (uniqueSlider && uniqueTitleSlider) {
    const uniqueSliderInstance = new Swiper(uniqueSlider, {
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 16,
        autoHeight: true,
        pagination: {
            el: '.unique__slider_pagination',
            type: 'fraction'
        },
        navigation: {
            nextEl: `.unique__slider_next`,
            prevEl: `.unique__slider_prev`,
        },
    });

    const uniqueTitleSliderInstance = new Swiper(uniqueTitleSlider, {
        effect: 'fade',
        autoHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        slidesPerView: 1,
    });

    uniqueTitleSliderInstance.controller.control = uniqueSliderInstance;
    uniqueSliderInstance.controller.control = uniqueTitleSliderInstance;

    uniqueTitleSliderInstance.updateAutoHeight();
    uniqueSliderInstance.updateAutoHeight();

    window.addEventListener('resize', () => {
        uniqueTitleSliderInstance.updateAutoHeight();
        uniqueSliderInstance.updateAutoHeight();
    });
}