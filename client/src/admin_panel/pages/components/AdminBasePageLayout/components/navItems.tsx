import { BookingStatusIcon } from "../../../../../assets/icons/BookingStatusIcon";
import { RoomsCountIcon } from "../../../../../assets/icons/RoomsCountIcon";
import { NavItemType } from "../../../../../pages/components/Header/components/Nav/NavList";

export const navItems: NavItemType[] = [
  {
    id: "1",
    name: "Список номеров",
    link: "/admin/rooms-list",
    icon: <RoomsCountIcon sx={{ fontSize: "24px" }} />,
  },
  {
    id: "2",
    name: "Статус бронирования",
    link: "/admin/bookings-statuses",
    icon: <BookingStatusIcon sx={{ fontSize: "24px" }} />,
  },
  {
    id: "3",
    name: "Доступные даты для бронирования",
    link: "/admin/available-bookings-dates",
    icon: <RoomsCountIcon sx={{ fontSize: "24px" }} />,
  },
  {
    id: "4",
    name: "Полученные отзывы и общий рейтинг",
    link: "/admin/received-reviews-and-overall-rating",
    icon: <RoomsCountIcon sx={{ fontSize: "24px" }} />,
  },
  {
    id: "5",
    name: "Подписавшиеся на email-рассылку",
    link: "/admin/email-subscribers",
    icon: <RoomsCountIcon sx={{ fontSize: "24px" }} />,
  },
  {
    id: "6",
    name: "Рассылка на электронную почту",
    link: "/admin/newsletter-by-email",
    icon: <RoomsCountIcon sx={{ fontSize: "24px" }} />,
  },
];
