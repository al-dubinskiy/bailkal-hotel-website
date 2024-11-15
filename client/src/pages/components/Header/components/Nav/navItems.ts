import { NavItemType } from "./NavList";

export const navItems: NavItemType[] = [
  {
    name: "Главная",
    id: "home",
    link: "/",
  },
  { name: "Номера", id: "rooms", link: "/rooms" },
  { name: "Бронирование номера", id: "booking", link: "/booking" },
  { name: "Об отеле", id: "about", link: "/about" },
  { name: "Отзывы", id: "reviews", link: "/reviews" },
  { name: "Контакты", id: "contacts", link: "/contacts" },
  {
    name: "Услуги",
    id: "services",
    subItems: [
      {
        name: "Конференц-залы",
        id: "conferenceHalls",
        link: "/conference-halls",
      },
      {
        name: "Бары и рестораны",
        id: "barsAndRestaurants",
        link: "/bars-and-restaurants",
      },
      {
        name: "Свадебные банкеты",
        id: "weddingBanquets",
        link: "/wedding-banquets",
      },
      {
        name: "Горнолыжный комплекс",
        id: "skiКesort",
        link: "https://baikalgora.ru/",
      },
      {
        name: "Туры по Байкалу",
        id: "toursOfBaikal",
        link: "https://eastland.ru/tours/",
      },
      {
        name: "Круизы по Байкалу",
        id: "cruisesOnLakeBaikal",
        link: "https://eastland.ru/cruises/",
      },
    ],
  },
  {
    name: "Еще",
    id: "more",
    subItems: [
      {
        name: "Ресторан “Mir”",
        id: "restaurant-mir",
        link: "/restaurant-mir",
      },
      {
        name: "События",
        id: "events",
        link: "/events",
      },
      {
        name: "Эксклюзивные предложения",
        id: "exclusive-offers",
        link: "/exclusive-offers",
      },
      {
        name: "Подарочные сертификаты",
        id: "gift-certificates",
        link: "/gift-certificates",
      },
      {
        name: "Программа лояльности",
        id: "loyalty-program",
        link: "/loyalty-program",
      },
      {
        name: "Вакансии",
        id: "vacancies",
        link: "/vacancies",
      },
    ],
  },
];
