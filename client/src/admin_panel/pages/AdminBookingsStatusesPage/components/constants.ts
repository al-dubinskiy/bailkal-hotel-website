import moment from "moment";
import { dateTimeFormat } from "../../../../constants";
import { times } from "../../../../pages/Booking/components/EnterGuestsDetailsSection/components/constants";
import { BookingType } from "../../../../redux/slices/Bookings/types";

export const bookingTemplate: BookingType = {
  _id: "",
  room_id: "",
  room_category_id: "",
  user: {
    name: "",
    lastname: "",
    surname: "",
    phone: "",
    email: "",
    nationality: "",
    send_confirm_on_phone: false,
    want_to_know_about_special_offers_and_news: false,
  },
  adults_count: 1,
  children_count: 0,
  arrival_datetime: moment()
    .set("hours", Number(times[0].value.split(":")[0])) // 07:00
    .set("minutes", Number(times[0].value.split(":")[1]))
    .format(dateTimeFormat),
  departure_datetime: moment()
    .add(1, "days")
    .set("hours", Number(times[8].value.split(":")[0])) // 15:00
    .set("minutes", Number(times[8].value.split(":")[1]))
    .format(dateTimeFormat),
  tariff_id: "",
  service_id: [],
  bed_type_id: "",
  view_from_window_id: "",
  payment_method_id: "",
  transfer_id: "",
  transfer_comment: "",
  price: 0,
  comment: "",
  booking_for_whom: "for_yourself",
  created_at: "",
  updated_at: "",
};
