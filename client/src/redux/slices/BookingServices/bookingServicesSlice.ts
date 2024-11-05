import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBookingService,
  deleteBookingService,
  getBookingServices,
  updateBookingService,
} from "./httpRequests";
import {
  CreateBookingServiceApiResponseType,
  CreateBookingServiceType,
  GetBookingServicesApiResponseType,
  BookingServiceType,
  UpdateBookingServiceApiResponseType,
  UpdateBookingServiceType,
} from "./types";

const DEBUG = true;

// API requests
export const GetBookingServices = createAsyncThunk(
  "bookingServices/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getBookingServices.url}`, {
        method: getBookingServices.method,
        headers: {
          ...getBookingServices.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetBookingServices (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetBookingServices (API error): " + err);
    }
  }
);

export const CreateBookingService = createAsyncThunk(
  "bookingServices/create",
  async (
    payload: {
      bookingService: CreateBookingServiceType;
    },
    thunkAPI
  ) => {
    try {
      const { bookingService } = payload;

      const res = await fetch(`${createBookingService.url}`, {
        method: createBookingService.method,
        headers: {
          ...createBookingService.headers,
        },
        body: JSON.stringify(bookingService),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateBookingService (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateBookingService (API error): " + err
      );
    }
  }
);

export const UpdateBookingService = createAsyncThunk(
  "bookingServices/update",
  async (
    payload: {
      bookingService: UpdateBookingServiceType;
    },
    thunkAPI
  ) => {
    try {
      const { bookingService } = payload;

      const res = await fetch(`${updateBookingService.url}`, {
        method: updateBookingService.method,
        headers: {
          ...updateBookingService.headers,
        },
        body: JSON.stringify(bookingService),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateBookingService (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateBookingService (API error): " + err
      );
    }
  }
);

export const DeleteBookingService = createAsyncThunk(
  "bookingServices/delete",
  async (
    payload: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteBookingService.url}/${id}`, {
        method: deleteBookingService.method,
        headers: {
          ...deleteBookingService.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteBookingService (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteBookingService (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  bookingServices: BookingServiceType[] | null;
  getBookingServices: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createBookingService: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateBookingService: {
    data: BookingServiceType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteBookingService: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  bookingServices: null,
  getBookingServices: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createBookingService: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateBookingService: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteBookingService: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const bookingServicesSlice = createSlice({
  name: "bookingServices",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetBookingServices.fulfilled,
      (state, { payload }: { payload: GetBookingServicesApiResponseType }) => {
        state.getBookingServices.isLoading = false;
        const bookingServices = payload.data;
        state.bookingServices = bookingServices;

        if (DEBUG)
          console.log("GetBookingServices (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetBookingServices.pending, (state, { payload }) => {
      state.getBookingServices.error = "";
      state.getBookingServices.isLoading = true;
    });
    builder.addCase(GetBookingServices.rejected, (state, { payload }) => {
      state.getBookingServices.isLoading = false;
      state.getBookingServices.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateBookingService.fulfilled,
      (
        state,
        { payload }: { payload: CreateBookingServiceApiResponseType }
      ) => {
        state.createBookingService.isLoading = false;
        const bookingService = payload.data;
        if (state.bookingServices) {
          state.bookingServices.push(bookingService);
        } else {
          state.bookingServices = [bookingService];
        }
        if (DEBUG)
          console.log("CreateBookingService (API): room type was created.");
      }
    );
    builder.addCase(CreateBookingService.pending, (state, { payload }) => {
      state.createBookingService.error = "";
      state.createBookingService.isLoading = true;
    });
    builder.addCase(CreateBookingService.rejected, (state, { payload }) => {
      state.createBookingService.isLoading = false;
      state.createBookingService.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateBookingService.fulfilled,
      (
        state,
        { payload }: { payload: UpdateBookingServiceApiResponseType }
      ) => {
        state.updateBookingService.isLoading = false;
        const updatedBookingService = payload.data;
        if (state.bookingServices)
          state.bookingServices = state.bookingServices.map(
            (bookingService) => {
              return bookingService.id === updatedBookingService.id
                ? updatedBookingService
                : bookingService;
            }
          );

        if (DEBUG)
          console.log("UpdateBookingService (API): room type was updated.");
      }
    );
    builder.addCase(UpdateBookingService.pending, (state, { payload }) => {
      state.updateBookingService.error = "";
      state.updateBookingService.isLoading = true;
    });
    builder.addCase(UpdateBookingService.rejected, (state, { payload }) => {
      state.updateBookingService.isLoading = false;
      state.updateBookingService.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteBookingService.fulfilled,
      (state, { payload }: { payload: { id: number } }) => {
        state.updateBookingService.isLoading = false;
        if (state.bookingServices)
          state.bookingServices = state.bookingServices.filter(
            (bookingService) => bookingService.id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteBookingService (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteBookingService.pending, (state, { payload }) => {
      state.updateBookingService.error = "";
      state.updateBookingService.isLoading = true;
    });
    builder.addCase(DeleteBookingService.rejected, (state, { payload }) => {
      state.updateBookingService.isLoading = false;
      state.updateBookingService.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = bookingServicesSlice.actions;
