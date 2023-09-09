const strategySlider = document.querySelector('.js_strategy_slider');

if (strategySlider) {
    new Swiper(strategySlider, {
        speed: 200,
        freeMode: {
            enabled: false,
        },
        mousewheel: {
            sensitivity: 3,
        },
        slidesPerView: 'auto',
        breakpoints: {
            768: {
                freeMode: {
                    enabled: true,
                },
            }
        }
    });
}