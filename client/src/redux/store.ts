import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "./slices/Bookings/bookingsSlice";
import { roomsCategoriesSlice } from "./slices/RoomsCategories/roomsCategoriesSlice";
import { roomsSlice } from "./slices/Rooms/roomsSlice";
import { bookingTariffsSlice } from "./slices/BookingTariffs/bookingTariffsSlice";
import { bookingServicesSlice } from "./slices/BookingServices/bookingServicesSlice";
import { paymentMethodsSlice } from "./slices/PaymentMethods/paymentMethodsSlice";
import { transfersVariantsSlice } from "./slices/TransferVariants/transferVariantsSlice";
import { roomBedVariantsSlice } from "./slices/RoomBedVariants/roomBedVariantsSlice";
import { viewsFromRoomWindowSlice } from "./slices/ViewsFromRoomWindow/viewsFromRoomWindow";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
    roomsCategories: roomsCategoriesSlice.reducer,
    rooms: roomsSlice.reducer,
    roomBedVariants: roomBedVariantsSlice.reducer,
    viewsFromRoomWindow: viewsFromRoomWindowSlice.reducer,
    bookingTariffs: bookingTariffsSlice.reducer,
    bookingServices: bookingServicesSlice.reducer,
    paymentMethods: paymentMethodsSlice.reducer,
    transfersVariants: transfersVariantsSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
