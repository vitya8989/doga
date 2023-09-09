const aboutDevelopmentItems = document.querySelectorAll('.js_about_development_item');

if (aboutDevelopmentItems.length > 0) {
    aboutDevelopmentItems.forEach((item) => {
        const aboutDevelopmentItemBtn = item.querySelector('.js_about_development_item_btn');
        aboutDevelopmentItemBtn.addEventListener('click', () => {
           item.classList.toggle('hover');
        });
    });
}