import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBookingTariff,
  deleteBookingTariff,
  getBookingTariffs,
  updateBookingTariff,
} from "./httpRequests";
import {
  CreateBookingTariffApiResponseType,
  CreateBookingTariffType,
  GetBookingTariffsApiResponseType,
  BookingTariffType,
  UpdateBookingTariffApiResponseType,
  UpdateBookingTariffType,
} from "./types";

const DEBUG = true;

// API requests
export const GetBookingTariffs = createAsyncThunk(
  "bookingTariffs/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getBookingTariffs.url}`, {
        method: getBookingTariffs.method,
        headers: {
          ...getBookingTariffs.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetBookingTariffs (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetBookingTariffs (API error): " + err);
    }
  }
);

export const CreateBookingTariff = createAsyncThunk(
  "bookingTariffs/create",
  async (
    payload: {
      bookingTariff: CreateBookingTariffType;
    },
    thunkAPI
  ) => {
    try {
      const { bookingTariff } = payload;

      const res = await fetch(`${createBookingTariff.url}`, {
        method: createBookingTariff.method,
        headers: {
          ...createBookingTariff.headers,
        },
        body: JSON.stringify(bookingTariff),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateBookingTariff (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateBookingTariff (API error): " + err
      );
    }
  }
);

export const UpdateBookingTariff = createAsyncThunk(
  "bookingTariffs/update",
  async (
    payload: {
      bookingTariff: UpdateBookingTariffType;
    },
    thunkAPI
  ) => {
    try {
      const { bookingTariff } = payload;

      const res = await fetch(`${updateBookingTariff.url}`, {
        method: updateBookingTariff.method,
        headers: {
          ...updateBookingTariff.headers,
        },
        body: JSON.stringify(bookingTariff),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateBookingTariff (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateBookingTariff (API error): " + err
      );
    }
  }
);

export const DeleteBookingTariff = createAsyncThunk(
  "bookingTariffs/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteBookingTariff.url}/${id}`, {
        method: deleteBookingTariff.method,
        headers: {
          ...deleteBookingTariff.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteBookingTariff (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteBookingTariff (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  bookingTariffs: BookingTariffType[] | null;
  getBookingTariffs: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createBookingTariff: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateBookingTariff: {
    data: BookingTariffType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteBookingTariff: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  bookingTariffs: null,
  getBookingTariffs: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createBookingTariff: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateBookingTariff: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteBookingTariff: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const bookingTariffsSlice = createSlice({
  name: "bookingTariffs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetBookingTariffs.fulfilled,
      (state, { payload }: { payload: GetBookingTariffsApiResponseType }) => {
        state.getBookingTariffs.isLoading = false;
        const bookingTariffs = payload.data;
        state.bookingTariffs = bookingTariffs;

        if (DEBUG)
          console.log("GetBookingTariffs (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetBookingTariffs.pending, (state, { payload }) => {
      state.getBookingTariffs.error = "";
      state.getBookingTariffs.isLoading = true;
    });
    builder.addCase(GetBookingTariffs.rejected, (state, { payload }) => {
      state.getBookingTariffs.isLoading = false;
      state.getBookingTariffs.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateBookingTariff.fulfilled,
      (state, { payload }: { payload: CreateBookingTariffApiResponseType }) => {
        state.createBookingTariff.isLoading = false;
        const bookingTariff = payload.data;
        if (state.bookingTariffs) {
          state.bookingTariffs.push(bookingTariff);
        } else {
          state.bookingTariffs = [bookingTariff];
        }
        if (DEBUG)
          console.log("CreateBookingTariff (API): room type was created.");
      }
    );
    builder.addCase(CreateBookingTariff.pending, (state, { payload }) => {
      state.createBookingTariff.error = "";
      state.createBookingTariff.isLoading = true;
    });
    builder.addCase(CreateBookingTariff.rejected, (state, { payload }) => {
      state.createBookingTariff.isLoading = false;
      state.createBookingTariff.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateBookingTariff.fulfilled,
      (state, { payload }: { payload: UpdateBookingTariffApiResponseType }) => {
        state.updateBookingTariff.isLoading = false;
        const updatedBookingTariff = payload.data;
        if (state.bookingTariffs)
          state.bookingTariffs = state.bookingTariffs.map((bookingTariff) => {
            return bookingTariff._id === updatedBookingTariff._id
              ? updatedBookingTariff
              : bookingTariff;
          });

        if (DEBUG)
          console.log("UpdateBookingTariff (API): room type was updated.");
      }
    );
    builder.addCase(UpdateBookingTariff.pending, (state, { payload }) => {
      state.updateBookingTariff.error = "";
      state.updateBookingTariff.isLoading = true;
    });
    builder.addCase(UpdateBookingTariff.rejected, (state, { payload }) => {
      state.updateBookingTariff.isLoading = false;
      state.updateBookingTariff.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteBookingTariff.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateBookingTariff.isLoading = false;
        if (state.bookingTariffs)
          state.bookingTariffs = state.bookingTariffs.filter(
            (bookingTariff) => bookingTariff._id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteBookingTariff (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteBookingTariff.pending, (state, { payload }) => {
      state.updateBookingTariff.error = "";
      state.updateBookingTariff.isLoading = true;
    });
    builder.addCase(DeleteBookingTariff.rejected, (state, { payload }) => {
      state.updateBookingTariff.isLoading = false;
      state.updateBookingTariff.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = bookingTariffsSlice.actions;
