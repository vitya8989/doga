var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


const header = document.querySelector('.js_header');

if (header) {

    const switchTheme = document.querySelector('.js_switch');
    const search = document.querySelector('.js_search');
    const openSearchBtns = document.querySelectorAll('.js_open_search');
    const closeSearch = search.querySelector('.js_close_search');
    const menu = document.querySelector('.js_menu');
    const burgers = document.querySelectorAll('.js_burger');
    const closeMenu = menu.querySelector('.js_close_menu');
    const showProducts = menu.querySelector('.js_show_products');
    const menuImg = menu.querySelector('.js_menu_img');
    const menuProducts = menu.querySelector('.js_menu_products');
    const menuProductsContainer = menu.querySelector('.js_menu_products_container');
    const menuProductsContainerMob = menu.querySelector('.js_mob_menu_products_container');


    // toggle background

    toggleHeaderBg();
    window.addEventListener('scroll', toggleHeaderBg);

    function toggleHeaderBg () {
        if (window.pageYOffset > 0) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    }

    // switch theme

    switchTheme.addEventListener('change', () => {
        if (switchTheme.checked) {
            document.body.classList.add('dark_theme');
        } else {
            document.body.classList.remove('dark_theme');
        }
    });


    // show / hide search

    openSearchBtns.forEach((openSearch) => {
        openSearch.addEventListener('click', () => {
            search.classList.add('search_open');
            document.body.style.overflow = 'hidden';
            // if (openSearch.classList.contains('menu__bottom_search')) {
            //     setTimeout(() => {
            //         menu.classList.remove('menu_open');
            //         showProducts.classList.remove('active');
            //         menuImg.classList.remove('hide');
            //         menuProducts.classList.remove('show');
            //         menuProductsContainerMob.style.maxHeight = 0;
            //     }, 500);
            // }
        });
    });

    closeSearch.addEventListener('click', () => {
        search.classList.remove('search_open');
        document.body.style.overflow = 'visible';
    });

    // show / hide menu,  show / hide products
    burgers.forEach((burger) => {
        burger.addEventListener('click', () => {
            menu.classList.add('menu_open');
            document.body.style.overflow = 'hidden';
        });
    });

    closeMenu.addEventListener('click', () => {
        menu.classList.remove('menu_open');
        document.body.style.overflow = 'visible';
        setTimeout(() => {
            showProducts.classList.remove('active');
            menuImg.classList.remove('hide');
            menuProducts.classList.remove('show');
            menuProductsContainerMob.style.maxHeight = 0;
        }, 250);
    });


    showProducts.addEventListener('click', () => {
        showProducts.classList.toggle('active');
        menuImg.classList.toggle('hide');
        menuProducts.classList.toggle('show');
        if (window.innerWidth < 1024) {
            if (showProducts.classList.contains('active')) {
                menuProductsContainerMob.style.maxHeight = `${menuProductsContainerMob.scrollHeight}px`
            } else {
                menuProductsContainerMob.style.maxHeight = 0;
            }
        }
    });

    if (window.innerWidth < 1024) {
        menuProductsContainerMob.append(menuProducts);
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            menuProductsContainerMob.append(menuProducts);
            showProducts.classList.remove('active');
            menuImg.classList.remove('hide');
            menuProducts.classList.remove('show');
        } else {
            menuProductsContainer.append(menuProducts);
            menuProductsContainerMob.style.maxHeight = '0';
        }
    });
}
;
const bottomMenu = document.querySelector('.js_bottom_menu');

