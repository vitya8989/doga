const missionTextSlider = document.querySelector('.js_mission_text_slider');
const missionImgSlider = document.querySelector('.js_mission_img_slider');

if (missionTextSlider && missionImgSlider) {
    const missionTextSliderInstance = new Swiper(missionTextSlider, {
        speed: 400,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.about_mission__left_slider_pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass, index, total) {
                return '<span class="' + currentClass + '"></span>' +
                    '/' +
                    '<span class="' + totalClass + '"></span>';
            },
            formatFractionCurrent: addZero,
            formatFractionTotal: addZero
        },
        navigation: {
            nextEl: '.about_mission__left_slider_next',
            prevEl: '.about_mission__left_slider_prev',
        },
    });
    function addZero(num){
        return (num > 9) ? num : '0' + num;
    }

    const missionImgSliderInstance = new Swiper(missionImgSlider, {
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
    });

    missionImgSliderInstance.controller.control = missionTextSliderInstance;
    missionTextSliderInstance.controller.control = missionImgSliderInstance;
}