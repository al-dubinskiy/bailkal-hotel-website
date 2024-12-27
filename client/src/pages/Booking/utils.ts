import { Moment } from "moment";
import {
  BookingType,
  CreateBookingLocalType,
} from "../../redux/slices/Bookings/types";
import { BookingServiceType } from "../../redux/slices/BookingServices/types";
import { RoomCategoryType } from "../../redux/slices/RoomsCategories/types";
import {
  deluxeKingRooms,
  deluxeTwinRooms,
  suiteRooms,
} from "../../assets/images";

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

export function isDateTimeRangeContained({
  start1,
  end1,
  start2,
  end2,
}: {
  start1: Moment;
  end1: Moment;
  start2: Moment;
  end2: Moment;
}) {
  return start1.isSameOrBefore(start2) && end1.isSameOrAfter(end2);
}

export const getRoomCategoryPhotos = (roomCategory: RoomCategoryType) => {
  return roomCategory._id === "672cd21f0ae43935e03a79dd" ||
    roomCategory._id === "672cd2a790ef8a2d0cdfcac3"
    ? deluxeKingRooms
    : roomCategory._id === "672cd30090ef8a2d0cdfcac6" ||
      roomCategory._id === "672cd34e90ef8a2d0cdfcac9"
    ? deluxeTwinRooms
    : roomCategory._id === "672cd65af65cf0e5caff9686" ||
      roomCategory._id === "6757519407763b1fc5c07e72"
    ? suiteRooms
    : [];
};