if (bottomMenu) {
    toggleBottomMenuBg();
    window.addEventListener('scroll', toggleBottomMenuBg);

    function toggleBottomMenuBg () {
        if (window.pageYOffset > 0) {
            bottomMenu.classList.add('show');
        } else {
            bottomMenu.classList.remove('show');
        }
    }

    let menuLinks = bottomMenu.querySelectorAll('.js_anchor');
    let menuAnchors = document.querySelectorAll('.js_menu_anchor');
    let offsetPositions = [];
    let offsetPositionsEnd = [];
    const topCorrect = document.querySelector('.header').offsetHeight + 20;
    window.onload = function () {
        for (let i = 0; i < menuLinks.length; i++) {
            let scrollTarget = menuAnchors[i];
            const elementPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset;
            const elementPositionEnd = elementPosition + scrollTarget.offsetHeight;
            const offsetPosition = elementPosition - topCorrect;
            const offsetPositionEnd = elementPositionEnd - topCorrect;
            offsetPositions.push(offsetPosition);
            offsetPositionsEnd.push(offsetPositionEnd);
        }
    }
    window.addEventListener('resize', () => {
        offsetPositions = [];
        offsetPositionsEnd = [];
        for (let i = 0; i < menuLinks.length; i++) {
            let scrollTarget = menuAnchors[i];
            const elementPosition = scrollTarget.getBoundingClientRect().top + window.pageYOffset;
            const elementPositionEnd = elementPosition + scrollTarget.offsetHeight;
            const offsetPosition = elementPosition - topCorrect;
            const offsetPositionEnd = elementPositionEnd - topCorrect;
            offsetPositions.push(offsetPosition);
            offsetPositionsEnd.push(offsetPositionEnd);
        }
    });

    window.addEventListener('scroll', () => {
        let centerOfWindow = window.pageYOffset + 200;
        for (let i = 0; i <= offsetPositions.length; i++) {
            if (centerOfWindow >= offsetPositions[i] && centerOfWindow < offsetPositionsEnd[i]) {
                if (!menuLinks[i].classList.contains('active')) {
                    menuLinks[i].classList.add('active');
                }
            } else if (centerOfWindow >= offsetPositionsEnd[i] || centerOfWindow < offsetPositions[i]) {
                menuLinks[i].classList.remove('active');
            }
        }
    });
}
;
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
};
const mainMap = document.querySelector('.main_map');
const mainTopTitle = document.querySelector('.main_top__title');
if (mainMap && mainTopTitle) {
    const mainMapContent = mainMap.querySelector('.js_main_map_content');
    const map1 = mainMap.querySelector('.js_map_1');
    const map2 = mainMap.querySelector('.js_map_2');
    const mapTitle1 = mainMap.querySelector('.js_map_title_1');
    const mapTitle2 = mainMap.querySelector('.js_map_title_2');

    let scrollTop = mainMap.offsetTop;
    let height = mainMap.offsetHeight;
    let scrollBottom = height + scrollTop - mainMapContent.offsetHeight;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > scrollTop && window.pageYOffset < scrollBottom) {
            let percent = ((window.pageYOffset - scrollTop) / (scrollBottom - scrollTop)).toFixed(2);
            map1.style.opacity = (1 - (percent * 1.65)) > 0 ? 1 - (percent * 1.65) : 0;
            map1.style.transform = `scale(${(8.5 * (percent * 2) + 1) > 9.5 ? 9.5 : (8.5 * (percent * 2) + 1) })`;

            map2.style.opacity = (percent < 0.5 ? 0 : percent - (1.5 - percent * 2)) > 1 ? 1 : percent - (1.5 - percent * 2);

            mapTitle1.style = `transform: translate(0, -${1500 * percent}px);`
            mapTitle1.style.opacity = (1 - (percent * 1.85)) > 0 ? 1 - (percent * 1.85) : 0;

            mapTitle2.style = `transform: translate(0, ${ (1500 - (1500 * percent * 1.3)) < 0 ? 0 : 1500 - (1500 * percent * 1.3)}px);`
            mapTitle2.style.opacity = (percent < 0.5 ? 0 : percent - (1.5 - percent * 2)) > 1 ? 1 : percent - (1.5 - percent * 2);
        }
    });
};
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
};
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
};
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
};

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
};
const aboutDevelopmentItems = document.querySelectorAll('.js_about_development_item');

if (aboutDevelopmentItems.length > 0) {
    aboutDevelopmentItems.forEach((item) => {
        const aboutDevelopmentItemBtn = item.querySelector('.js_about_development_item_btn');
        aboutDevelopmentItemBtn.addEventListener('click', () => {
           item.classList.toggle('hover');
        });
    });
};

const detailScheme = document.querySelector('.js_detail_scheme');

if (detailScheme) {
    const detailSchemeTargets = detailScheme.querySelectorAll('.js_detail_scheme_target');
    const detailSchemeTooltips = detailScheme.querySelectorAll('.js_detail_scheme_tooltip');
    const detailSchemeCursor = detailScheme.querySelector('.js_detail_scheme_cursor');

    if (detailSchemeTargets.length > 0 && detailSchemeTooltips.length === detailSchemeTargets.length) {
        detailSchemeTargets.forEach((target) => {
            target.addEventListener('click', () => {
                detailSchemeTooltips.forEach((tooltip) => {
                    if (tooltip.dataset.id === target.dataset.id) {
                        tooltip.classList.toggle('show');
                    } else {
                        tooltip.classList.remove('show');
                    }
                });
            });
        });
    }
    detailScheme.addEventListener('click', (e) => {
        if (!e.target.closest('.js_detail_scheme_target')) {
            detailSchemeTooltips.forEach((tooltip) => {
                tooltip.classList.remove('show');
            });
        }
    });

    detailScheme.addEventListener('mousemove', (e) => {
        if (window.innerWidth >= 1024) {
            if ((e.pageY - detailScheme.offsetTop) < 0 || (e.pageY - detailScheme.offsetTop) > detailScheme.offsetHeight) {
                detailSchemeCursor.classList.remove('active');
            } else {
                detailSchemeCursor.classList.add('active');
                detailSchemeCursor.style.top = e.pageY - detailScheme.offsetTop + 'px';
                detailSchemeCursor.style.left = e.pageX + 'px';
            }
        }
    });
};

const contactsForm = document.querySelector('.js_contacts_form');

