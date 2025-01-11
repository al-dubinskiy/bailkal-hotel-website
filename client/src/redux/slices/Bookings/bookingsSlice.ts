import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BookingStepType,
  BookingType,
  BookingUserInfoType,
  CreateBookingApiResponseType,
  CreateBookingLocalType,
  CreateBookingType,
  FiltersParamsType,
  GetBookingsApiResponseType,
  NewBookingsType,
  RoomCategoryPriceType,
  UpdateBookingApiResponseType,
  UpdateBookingType,
} from "./types";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "./httpRequests";
import { RoomCategoryType } from "../RoomsCategories/types";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { times } from "../../../pages/Booking/components/EnterGuestsDetailsSection/components/constants";
import { Bounce, toast } from "react-toastify";
import { toastMessage } from "../../../pages/utils";

const DEBUG = true;

// API requests
export const GetBookings = createAsyncThunk(
  "bookings/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getBookings.url}`, {
        method: getBookings.method,
        headers: {
          ...getBookings.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetBookings (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetBookings (API error): " + err);
    }
  }
);

export const CreateBooking = createAsyncThunk(
  "bookings/create",
  async (
    payload: {
      bookings: CreateBookingType[];
    },
    thunkAPI
  ) => {
    try {
      const { bookings } = payload;

      const res = await fetch(`${createBooking.url}`, {
        method: createBooking.method,
        headers: {
          ...createBooking.headers,
        },
        body: JSON.stringify(bookings),
      });

      if (res.status === 201) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateBooking (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateBooking (API error): " + err);
    }
  }
);

export const UpdateBooking = createAsyncThunk(
  "bookings/update",
  async (
    payload: {
      booking: UpdateBookingType;
    },
    thunkAPI
  ) => {
    try {
      const { booking } = payload;

      const res = await fetch(`${updateBooking.url}/${booking._id}`, {
        method: updateBooking.method,
        headers: {
          ...updateBooking.headers,
        },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateBooking (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateBooking (API error): " + err);
    }
  }
);

export const DeleteBooking = createAsyncThunk(
  "bookings/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteBooking.url}/${id}`, {
        method: deleteBooking.method,
        headers: {
          ...deleteBooking.headers,
        },
      });

      if (res.ok) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteBooking (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteBooking (API error): " + err);
    }
  }
);

interface IBookingState {
  roomGuestsMax: number;
  bookings: BookingType[] | null;
  getBookings: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createBooking: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateBooking: {
    data: BookingType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteBooking: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  /* --- Booking page --- */
  // ... add/remove new bookings drafts
  newBookings: NewBookingsType;
  currentBooking: CreateBookingLocalType | null;
  currentRoomCategory: RoomCategoryType | null;
  bookingSteps: BookingStepType[];
  filterParams: FiltersParamsType;
  categoriesAvailableRoomsCount: RoomCategoryPriceType[] | null;
}

const initialState: IBookingState = {
  roomGuestsMax: 2,
  bookings: null,
  getBookings: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createBooking: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateBooking: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteBooking: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  /* --- Booking page --- */
  // ... add/remove new bookings drafts
  newBookings: {
    bookings: [],
    actionType: "",
  },
  currentBooking: null,
  currentRoomCategory: null,
  bookingSteps: [],
  filterParams: {
    arrivalDate: moment(),
    departureDate: moment().add(1, "days"),
    rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
  },
  categoriesAvailableRoomsCount: null,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNewBookings: (state, { payload }: { payload: NewBookingsType }) => {
      state.newBookings = payload;
    },
    setCurrentBooking: (
      state,
      { payload }: { payload: CreateBookingLocalType | null }
    ) => {
      state.currentBooking = payload;
    },
    setCurrentRoomCategory: (
      state,
      { payload }: { payload: RoomCategoryType | null }
    ) => {
      state.currentRoomCategory = payload;
    },
    setBookingSteps: (state, { payload }: { payload: BookingStepType[] }) => {
      state.bookingSteps = payload;
    },
    setFilterParams: (state, { payload }: { payload: FiltersParamsType }) => {
      state.filterParams = payload;
    },
    setCategoriesAvailableRoomsCount: (
      state,
      { payload }: { payload: RoomCategoryPriceType[] | null }
    ) => {
      state.categoriesAvailableRoomsCount = payload;
    },
    resetCreateBookingState: (state) => {
      state.createBooking.successMessage = null;
      state.createBooking.error = null;
    },
    resetUpdateBookingState: (state) => {
      state.updateBooking.successMessage = null;
      state.updateBooking.error = null;
    },
    resetDeleteBookingState: (state) => {
      state.deleteBooking.successMessage = null;
      state.deleteBooking.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      GetBookings.fulfilled,
      (state, { payload }: { payload: GetBookingsApiResponseType }) => {
        state.getBookings.isLoading = false;
        const bookings = payload.data;
        state.bookings = bookings;

        if (DEBUG) console.log("GetBookings (API): bookings was recieved.");
      }
    );
    builder.addCase(GetBookings.pending, (state, { payload }) => {
      state.getBookings.error = "";
      state.getBookings.isLoading = true;
    });
    builder.addCase(GetBookings.rejected, (state, { payload }) => {
      state.getBookings.isLoading = false;
      state.getBookings.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateBooking.fulfilled,
      (state, { payload }: { payload: CreateBookingApiResponseType }) => {
        state.createBooking.successMessage = "CreateBooking (API): success";
        state.createBooking.isLoading = false;
        const bookings = payload.data;

        if (state.bookings) {
          state.bookings.push(...bookings);
        } else {
          state.bookings = bookings;
        }

        toast.success("Новый букинг был успешно создан!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          type: "success",
        });

        if (DEBUG) console.log("CreateBooking (API): booking was created.");
      }
    );
    builder.addCase(CreateBooking.pending, (state, { payload }) => {
      state.createBooking.error = "";
      state.createBooking.isLoading = true;
      state.createBooking.successMessage = null;
    });
    builder.addCase(CreateBooking.rejected, (state, { payload }) => {
      state.createBooking.isLoading = false;
      state.createBooking.error = payload;
      state.createBooking.successMessage = null;
      toastMessage({
        label: "Во время создания бронирования произошла ошибка!",
        type: "error",
      });
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateBooking.fulfilled,
      (state, { payload }: { payload: UpdateBookingApiResponseType }) => {
        state.updateBooking.isLoading = false;
        const updatedBooking = payload.data;
        if (state.bookings)
          state.bookings = state.bookings.map((booking) => {
            return booking._id === updatedBooking._id
              ? updatedBooking
              : booking;
          });
        state.updateBooking.successMessage = "Success";
        toastMessage({
          label: "Данные букинга были успешно обновлены!",
          type: "success",
        });
        if (DEBUG) console.log("UpdateBooking (API): booking was updated.");
      }
    );
    builder.addCase(UpdateBooking.pending, (state, { payload }) => {
      state.updateBooking.error = "";
      state.updateBooking.isLoading = true;
      state.updateBooking.successMessage = null;
    });
    builder.addCase(UpdateBooking.rejected, (state, { payload }) => {
      state.updateBooking.isLoading = false;
      state.updateBooking.error = payload;
      state.updateBooking.successMessage = null;
      toastMessage({
        label: "Во время обновления данных бронирования произошла ошибка!",
        type: "error",
      });
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteBooking.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.deleteBooking.isLoading = false;
        if (state.bookings)
          state.bookings = state.bookings.filter(
            (booking) => booking._id !== payload.id
          );
        state.deleteBooking.successMessage = "Success";
        toastMessage({
          label: "Бронирования было успешно удалено!",
          type: "success",
        });
        if (DEBUG) console.log("DeleteBooking (API): booking was deleted.");
      }
    );
    builder.addCase(DeleteBooking.pending, (state, { payload }) => {
      state.deleteBooking.error = "";
      state.deleteBooking.isLoading = true;
      state.deleteBooking.successMessage = null;
    });
    builder.addCase(DeleteBooking.rejected, (state, { payload }) => {
      state.deleteBooking.isLoading = false;
      state.deleteBooking.error = payload;
      state.deleteBooking.successMessage = null;
      toastMessage({
        label: "Во время удаления бронирования произошла ошибка!",
        type: "error",
      });
      if (DEBUG) console.log(payload);
    });
  },
});

export const {
  // setBookingUserInfo,
  setNewBookings,
  setCurrentBooking,
  setCurrentRoomCategory,
  setBookingSteps,
  setFilterParams,
  setCategoriesAvailableRoomsCount,
  resetCreateBookingState,
  resetUpdateBookingState,
  resetDeleteBookingState,
} = bookingsSlice.actions;
