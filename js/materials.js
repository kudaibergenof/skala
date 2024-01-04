// Ожидаем, что кнопки и контент услуг уже добавлены на страницу

const materialButtons = document.querySelectorAll('.material-button');
const materialContents = document.querySelectorAll('.material-content');
const cartItems = [];

materialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const targetContent = document.getElementById(targetId);

    if (targetContent) {
      // Скрываем все контенты услуг
      materialContents.forEach((content) => content.classList.add('d-none'));

      // Показываем выбранный контент услуги
      targetContent.classList.remove('d-none');

      // Удаляем класс 'active' у всех кнопок
      materialButtons.forEach((btn) => btn.classList.remove('active'));

      // Добавляем класс 'active' только выбранной кнопке
      button.classList.add('active');
    }
  });
});

function addToCart(text, imageUrl) {
  const cartDiv = document.getElementById("cart");

  const textExists = Array.from(cartDiv.children).some(
    (element) => element.textContent.trim() === text
  );

  if (!textExists) {
    const newDiv = document.createElement("div");
    const newImage = document.createElement("img");
    const newText = document.createTextNode(text);
    const deleteButton = document.createElement("button");

    newImage.src = imageUrl;
    newImage.style.marginRight = "10px";
    newDiv.style.marginBottom = "10px";
    deleteButton.style.marginLeft = "5px";

    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function() {
      cartDiv.removeChild(newDiv);
      removeFromCart(text); // Удаление товара из массива при удалении из корзины
    };

    deleteButton.style.verticalAlign = "middle";
    deleteButton.style.display = "inline-block"; 

    newDiv.appendChild(newImage);
    newDiv.appendChild(newText);
    newDiv.appendChild(deleteButton);
    cartDiv.appendChild(newDiv);

    addToCartItems(text); // Добавление товара в массив при добавлении в корзину
  }
}

function addToCartItems(item) {
  cartItems.push(item);
  console.log("Товар добавлен в корзину:", cartItems);
}

function removeFromCart(item) {
  const index = cartItems.indexOf(item);
  if (index !== -1) {
    cartItems.splice(index, 1);
    console.log("Товар удален из корзины:", cartItems);
  }
}

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

  const service = document.getElementById('materialSelect').value;
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


  const message = `
  🔔 Новый запрос на консультацию:
  
  🛒 Услуга: ${service}
  👤 ФИО: ${fullName}
  📞 Номер телефона: ${phone}
  📦 Список товаров:
  ${cartItems.map((item, index) => `${index + 1}. ${item}`).join("\n")}
  `;
  

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

const consultationForm = document.getElementById('shopModal');
consultationForm.addEventListener('submit', handleFormSubmit);
const cartItemsList = document.getElementById("cartItemsList");

function editModal(serviceName) {
  // Устанавливаем значение поля "Услуга" в зависимости от переданного имени услуги
  var serviceSelect = document.getElementById('materialSelect');
  serviceSelect.value = serviceName;
  cartItemsList.value = cartItems.join(", ");
}

// Функция для проверки допустимости номера телефона
function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[0-9]{10,14}$/; // Номер должен содержать от 10 до 14 цифр
  return phoneRegex.test(phoneNumber);
}

