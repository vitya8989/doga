const mainMap = document.querySelector('.main_map');
const mainFullImg = document.querySelector('.main_full_img');
const mainTopTitle = document.querySelector('.main_top__title');
if (mainMap && mainTopTitle) {
    const mainMapContent = mainMap.querySelector('.js_main_map_content');
    let topOfMainMapContent = mainMapContent.getBoundingClientRect().top;

    let callback = function(entries, observer){
        entries.forEach(entry => {
            if (entry.target === mainFullImg) {
                if (entry.isIntersecting) {
                    if (topOfMainMapContent > entry.boundingClientRect.top && !mainMapContent.classList.contains('active_animation')) {
                        disableScroll();
                        mainMapContent.classList.add('active_animation');
                        setTimeout(() => {
                            enableScroll();
                        }, 3700);
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
        threshold: 0.01,
    });

    observer.observe(mainFullImg);
    observer.observe(mainTopTitle);
}