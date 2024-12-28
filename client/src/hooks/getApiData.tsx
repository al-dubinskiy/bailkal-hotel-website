import { useCallback, useEffect, useState } from "react";
import { GetBookingTariffs } from "../redux/slices/BookingTariffs/bookingTariffsSlice";
import { GetViewsFromRoomWindow } from "../redux/slices/ViewsFromRoomWindow/viewsFromRoomWindow";
import { GetRoomFeatures } from "../redux/slices/RoomFeatures/roomFeaturesSlice";
import { GetRoomFeaturesCategories } from "../redux/slices/RoomFeaturesCategories/roomFeaturesSlice";
import { GetBookingServices } from "../redux/slices/BookingServices/bookingServicesSlice";
import { GetPaymentMethods } from "../redux/slices/PaymentMethods/paymentMethodsSlice";
import { GetTransferCars } from "../redux/slices/TransferCars/transferCarsSlice";
import { GetTransferVariants } from "../redux/slices/TransferVariants/transferVariantsSlice";
import { GetRoomBedVariants } from "../redux/slices/RoomBedVariants/roomBedVariantsSlice";
import { GetRooms } from "../redux/slices/Rooms/roomsSlice";
import { GetRoomsCategories } from "../redux/slices/RoomsCategories/roomsCategoriesSlice";
import { GetBookings } from "../redux/slices/Bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { GetUnavailableBookingDates } from "../redux/slices/UnavailableBookingDates/unavailableBookingDates";

