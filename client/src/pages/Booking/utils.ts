import {
  BookingType,
  CreateBookingLocalType,
} from "../../redux/slices/Bookings/types";
import { BookingServiceType } from "../../redux/slices/BookingServices/types";
import { RoomCategoryType } from "../../redux/slices/RoomsCategories/types";

export const GroupObjectByKey = (key: string, array: Array<any>) => {
  return array.reduce((acc, obj) => {
    const property = obj[key];
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};

// Booking
export const getBookingServicesInfo = ({
  bookingServices,
  roomCategory,
  currentBooking,
}: {
  bookingServices: BookingServiceType[] | null;
  roomCategory: RoomCategoryType | null;
  currentBooking: CreateBookingLocalType | BookingType | null;
}): BookingServiceType[] | null => {
  let services: BookingServiceType[] | null = null;
  if (bookingServices && roomCategory && currentBooking) {
    if (currentBooking.service_id.length) {
      const addedServices = bookingServices.filter((i) =>
        currentBooking.service_id.includes(i._id)
      );
      services = [...addedServices];
    }
    if (roomCategory.include_service_id.length) {
      const includedServices = bookingServices
        .filter((i) => roomCategory.include_service_id.includes(i._id))
        .map((i) => ({ ...i, price: 0 }));

      if (services) {
        services = [...includedServices, ...services];
      } else {
        services = [...includedServices];
      }
    }
  }
  return services;
};
