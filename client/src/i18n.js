import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        navMenuItems: {
          home: "Главная",
          rooms: "Номера",
          aboutHotel: "Об отеле",
          reviews: "Отзывы",
          contacts: "Контакты",
          services: "Услуги",
          more: "Еще",
        },
      },
    },
    en: {
      translation: {
        navMenuItems: {
          home: "Home",
          rooms: "Rooms",
          aboutHotel: "About hotel",
          reviews: "Кeviews",
          contacts: "Сontacts",
          services: "Services",
          more: "More",
        },
      },
    },
  },
  lng: "ru",
  fallbackLng: "ru",
});

export default i18n;
