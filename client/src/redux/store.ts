import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "./slices/Bookings/bookingsSlice";
import { roomsCategoriesSlice } from "./slices/RoomsCategories/roomsCategoriesSlice";
import { roomsSlice } from "./slices/Rooms/roomsSlice";
import { bookingTariffsSlice } from "./slices/BookingTariffs/bookingTariffsSlice";
import { bookingServicesSlice } from "./slices/BookingServices/bookingServicesSlice";
import { paymentMethodsSlice } from "./slices/PaymentMethods/paymentMethodsSlice";
import { transfersSlice } from "./slices/Transfers/transfersSlice";
import { bedTypesSlice } from "./slices/BedTypes/bedTypesSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
    roomsCategories: roomsCategoriesSlice.reducer,
    rooms: roomsSlice.reducer,
    bedTypes: bedTypesSlice.reducer,
    bookingTariffs: bookingTariffsSlice.reducer,
    bookingServices: bookingServicesSlice.reducer,
    paymentMethods: paymentMethodsSlice.reducer,
    transfersSlice: transfersSlice.reducer,
  },
});
