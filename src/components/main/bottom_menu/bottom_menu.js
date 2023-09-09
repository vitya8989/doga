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
