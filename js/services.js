// Ожидаем, что кнопки и контент услуг уже добавлены на страницу
const serviceButtons = document.querySelectorAll('[id^="btnService"]');
const serviceContents = document.querySelectorAll('.chapter-content');

serviceButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Скрыть все контенты услуг и удалить активный класс у всех кнопок
    serviceContents.forEach((content) => content.classList.add('d-none'));
    serviceButtons.forEach((btn) => btn.classList.remove('active'));

    // Показать выбранный контент услуги и добавить активный класс для соответствующей кнопки
    // Вызываем функцию плавного появления блока
    serviceContents[index].classList.remove('d-none');
    button.classList.add('active');
  });
});

// Функция для отправки сообщения в Telegram
function sendTelegramMessage(chatId, message) {
  const botToken = '6349605603:AAE8AgNxMoR2a4CVdq1JCpDYpXwG76Oskpk'; // Замените на реальный токен вашего бота
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: message,
  };

  axios.post(telegramUrl, data)
    .then(response => {
      console.log('Сообщение успешно отправлено в Telegram:', response.data);
    })
    .catch(error => {
      console.error('Ошибка отправки сообщения в Telegram:', error);
    });
}

// Функция для обработки отправки формы
function handleFormSubmit(event) {
  event.preventDefault();
  const chatId = '1978717195'; // Замените на реальный chat_id получателя

  const service = document.getElementById('serviceSelect').value;
  const fullName = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;

  if (fullName.trim() === '' || phone.trim() === '') {
    alert('Пожалуйста, заполните все поля формы');
    return;
  }

  if (!validatePhoneNumber(phone)) {
    alert('Пожалуйста, введите корректный номер телефона');
    return;
  }


  const message = `Новый запрос на консультацию:\nУслуга: ${service}\nФИО: ${fullName}\nНомер телефона: ${phone}`;

  sendTelegramMessage(chatId, message);
  // Вызываем функцию для закрытия модального окна
  closeModal();
  alert('Мы свяжемся с вами в скором времени');
  
}

function closeModal() {
  consultationForm.style.display = 'none'; // Скрываем модальное окно
  consultationForm.classList.remove('show'); // Удаляем класс 'show', если используется Bootstrap
  consultationForm.setAttribute('aria-hidden', 'true'); // Устанавливаем атрибут aria-hidden="true"
  consultationForm.setAttribute('aria-modal', 'false'); // Устанавливаем атрибут aria-modal="false"
  document.body.classList.remove('modal-open'); // Удаляем класс 'modal-open', если используется Bootstrap
  var modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
  if (modalBackdrop) {
    modalBackdrop.parentNode.removeChild(modalBackdrop); // Удаляем элемент .modal-backdrop
  }
}

const consultationForm = document.getElementById('consultationModal');
consultationForm.addEventListener('submit', handleFormSubmit);

function editModal(serviceName) {
  // Устанавливаем значение поля "Услуга" в зависимости от переданного имени услуги
  var serviceSelect = document.getElementById('serviceSelect');
  serviceSelect.value = serviceName;
}
function toggleText(serviceId) {
  var serviceText = document.getElementById(serviceId + 'Text');
  serviceText.classList.toggle('hiddenText');
  let block = document.getElementById(serviceId + 'Arrow');
  if (block.textContent === '▼') {
    block.textContent = '▲';
  } else {
    block.textContent = '▼';
  }
}

// Функция для проверки допустимости номера телефона
function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[0-9]{10,14}$/; // Номер должен содержать от 10 до 14 цифр
  return phoneRegex.test(phoneNumber);
}

