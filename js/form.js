window.addEventListener('load', (e) => {
  const phpApp =
    '';
  const lang = document.querySelector('html').getAttribute('lang');

  if (navigator.language != 'pl' && navigator.language != 'pl-PL') {
    document.querySelector('.lang_switcher').style.display = 'none';
  }

  if (
    navigator.language != 'pl' &&
    navigator.language != 'pl-PL' &&
    lang == 'pl'
  ) {
    location.href = 'online-auctions.html';
  }

  const mailForm = document.querySelector('form');

  const formFieldName = document.querySelector('[name=name]');
  const formFieldSurname = document.querySelector('[name=surname]');
  const formFieldCompany = document.querySelector('[name=company]');
  const formFieldPhone = document.querySelector('[name=phone]');
  const formFieldMail = document.querySelector('[name=email]');

  const sendSuccess = document.querySelector('.w-form-done');
  const sendFailed = document.querySelector('.w-form-fail');

  const sendFormButton = document.querySelector('[type=submit');

  const mailReg = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,4}$/i;

  const checkField = (field, fieldText, fieldText_eng) => {
    const fieldLang = lang == 'pl' ? fieldText : fieldText_eng;
    const comunicate = lang == 'pl' ? 'Wypełnij to pole' : 'Fill in this field';

    if (field.value.length == 0) {
      errors = true;
      field.previousElementSibling.innerHTML = `${fieldLang} <b style="color: black;">${comunicate}</b>`;
    } else {
      errors = false;
      field.previousElementSibling.innerHTML = fieldLang;
    }
  };

  const checkEmailField = (field, pattern, fieldText) => {
    const comunicate = lang == 'pl' ? 'Wypełnij to pole' : 'Fill in this field';
    if (pattern.test(field.value)) {
      errors = false;
      field.previousElementSibling.innerHTML = fieldText;
    } else {
      errors = true;
      field.previousElementSibling.innerHTML = `${fieldText} <b style="color: black;">${comunicate}</b>`;
    }
  };

  const SendForm = (e) => {
    e.preventDefault();

    if (formFieldSurname.value != '') {
      return false;
    }

    checkField(formFieldName, 'Imię', 'Name');
    checkField(formFieldCompany, 'Firma', 'Company');
    checkField(formFieldPhone, 'Telefon', 'Phone');
    checkEmailField(formFieldMail, mailReg, 'Mail');

    if (!errors) {
      const formData = new FormData();
      formData.append('name', formFieldName.value);
      formData.append('company', formFieldCompany.value);
      formData.append('phone', formFieldPhone.value);
      formData.append('mail', formFieldMail.value);
      formData.append('lang', lang);

      fetch(phpApp, {
        mode: 'no-cors',
        method: 'post',
        body: formData,
      })
        .then((response) => response.text())
        .then((response) => {
          //console.log(response);
          if (response == 'success') {
            mailForm.reset();
            sendSuccess.style.display = 'block';
            mailForm.style.display = 'none';
          } else {
            sendFailed.style.display = 'block';
          }
        })
        .catch((error) => {
          sendFailed.style.display = 'block';
        });
    }
  };

  sendFormButton.addEventListener('click', SendForm);
});
