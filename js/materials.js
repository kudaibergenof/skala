// Ожидаем, что кнопки и контент услуг уже добавлены на страницу

const materialButtons = document.querySelectorAll('.material-button');
const materialContents = document.querySelectorAll('.material-content');

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
  // Находим элемент div с id "cart"
  const cartDiv = document.getElementById("cart");

  // Проверяем, есть ли внутри div элемента с текстом, который мы хотим добавить
  const textExists = Array.from(cartDiv.children).some((element) => element.textContent.trim() === text);

  // Если указанного текста внутри "cart" еще нет, то создаем новый элемент и добавляем его в "cart"
  if (!textExists) {
    const newDiv = document.createElement("div");
    const newImage = document.createElement("img");
    const newText = document.createTextNode(text);

    newImage.src = imageUrl;
    newImage.style.marginRight = "10px"; // Добавляем отступ справа для изображения (можно изменить значение)

    newDiv.appendChild(newImage);
    newDiv.appendChild(newText);
    cartDiv.appendChild(newDiv);
  }
}
