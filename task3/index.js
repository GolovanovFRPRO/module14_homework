const input = document.querySelector("input");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    //const value = input.value;
    const value = document.querySelector('input').value;

    if (value >= 1 && value <= 10 && 
        (value)) {
        useRequest("https://jsonplaceholder.typicode.com/photos?_limit=" + value, loadPhotos);
        write("Загружаю фото...");
    } else {
        write("Число вне диапазона от 1 до 10.");
    }
}

function write(text) {
    outputSpan.innerHTML = text;
}

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            write("Статус ответа: ", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            write("Фото загружены.");
        }
    };

    xhr.onerror = function() {
        write("Ошибка! Статус ответа: ", xhr.status);
    };

    xhr.send();
};

function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.url}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.author}</p>
                              </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}

/*const input = document.querySelector("input");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    const value = parseInt(input.value, 10); // Преобразуем значение в число

    if (value >= 1 && value <= 10) {
        useRequest("https://jsonplaceholder.typicode.com/photos?_limit=" + value, loadPhotos);
        write("Загружаю фото...");
    } else {
        write("Число вне диапазона от 1 до 10.");
    }
}

function write(text) {
    outputSpan.innerHTML = text;
}

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            write("Ошибка! Статус ответа: " + xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            write("Фото загружены.");
        }
    };

    xhr.onerror = function() {
        write("Ошибка! Статус ответа: " + xhr.status);
    };

    xhr.send();
}

function loadPhotos(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `<div>
                                <img
                                  src="${item.url}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.title}</p> <!-- Используем title вместо author -->
                            </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}*/
