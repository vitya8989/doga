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

@@include('../components/header/header.js');
@@include('../components/main/bottom_menu/bottom_menu.js');
@@include('../components/main/unique/unique.js');
@@include('../components/main/main_map/main_map.js');
@@include('../components/main/main_strategy/main_strategy.js');
@@include('../components/main/products/products.js');
@@include('../components/main/press_block/press_block.js');

@@include('../components/about/about_mission/about_mission.js');
@@include('../components/about/about_development/about_development.js');

@@include('../components/detail/detail_scheme/detail_scheme.js');

@@include('../components/contacts/contacts_form/contacts_form.js');
@@include('../components/contacts/contacts_map/contacts_map.js');

@@include('../components/press/press_form/press_form.js');

@@include('../components/tender/tender_table/tender_table.js');

