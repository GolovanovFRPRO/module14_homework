/*Задание 1

Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
*/
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Функция для преобразования XML в JS-объект
function xmlToJsObject(xml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  
  const students = Array.from(xmlDoc.getElementsByTagName("student"));
  const list = students.map(student => {
    const nameNode = student.getElementsByTagName("name")[0];
    const firstName = nameNode.getElementsByTagName("first")[0].textContent;
    const secondName = nameNode.getElementsByTagName("second")[0].textContent;
    const lang = nameNode.getAttribute("lang");
    const age = student.getElementsByTagName("age")[0].textContent;
    const prof = student.getElementsByTagName("prof")[0].textContent;
    
    return {
      name: `${firstName} ${secondName}`,
      age: Number(age),
      prof: prof,
      lang: lang
    };
  });

  return { list: list };
}

// Преобразуем XML и выводим результат в консоль
const jsObject = xmlToJsObject(xmlString);
console.log(jsObject);


/*Задание 2

Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать 
JSON в JS-объект и выводить его в консоль.*/


{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}


/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
  "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

/* Этап 2. Получение данных */
function jsonToJsObject(json) {
    const parsedObject = JSON.parse(json);
    
    /* Этап 3. Запись данных*/
    parsedObject.list = parsedObject.list.map(item => ({
      name: item.name,
      age: Number(item.age),
      prof: item.prof
    }));
  
    return parsedObject;
}

// Преобразуем JSON и выводим результат в консоль
const jsObject = jsonToJsObject(jsonString);
console.log(jsObject);