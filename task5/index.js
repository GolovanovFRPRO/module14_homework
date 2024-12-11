
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result2");
const outOfRange2 = function (number) {
  return isNaN(number) || number < 1 || number > 10;
};


window.addEventListener("load", () => {
  const savedPhotos = JSON.parse(localStorage.getItem("photos") || "[]"); 

  
  savedPhotos.forEach((photoURL) => {
    const img = document.createElement("img");
    img.src = photoURL;
    img.alt = "Saved Image";
    resultDiv.appendChild(img);
  });
});

submitBtn.addEventListener("click", async () => {
  try {
    const inputPage = document.getElementById("numberInput3").value;
    const inputLimit = document.getElementById("numberInput4").value;
    const pageNumber = parseInt(inputPage, 10);
    const limitNumber = parseInt(inputLimit, 10);

    // Очистка результата
    resultDiv.innerHTML = "";

    // Проверка на диапазон от 1 до 10
    if (outOfRange2(pageNumber)) {
      return console.log("Номер страницы вне диапазона от 1 до 10");
    } else if (outOfRange2(limitNumber)) {
      return console.log("Лимит вне диапазона от 1 до 10");
    } else if (outOfRange2(pageNumber) && outOfRange2(limitNumber)) {
      return console.log("Номер страницы и лимит вне диапазона от 1 до 10");
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limitNumber}`
    );
    console.log(response);

    const data = await response.json(); 
    console.log(data);
    
    resultDiv.innerHTML = "";
    const photoURLs = data.map((photo) => photo.url); 
    localStorage.setItem("photos", JSON.stringify(photoURLs)); 


    photoURLs.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Fetched Image";
      resultDiv.appendChild(img);
    });
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});