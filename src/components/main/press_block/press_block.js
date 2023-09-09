const pressBlockSlider = document.querySelector('.js_press_block_slider');

if (pressBlockSlider) {
    new Swiper(pressBlockSlider, {
        speed: 400,
        slidesPerView: 'auto',
        spaceBetween: 19,
        navigation: {
            nextEl: `.press_block__slider_next`,
            prevEl: `.press_block__slider_prev`,
        },
        breakpoints: {
            1024: {
                spaceBetween: 46,
            }
        }
    });
}