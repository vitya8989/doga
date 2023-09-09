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
}