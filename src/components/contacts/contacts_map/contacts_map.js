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
}