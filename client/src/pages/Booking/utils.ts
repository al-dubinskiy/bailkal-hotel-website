import moment, { Moment } from "moment";
import {
  BookingDateType,
  BookingType,
  CreateBookingLocalType,
  RoomCategoryPriceType,
  RoomGuestsCountType,
} from "../../redux/slices/Bookings/types";
import { BookingServiceType } from "../../redux/slices/BookingServices/types";
import { RoomCategoryType } from "../../redux/slices/RoomsCategories/types";
import {
  deluxeKingRooms,
  deluxeTwinRooms,
  suiteRooms,
} from "../../assets/images";
import { dateFormat } from "../../constants";
import { UnavailableBookingDateType } from "../../redux/slices/UnavailableBookingDates/types";

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

// Проверка, полностью ли диапазон 2 находится в диапазоне 1
export function isDateTimeRangeContained({
  start1,
  end1,
  start2,
  end2,
}: {
  start1: Moment; // ex. 2025-01-01
  end1: Moment; // ex. 2025-01-10
  start2: Moment; // ex. 2025-01-03
  end2: Moment; // ex. 2025-01-08
}) {
  return start2.isSameOrAfter(start1) && end2.isSameOrBefore(end1);
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

// Функция для получения массива дней года
export function getDaysInRange({
  dateStart,
  dateEnd,
}: {
  dateStart: {
    year: string;
    month: string;
    day: string;
  };
  dateEnd: {
    year: string;
    month: string;
    day: string;
  };
}): Moment[] {
  const days = [];
  let date = moment(
    `${dateStart.year}-${
      dateStart.month ? Number(dateStart.month) + 1 : "01"
    }-${dateStart.day ? dateStart.day : "01"}`,
    "YYYY-MM-DD"
  ); // Первый день года
  const endOfYear = moment(
    `${dateEnd.year}-${dateEnd.month ? Number(dateStart.month) + 1 : "01"}-${
      dateEnd.day ? dateEnd.day : "01"
    }`,
    "YYYY-MM-DD"
  ); // Последний день года

  while (date.isSameOrBefore(endOfYear)) {
    days.push(date.format(dateFormat)); // Форматируем дату
    date.add(1, "day"); // Переходим к следующему дню
  }

  return days.map((i) => moment(i, dateFormat));
}

// Для функции updateBokingDraft()
export const getRoomCategoryPrice = ({
  room,
  roomCategory,
}: {
  room: RoomGuestsCountType;
  roomCategory: RoomCategoryType;
}) => {
  // Подсчитываем количество гостей комнаты
  const roomGuestsCount = room.adults + room.children;
  // Получаем стоимость категории комнаты
  return roomGuestsCount > 1
    ? roomCategory.price_per_night_for_two_quest
    : roomCategory.price_per_night_for_one_quest;
};

export const getFreeRoomId = ({
  roomCategory,
  bookings,
  newBookings,
  arrivalDate,
  departureDate,
}: {
  roomCategory: RoomCategoryType;
  bookings: BookingType[];
  newBookings?: CreateBookingLocalType[];
  arrivalDate: Moment;
  departureDate: Moment;
}) => {
  // Получить все комнат, которые сейчас бронируются на данную категорию
  const newBookedRoomsOnCategory = newBookings
    ? newBookings.filter((i) => i.room_category_id === roomCategory._id)
    : [];

  // Поиск ранее забронированных комнаты на данную категорию
  const prevBookedRoomOnCategory = bookings.filter(
    (i) => i.room_category_id === roomCategory._id
  );

  const newAndOldBookings = [
    ...newBookedRoomsOnCategory,
    ...prevBookedRoomOnCategory,
  ];

  // Найти id доступной комнаты для бронирования
  const freeRoomId = roomCategory.room_id.find((roomId) => {
    const bookingsOnRoomId = newAndOldBookings.filter(
      (booking) => booking.room_id === roomId
    );
    // Считаем количество бронирований на данную комнату и на выбранную дату заезда/выезда
    // если количество != rooms total on category, то вывод, что можно бронировать на эту комнату
    return !bookingsOnRoomId.find((booking) =>
      isDateTimeRangeContained({
        start1: moment(arrivalDate.format(dateFormat)),
        end1: moment(departureDate.format(dateFormat)),
        start2: moment(moment(booking.arrival_datetime).format(dateFormat)),
        end2: moment(moment(booking.departure_datetime).format(dateFormat)),
      })
    );
  });
  return freeRoomId;
};

export const checkIsRoomIdFree = ({
  roomId,
  roomCategory,
  bookings,
  newBookings,
  arrivalDate,
  departureDate,
}: {
  roomId: string;
  roomCategory: RoomCategoryType;
  bookings: BookingType[];
  newBookings?: CreateBookingLocalType[];
  arrivalDate: Moment;
  departureDate: Moment;
}): boolean => {
  // Получить все комнат, которые сейчас бронируются на данную категорию
  const newBookedRoomsOnCategory = newBookings
    ? newBookings.filter((i) => i.room_category_id === roomCategory._id)
    : [];

  // Поиск ранее забронированных комнаты на данную категорию
  const prevBookedRoomOnCategory = bookings.filter(
    (i) => i.room_category_id === roomCategory._id
  );

  const newAndOldBookings = [
    ...newBookedRoomsOnCategory,
    ...prevBookedRoomOnCategory,
  ];

  const bookingsOnRoomId = newAndOldBookings.filter(
    (booking) => booking.room_id === roomId
  );

  // Если номер ранее уже был забронирован на выбранную дату
  return bookingsOnRoomId.find((booking) =>
    isDateTimeRangeContained({
      start1: moment(arrivalDate.format(dateFormat)),
      end1: moment(departureDate.format(dateFormat)),
      start2: moment(moment(booking.arrival_datetime).format(dateFormat)),
      end2: moment(moment(booking.departure_datetime).format(dateFormat)),
    })
  )
    ? false
    : true;
};

// --- For range date picker ---
export type SortedBookingType = {
  [key: string]: BookingType[];
};

const sortBookingsByRoomCategories = ({
  bookings,
  roomsCategories,
}: {
  bookings: BookingType[];
  roomsCategories: RoomCategoryType[];
}): SortedBookingType[] | null => {
  if (roomsCategories && bookings) {
    /* Сортировка бронирований по категориям комнат, где
          "ключ" - id категории комнаты, а
          "value" - массив дат "заезда" и "выезда" каждого бронирования на эту категорию:
          {"room_category_id": {
              arrivalDate: string;
              departureDate: string;
            }[]
          }
        */
    const sortedBookings: SortedBookingType[] = GroupObjectByKey(
      "room_category_id",
      bookings
    );

    return sortedBookings;
  } else {
    return null;
  }
};

export const getCategoriesAvailableRoomsCount = ({
  unavailableBookingDates,
  bookings,
  roomsCategories,
  arrivalDate,
  departureDate,
}: {
  unavailableBookingDates: UnavailableBookingDateType[];
  bookings: BookingType[];
  roomsCategories: RoomCategoryType[];
} & BookingDateType): RoomCategoryPriceType[] | null => {
  const sortedBookingsByRoomCategories = sortBookingsByRoomCategories({
    bookings,
    roomsCategories,
  });

  // Если в диапазоне выбранной даты заезда и выезда есть хотя бы одна из "недоступных дат"
  if (unavailableBookingDates) {
    if (
      unavailableBookingDates.find(
        (i: UnavailableBookingDateType) =>
          moment(i.date).isBetween(moment(arrivalDate), moment(departureDate)),
        "[]"
      )
    ) {
      return [];
    }
  }

  if (roomsCategories && sortedBookingsByRoomCategories) {
    const categoriesAvailableRoomsCount: RoomCategoryPriceType[] = [];

    Object.entries(sortedBookingsByRoomCategories).map((item: any, index) => {
      const bookingCategoryId: string = item[0];
      const bookingsOnCategory = item[1];

      // Поиск "категории комнат" по id
      const categoryRoom = roomsCategories.find(
        (roomCategory: RoomCategoryType) =>
          roomCategory._id === bookingCategoryId
      );

      if (categoryRoom) {
        // Получение общего количество комнат на "категорию комнат"
        const categoryRoomCount = categoryRoom.room_id.length;

        let bookedOnDateCount = 0;

        bookingsOnCategory.map((i: BookingType) => {
          // Подсчет ранее забронированных комнат, диапазону ("дата заезда/выезда")
          // которых принадлежит дата (с фильтра), переданная в ф-цию
          // (а значит на эту дату можно забронировать меньше комнат или вообще ни одной)
          if (
            isDateTimeRangeContained({
              start1: moment(arrivalDate.format(dateFormat)),
              end1: moment(departureDate.format(dateFormat)),
              start2: moment(moment(i.arrival_datetime).format(dateFormat)),
              end2: moment(moment(i.departure_datetime).format(dateFormat)),
            })
          ) {
            bookedOnDateCount += 1;
          }
        });

        // Подсчет новых букингов с "датой заезда/выезда", которая входит в диапазон дат ранее забронированных
        // Записываем количество забронированных комнат в данной "категории комнаты"
        categoriesAvailableRoomsCount.push({
          id: categoryRoom._id,
          roomsTotal: categoryRoomCount,
          price: categoryRoom.price_per_night_for_one_quest,
          earlyBookingsCount: bookedOnDateCount,
          newBookingsIds: [],
        });
      }
    });
    // Получение id "категорий комнат" на которые забронированы комнаты
    const bookedOnCategoriesIds = Object.keys(sortedBookingsByRoomCategories);
    // Добавить "категории комнат" на которые еще нет забронированных комнат
    roomsCategories.map((roomCategory: RoomCategoryType) =>
      !bookedOnCategoriesIds.includes(roomCategory._id)
        ? categoriesAvailableRoomsCount.push({
            id: roomCategory._id,
            roomsTotal: roomCategory.room_id.length,
            price: roomCategory.price_per_night_for_one_quest,
            earlyBookingsCount: 0,
            newBookingsIds: [],
          })
        : roomCategory
    );

    return categoriesAvailableRoomsCount;
  }
  return null;
};

export type CheckDateAvailableType = {
  date: Moment;
  isAvailable: boolean;
  roomMinPrice: number | null;
};

export const checkDateAvailable = ({
  date,
  specificRoomCategoryId,
  unavailableBookingDates,
  bookings,
  roomsCategories,
}: {
  date: Moment;
  specificRoomCategoryId?: string;
  unavailableBookingDates: UnavailableBookingDateType[];
  bookings: BookingType[];
  roomsCategories: RoomCategoryType[];
}): CheckDateAvailableType | null => {
  if (unavailableBookingDates) {
    // Определение доступных категорий комнат
    const categoriesAvailableRoomsCount = getCategoriesAvailableRoomsCount({
      unavailableBookingDates,
      bookings,
      roomsCategories: roomsCategories,
      arrivalDate: date,
      departureDate: date.add(1, "days"),
    });

    if (categoriesAvailableRoomsCount && categoriesAvailableRoomsCount.length) {
      if (specificRoomCategoryId) {
        const exist = categoriesAvailableRoomsCount.find(
          (i) => i.id === specificRoomCategoryId
        );

        return {
          date,
          isAvailable: exist ? true : false,
          roomMinPrice: exist ? exist.price : -1,
        };
      }
      // Определение минимальной стоимости комнаты
      const prices = Array.from(categoriesAvailableRoomsCount, (i) => i.price);
      const roomMinPrice = Math.min(...prices);

      return {
        date,
        isAvailable:
          !unavailableBookingDates.find(
            (i) => i.date === date.format(dateFormat)
          ) && categoriesAvailableRoomsCount.length > 0,
        roomMinPrice,
      };
    }
  }

  return null;
};
