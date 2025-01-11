import { Bounce, toast, ToastOptions, TypeOptions } from "react-toastify";

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

export const toastMessage = ({
  label,
  type,
}: {
  label: string;
  type: TypeOptions;
}) => {
  return toast(label, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type,
  });
};
