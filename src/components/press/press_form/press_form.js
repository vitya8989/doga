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
}