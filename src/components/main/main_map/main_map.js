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
}