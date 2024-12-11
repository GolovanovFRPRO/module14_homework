const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const submitButton = document.getElementById("submitButton");
const messageSpan = document.getElementById("message");
const imageContainer = document.getElementById("imageContainer");

submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
    const width = widthInput.value ? parseInt(widthInput.value, 10) : NaN;
    const height = heightInput.value ? parseInt(heightInput.value, 10) : NaN;

    // Проверка на диапазон и на валидность ввода
    if ((isNaN(width) || isNaN(height)) || (width < 100 || width > 300) || (height < 100 || height > 300)) {
        messageSpan.innerHTML = "Одно из чисел вне диапазона от 100 до 300.";
        imageContainer.innerHTML = ""; // Очищаем контейнер для изображения
    } else {
        messageSpan.innerHTML = "Загружаю изображение...";
        fetchImage(width, height);
    }
}

function fetchImage(width, height) {
    const url = `https://dummyimage.com/${width}x${height}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка! Статус ответа: ${response.status}`);
            }
            return response.blob(); // Получаем Blob-объект
        })
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob); // Создаем URL для Blob
            displayImage(imageUrl);
            messageSpan.innerHTML = "Изображение загружено.";
        })
        .catch(error => {
            messageSpan.innerHTML = error.message;
            imageContainer.innerHTML = ""; // Очищаем контейнер для изображения
        });
}


function displayImage(url) {
    imageContainer.innerHTML = ""; // Очищаем контейнер перед добавлением нового изображения
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.alt = "Загруженное изображение";
    imageContainer.appendChild(imgElement);
}