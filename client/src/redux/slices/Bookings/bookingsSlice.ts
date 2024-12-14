import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BookingType,
  CreateBookingApiResponseType,
  CreateBookingLocalType,
  CreateBookingType,
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

const DEBUG = true;

// API requests
export const GetBookings = createAsyncThunk(
  "bookings/getAll",
  async (_, thunkAPI) => {
    try {
      console.log(getBookings.url);
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
      booking: CreateBookingType;
    },
    thunkAPI
  ) => {
    try {
      const { booking } = payload;

      const res = await fetch(`${createBooking.url}`, {
        method: createBooking.method,
        headers: {
          ...createBooking.headers,
        },
        body: JSON.stringify(booking),
      });

      if (res.status === 200) {
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
  roomQuestsMax: number;
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
}

const initialState: IBookingState = {
  roomQuestsMax: 2,
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
        state.createBooking.isLoading = false;
        const booking = payload.data;
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

export const { setNewBookings, setCurrentBooking, setCurrentRoomCategory } =
  bookingsSlice.actions;
