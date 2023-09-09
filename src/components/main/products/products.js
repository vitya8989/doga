const products = document.querySelector('.js_products');

if (products) {
    const productsSlider = products.querySelector('.js_products_slider');

    const productsSliderInstance = new Swiper(productsSlider, {
        speed: 800,
        slidesPerView: 1,
        effect: 'fade',
        autoHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.products__slider_pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' +
                    '/' +
                    '<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: `.products__slider_next`,
            prevEl: `.products__slider_prev`,
        },
        breakpoints: {
            768: {
                autoHeight: false,
            }
        }
    });

    if (window.innerWidth < 768) {
        productsSliderInstance.updateAutoHeight();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            productsSliderInstance.updateAutoHeight();
        }
    });

    const productsBgImgSlider = products.querySelector('.js_products_bg_img_slider');

    const productsBgImgSliderInstance = new Swiper(productsBgImgSlider, {
        speed: 800,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
    });

    productsSliderInstance.controller.control = productsBgImgSliderInstance;

    productsSecondSliders = products.querySelectorAll('.js_products_second_slider');
    productsSecondBgImgSliders = products.querySelectorAll('.js_products_second_bg_img_slider');

    productsSecondSliders.forEach((secondSlider) => {
        const secondSliderPrev = secondSlider.querySelector('.products_second_slider__prev');
        const secondSliderNext = secondSlider.querySelector('.products_second_slider__next');
        const secondSliderPagination = secondSlider.querySelector('.products_second_slider__pagination');
        const secondSliderInstance = new Swiper(secondSlider, {
            speed: 400,
            slidesPerView: 1,
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true,
            },
            pagination: {
                el: secondSliderPagination,
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' +
                        '/' +
                        '<span class="' + totalClass + '"></span>';
                }
            },
            navigation: {
                nextEl: secondSliderNext,
                prevEl: secondSliderPrev,
            },
        });
        secondSliderInstance.updateAutoHeight();

        secondSliderInstance.on('beforeTransitionStart', function () {
            setTimeout(() => {
                productsSliderInstance.updateAutoHeight();
            }, 50);
            setTimeout(() => {
                productsSliderInstance.updateAutoHeight();
            }, 400);
        });


        window.addEventListener('resize', () => {
            secondSliderInstance.updateAutoHeight();
        });

        productsSecondBgImgSliders.forEach((secondImgSlider) => {
            if (secondImgSlider.dataset.id === secondSlider.dataset.id) {
                const secondImgSliderInstance = new Swiper(secondImgSlider, {
                    speed: 200,
                    slidesPerView: 1,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true,
                    },
                });

                secondSliderInstance.controller.control = secondImgSliderInstance;
            }
        });
    });
}