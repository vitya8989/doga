
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
