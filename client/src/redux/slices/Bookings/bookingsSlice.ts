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

      if (res.status === 200) {
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

      if (res.status === 204) {
        return { id };
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
    arrival_datetime: moment()
      .set("hours", Number(times[0].value.split(":")[0])) // 07:00
      .set("minutes", Number(times[0].value.split(":")[1])),
    departure_datetime: moment()
      .add(1, "days")
      .set("hours", Number(times[8].value.split(":")[0])) // 15:00
      .set("minutes", Number(times[8].value.split(":")[1])),
    rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
  },
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
    resetCreateBookingState: (state) => {
      state.createBooking.successMessage = null;
      state.createBooking.error = null;
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
        const booking = payload.data;
        console.log("ffff", booking);
        console.log("ffffff", state.bookings);
        if (state.bookings) {
          state.bookings.push(booking);
        } else {
          state.bookings = [booking];
        }
        if (DEBUG) console.log("CreateBooking (API): booking was created.");
      }
    );
    builder.addCase(CreateBooking.pending, (state, { payload }) => {
      state.createBooking.error = "";
      state.createBooking.isLoading = true;
    });
    builder.addCase(CreateBooking.rejected, (state, { payload }) => {
      state.createBooking.isLoading = false;
      state.createBooking.error = payload;
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

        if (DEBUG) console.log("CreateBooking (API): booking was updated.");
      }
    );
    builder.addCase(UpdateBooking.pending, (state, { payload }) => {
      state.updateBooking.error = "";
      state.updateBooking.isLoading = true;
    });
    builder.addCase(UpdateBooking.rejected, (state, { payload }) => {
      state.updateBooking.isLoading = false;
      state.updateBooking.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteBooking.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateBooking.isLoading = false;
        if (state.bookings)
          state.bookings = state.bookings.filter(
            (booking) => booking._id !== payload.id
          );

        if (DEBUG) console.log("CreateBooking (API): booking was deleted.");
      }
    );
    builder.addCase(DeleteBooking.pending, (state, { payload }) => {
      state.updateBooking.error = "";
      state.updateBooking.isLoading = true;
    });
    builder.addCase(DeleteBooking.rejected, (state, { payload }) => {
      state.updateBooking.isLoading = false;
      state.updateBooking.error = payload;
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
  resetCreateBookingState,
} = bookingsSlice.actions;
