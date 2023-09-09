const contactsForm = document.querySelector('.js_contacts_form');

if (contactsForm) {
    const inputs = contactsForm.querySelectorAll('.js_contacts_form_input');

    inputs.forEach((input) => {
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
    });

    $('.js_tel_input').inputmask({
        mask: '+7 (999) 999-9999',
        showMaskOnHover: false
    });

    contactsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(contactsForm)) {
            return;
        }
        // Отправка формы
        contactsForm.reset();
    });

}

function validateForm (form) {
    let valid = true;
    const validateInputs = form.querySelectorAll('.js_required_input');

    validateInputs.forEach((input) => {
        if (input.value === '') {
            valid = false;
            input.classList.add('error');
            input.previousElementSibling.classList.add('error');
        }
        if (input.classList.contains('js_tel_input') && input.value.indexOf('_') !== -1) {
            valid = false;
            input.classList.add('error');
            input.previousElementSibling.classList.add('error');
        }
    });

    return valid;
}