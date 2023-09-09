const mainMapContent = document.querySelector('.js_main_map_content');
const mainTopTitle = document.querySelector('.main_top__title');
if (mainMapContent && mainTopTitle) {
    const mainMapTitleWr = mainMapContent.querySelector('.main_map__title_wr');
    let topOfMainMapContent = mainMapContent.getBoundingClientRect().top;

    let callback = function(entries, observer){
        entries.forEach(entry => {
            if (entry.target === mainMapTitleWr) {
                if (entry.isIntersecting) {
                    if (topOfMainMapContent > entry.boundingClientRect.top && !mainMapContent.classList.contains('active_animation')) {
                        mainMapContent.classList.add('active_animation');
                    }
                } else {
                    topOfMainMapContent = entry.boundingClientRect.top;
                }
            }
            if (entry.target === mainTopTitle && entry.isIntersecting) {
                if (mainMapContent.classList.contains('active_animation')) {
                    mainMapContent.classList.remove('active_animation');
                }
            }
        })
    }

    let observer = new IntersectionObserver(callback, {
        threshold: 1,
    });

    observer.observe(mainMapTitleWr);
    observer.observe(mainTopTitle);
}