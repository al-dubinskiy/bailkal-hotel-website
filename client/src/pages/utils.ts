export function getAllObjectValues(obj: any): any[] {
  let values: any = [];

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // Если значение ключа - объект, вызываем функцию рекурсивно
      values = values.concat(getAllObjectValues(obj[key]));
    } else {
      // Если значение ключа - примитив, добавляем в массив
      values.push(obj[key]);
    }
  }

  return values;
}