if (contactsForm) {
    const inputs = contactsForm.querySelectorAll('.js_contacts_form_input');

    inputs.forEach((input) => {
       input.addEventListener('focus', () => {
           input.previousElementSibling.classList.add('focus');
           input.previousElementSibling.classList.remove('error');
           input.classList.remove('error');
       });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.previousElementSibling.classList.remove('focus');
            }
        });

        if (input.classList.contains('js_eng_input')) {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[а-яёА-ЯЁ]/g,"");
            });
        }
    });

    $('.js_tel_input').inputmask({
        mask: '+7 (999) 999-9999',
        showMaskOnHover: false
    });

    contactsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(contactsForm)) {
            return;
        }
        // Отправка формы
        contactsForm.reset();
    });

}

function validateForm (form) {
    let valid = true;
    const validateInputs = form.querySelectorAll('.js_required_input');

    validateInputs.forEach((input) => {
        if (input.value === '') {
            valid = false;
            input.classList.add('error');
            input.previousElementSibling.classList.add('error');
        }
        if (input.classList.contains('js_tel_input') && input.value.indexOf('_') !== -1) {
            valid = false;
            input.classList.add('error');
            input.previousElementSibling.classList.add('error');
        }
    });

    return valid;
};
const contactsMap = document.querySelector('.js_contacts_map');

if (contactsMap) {
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [54.700409, 55.949663],
                zoom: 15,
                controls: [],
            }),

            // Создаем метку с помощью вспомогательного класса.
            myPlacemark = new ymaps.Placemark([54.700409, 55.949663], {}, {
                iconLayout: 'default#image',
                iconImageHref: '../img/contacts/point.svg',
                iconImageSize: [32, 47],
                iconImageOffset: [-16, -47]
            })


        // Добавляем все метки на карту.
        myMap.geoObjects.add(myPlacemark);

        var ZoomLayout = ymaps.templateLayoutFactory.createClass(`
            <div class='contacts_map__zoom_items'>
                <div id='zoom-out' class='contacts_map__zoom icon_btn this--large this--secondary this--stroke this--minus'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                        <path d="M0.5 1.00049L7 1.00049L13.5 1.00049" stroke="#82919B" stroke-opacity="0.4" stroke-width="1.5"/>
                    </svg>
                </div>
                <div id='zoom-in' class='contacts_map__zoom icon_btn this--large this--base this--stroke this--plus'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M6.87255 0.5L6.87255 7M6.87255 13.5L6.87255 7M6.87255 7L0.5 7L13.5 7" stroke="white" stroke-width="1.5"/>
                    </svg>
                </div>
            </div>`, {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function() {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
            },

            clear: function() {
                // Снимаем обработчики кликов.
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function() {
                /**
                 * @param map.setZoom
                 * @param map.getZoom
                 * @param map.ZoomControl
                 * @param map.getMap
                 */
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
            },

            zoomOut: function() {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
            }
        });
        var zoomControl = new ymaps.control.ZoomControl({
            options: {layout: ZoomLayout}
        });

        myMap.controls.add(zoomControl, {
            float: 'none',
            position: {
                top: 0,
                right: 10
            }
        });
    };
};

const pressForm = document.querySelector('.js_press_form');

if (pressForm) {
    const contents = document.querySelectorAll('.press_form__content');

    const input = pressForm.querySelector('.js_press_form_input');

    input.addEventListener('focus', () => {
        input.previousElementSibling.classList.add('focus');
        input.previousElementSibling.classList.remove('error');
        input.classList.remove('error');
    });
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.previousElementSibling.classList.remove('focus');
        }
    });

    if (input.classList.contains('js_eng_input')) {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[а-яёА-ЯЁ]/g,"");
        });
    }


    pressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(pressForm)) {
            return;
        }
        // Отправка формы
        contents.forEach((content) => {
            if (content.dataset.content === 'thanks') {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        })
        pressForm.reset();
    });
};

const tenderSearchInput = document.querySelector('.js_tender_search_input');
const tenderSearchClear = document.querySelector('.jc_tender_search_clear');

if (tenderSearchInput && tenderSearchClear) {
    tenderSearchInput.addEventListener('input', () => {
       if (tenderSearchInput.value !== '') {
           tenderSearchClear.classList.add('show');
       } else {
           tenderSearchClear.classList.remove('show');
       }
    });
    tenderSearchClear.addEventListener('click', () => {
        tenderSearchInput.value = '';
        tenderSearchClear.classList.remove('show');
    });
}

if (document.querySelector('.trading-list')) {
    $( document ).ready(function() {
        $(".trading-list").tradingList({
            "domainUrl": "http://www.tender.pro",
            "autoLoad": true,
            "holding": false,
            "transparent": false,
            "params": {
                "set_type_id": "1",
                "types": "1, 5, 2, 4, 6, 3, 8, 7, 9",
                "max_rows": "30",
                "_key": "7b56c77b9f70220c3d5d4ce6477674ea",
                "set_id": "381087"
            }
        });
    });
}

;