export const useGetApiData = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { bookings, getBookings } = useAppSelector((state) => state.bookings);
  const { unavailableBookingDates, getUnavailableBookingDates } =
    useAppSelector((state) => state.unavailableBookingDates);
  const { roomsCategories, getRoomsCategories } = useAppSelector(
    (state) => state.roomsCategories
  );
  const { rooms, getRooms } = useAppSelector((state) => state.rooms);
  const { bookingTariffs, getBookingTariffs } = useAppSelector(
    (state) => state.bookingTariffs
  );
  const { bookingServices, getBookingServices } = useAppSelector(
    (state) => state.bookingServices
  );
  const { roomFeatures, getRoomFeatures } = useAppSelector(
    (state) => state.roomFeatures
  );
  const { roomFeaturesCategories, getRoomFeaturesCategories } = useAppSelector(
    (state) => state.roomFeaturesCategories
  );
  const { roomBedVariants, getRoomRoomBedVariants } = useAppSelector(
    (state) => state.roomBedVariants
  );
  const { viewsFromRoomWindow, getViewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const { paymentMethods, getPaymentMethods } = useAppSelector(
    (state) => state.paymentMethods
  );
  const { transferVariants, getTransferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );
  const { transferCars, getTransferCars } = useAppSelector(
    (state) => state.transfersCars
  );

  // Get data from API
  // Bookings
  const GetBookingsList = useCallback(() => {
    if (!bookings) {
      dispatch(GetBookings());
    }
  }, [bookings]);

  useEffect(() => {
    GetBookingsList();
  }, [GetBookingsList]);

  // Unavailable booking dates
  const GetUnavailableBookingDatesList = useCallback(() => {
    if (!unavailableBookingDates) {
      dispatch(GetUnavailableBookingDates());
    }
  }, [bookings]);

  useEffect(() => {
    GetUnavailableBookingDatesList();
  }, [GetUnavailableBookingDatesList]);

  // Rooms categories
  const GetRoomsCategoriesList = useCallback(() => {
    if (!roomsCategories) {
      dispatch(GetRoomsCategories());
    }
  }, [roomsCategories]);

  useEffect(() => {
    GetRoomsCategoriesList();
  }, [GetRoomsCategoriesList]);

  // All rooms list
  const GetRoomsList = useCallback(() => {
    if (!rooms) {
      dispatch(GetRooms());
    }
  }, [rooms]);

  useEffect(() => {
    GetRoomsList();
  }, [GetRoomsList]);

  // Room bed variants
  const GetRoomBedVariantsList = useCallback(() => {
    if (!roomBedVariants) {
      dispatch(GetRoomBedVariants());
    }
  }, [roomBedVariants]);

  useEffect(() => {
    GetRoomBedVariantsList();
  }, [GetRoomBedVariantsList]);

  // Get views from room window
  const GetViewsFromRoomWindowList = useCallback(() => {
    if (!viewsFromRoomWindow) {
      dispatch(GetViewsFromRoomWindow());
    }
  }, [viewsFromRoomWindow]);

  useEffect(() => {
    GetViewsFromRoomWindowList();
  }, [GetViewsFromRoomWindowList]);

  // Get payment methods
  const GetPaymentMethodsList = useCallback(() => {
    if (!paymentMethods) {
      dispatch(GetPaymentMethods());
    }
  }, [paymentMethods]);

  useEffect(() => {
    GetPaymentMethodsList();
  }, [GetPaymentMethodsList]);

  // Transfer
  const GetTransferVariantsList = useCallback(() => {
    if (!transferVariants) {
      dispatch(GetTransferVariants());
    }
  }, [transferVariants]);

  useEffect(() => {
    GetTransferVariantsList();
  }, [GetTransferVariantsList]);

  // Trasfer cars
  const GetTransferCarsList = useCallback(() => {
    if (!transferCars) {
      dispatch(GetTransferCars());
    }
  }, [transferCars]);

  useEffect(() => {
    GetTransferCarsList();
  }, [GetTransferCarsList]);

  // Bookings tariffs
  const GetBookingsTariffsList = useCallback(() => {
    if (!bookingTariffs) {
      dispatch(GetBookingTariffs());
    }
  }, [bookingTariffs]);

  useEffect(() => {
    GetBookingsTariffsList();
  }, [GetBookingsTariffsList]);

  // Bookings services
  const GetBookingsServicesList = useCallback(() => {
    if (!bookingServices) {
      dispatch(GetBookingServices());
    }
  }, [bookingServices]);

  useEffect(() => {
    GetBookingsServicesList();
  }, [GetBookingsServicesList]);

  // Rooms features
  const GetRoomsFeaturesList = useCallback(() => {
    if (!roomFeatures) {
      dispatch(GetRoomFeatures());
    }
  }, [roomFeatures]);

  useEffect(() => {
    GetRoomsFeaturesList();
  }, [GetRoomsFeaturesList]);

  // Rooms features categories
  const GetFeaturesCategoriesList = useCallback(() => {
    if (!roomFeaturesCategories) {
      dispatch(GetRoomFeaturesCategories());
    }
  }, [roomFeaturesCategories]);

  useEffect(() => {
    GetFeaturesCategoriesList();
  }, [GetFeaturesCategoriesList]);

  useEffect(() => {
    const loadingStatus =
      getBookings.isLoading ||
      getUnavailableBookingDates.isLoading ||
      getRoomsCategories.isLoading ||
      getRooms.isLoading ||
      getBookingTariffs.isLoading ||
      getBookingServices.isLoading ||
      getRoomFeatures.isLoading ||
      getRoomFeaturesCategories.isLoading ||
      getRoomRoomBedVariants.isLoading ||
      getViewsFromRoomWindow.isLoading ||
      getPaymentMethods.isLoading ||
      getTransferVariants.isLoading ||
      getTransferCars.isLoading;

    if (isLoading !== loadingStatus) {
      setIsLoading(loadingStatus);
    }
  }, [
    getBookings.isLoading,
    getUnavailableBookingDates.isLoading,
    getRoomsCategories.isLoading,
    getRooms.isLoading,
    getBookingTariffs.isLoading,
    getBookingServices.isLoading,
    getRoomFeatures.isLoading,
    getRoomFeaturesCategories.isLoading,
    getRoomRoomBedVariants.isLoading,
    getViewsFromRoomWindow.isLoading,
    getPaymentMethods.isLoading,
    getTransferVariants.isLoading,
    getTransferCars.isLoading,
  ]);

  return {
    isLoading,
  };
};
