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
import { unavailableBookingDatesSlice } from "./slices/UnavailableBookingDates/unavailableBookingDates";
import { roomFeaturesSlice } from "./slices/RoomFeatures/roomFeaturesSlice";
import { roomFeaturesCategoriesSlice } from "./slices/RoomFeaturesCategories/roomFeaturesSlice";
import { transfersCarsSlice } from "./slices/TransferCars/transferCarsSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
    roomsCategories: roomsCategoriesSlice.reducer,
    roomFeatures: roomFeaturesSlice.reducer,
    roomFeaturesCategories: roomFeaturesCategoriesSlice.reducer,
    rooms: roomsSlice.reducer,
    roomBedVariants: roomBedVariantsSlice.reducer,
    viewsFromRoomWindow: viewsFromRoomWindowSlice.reducer,
    bookingTariffs: bookingTariffsSlice.reducer,
    bookingServices: bookingServicesSlice.reducer,
    paymentMethods: paymentMethodsSlice.reducer,
    transfersVariants: transfersVariantsSlice.reducer,
    transfersCars: transfersCarsSlice.reducer,
    unavailableBookingDates: unavailableBookingDatesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
