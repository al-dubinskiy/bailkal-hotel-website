import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUnavailableBookingDate,
  deleteUnavailableBookingDate,
  getUnavailableBookingDates,
  updateUnavailableBookingDate,
} from "./httpRequests";
import {
  CreateUnavailableBookingDateApiResponseType,
  CreateUnavailableBookingDateType,
  GetUnavailableBookingDatesApiResponseType,
  UnavailableBookingDateType,
  UpdateUnavailableBookingDateApiResponseType,
  UpdateUnavailableBookingDateType,
} from "./types";

const DEBUG = true;

// API requests
export const GetUnavailableBookingDates = createAsyncThunk(
  "unavailableBookingDates/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getUnavailableBookingDates.url}`, {
        method: getUnavailableBookingDates.method,
        headers: {
          ...getUnavailableBookingDates.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetUnavailableBookingDates (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "GetUnavailableBookingDates (API error): " + err
      );
    }
  }
);

export const CreateUnavailableBookingDate = createAsyncThunk(
  "unavailableBookingDates/create",
  async (
    payload: {
      unavailableBookingDate: CreateUnavailableBookingDateType;
    },
    thunkAPI
  ) => {
    try {
      const { unavailableBookingDate } = payload;

      const res = await fetch(`${createUnavailableBookingDate.url}`, {
        method: createUnavailableBookingDate.method,
        headers: {
          ...createUnavailableBookingDate.headers,
        },
        body: JSON.stringify(unavailableBookingDate),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateUnavailableBookingDate (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateUnavailableBookingDate (API error): " + err
      );
    }
  }
);

export const UpdateUnavailableBookingDate = createAsyncThunk(
  "unavailableBookingDates/update",
  async (
    payload: {
      unavailableBookingDate: UpdateUnavailableBookingDateType;
    },
    thunkAPI
  ) => {
    try {
      const { unavailableBookingDate } = payload;

      const res = await fetch(`${updateUnavailableBookingDate.url}`, {
        method: updateUnavailableBookingDate.method,
        headers: {
          ...updateUnavailableBookingDate.headers,
        },
        body: JSON.stringify(unavailableBookingDate),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateUnavailableBookingDate (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateUnavailableBookingDate (API error): " + err
      );
    }
  }
);

export const DeleteUnavailableBookingDate = createAsyncThunk(
  "unavailableBookingDates/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteUnavailableBookingDate.url}/${id}`, {
        method: deleteUnavailableBookingDate.method,
        headers: {
          ...deleteUnavailableBookingDate.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteUnavailableBookingDate (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteUnavailableBookingDate (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  unavailableBookingDates: UnavailableBookingDateType[] | null;
  getUnavailableBookingDates: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createUnavailableBookingDate: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateUnavailableBookingDate: {
    data: UnavailableBookingDateType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteUnavailableBookingDate: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  unavailableBookingDates: null,
  getUnavailableBookingDates: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createUnavailableBookingDate: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateUnavailableBookingDate: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteUnavailableBookingDate: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const unavailableBookingDatesSlice = createSlice({
  name: "unavailableBookingDates",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetUnavailableBookingDates.fulfilled,
      (
        state,
        { payload }: { payload: GetUnavailableBookingDatesApiResponseType }
      ) => {
        state.getUnavailableBookingDates.isLoading = false;
        const unavailableBookingDates = payload.data;
        state.unavailableBookingDates = unavailableBookingDates;

        if (DEBUG)
          console.log(
            "GetUnavailableBookingDates (API): rooms types was recieved."
          );
      }
    );
    builder.addCase(
      GetUnavailableBookingDates.pending,
      (state, { payload }) => {
        state.getUnavailableBookingDates.error = "";
        state.getUnavailableBookingDates.isLoading = true;
      }
    );
    builder.addCase(
      GetUnavailableBookingDates.rejected,
      (state, { payload }) => {
        state.getUnavailableBookingDates.isLoading = false;
        state.getUnavailableBookingDates.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
    builder.addCase(
      CreateUnavailableBookingDate.fulfilled,
      (
        state,
        { payload }: { payload: CreateUnavailableBookingDateApiResponseType }
      ) => {
        state.createUnavailableBookingDate.isLoading = false;
        const unavailableBookingDate = payload.data;
        if (state.unavailableBookingDates) {
          state.unavailableBookingDates.push(unavailableBookingDate);
        } else {
          state.unavailableBookingDates = [unavailableBookingDate];
        }
        if (DEBUG)
          console.log(
            "CreateUnavailableBookingDate (API): room type was created."
          );
      }
    );
    builder.addCase(
      CreateUnavailableBookingDate.pending,
      (state, { payload }) => {
        state.createUnavailableBookingDate.error = "";
        state.createUnavailableBookingDate.isLoading = true;
      }
    );
    builder.addCase(
      CreateUnavailableBookingDate.rejected,
      (state, { payload }) => {
        state.createUnavailableBookingDate.isLoading = false;
        state.createUnavailableBookingDate.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
    builder.addCase(
      UpdateUnavailableBookingDate.fulfilled,
      (
        state,
        { payload }: { payload: UpdateUnavailableBookingDateApiResponseType }
      ) => {
        state.updateUnavailableBookingDate.isLoading = false;
        const updatedUnavailableBookingDate = payload.data;
        if (state.unavailableBookingDates)
          state.unavailableBookingDates = state.unavailableBookingDates.map(
            (unavailableBookingDate) => {
              return unavailableBookingDate._id ===
                updatedUnavailableBookingDate._id
                ? updatedUnavailableBookingDate
                : unavailableBookingDate;
            }
          );

        if (DEBUG)
          console.log(
            "UpdateUnavailableBookingDate (API): room type was updated."
          );
      }
    );
    builder.addCase(
      UpdateUnavailableBookingDate.pending,
      (state, { payload }) => {
        state.updateUnavailableBookingDate.error = "";
        state.updateUnavailableBookingDate.isLoading = true;
      }
    );
    builder.addCase(
      UpdateUnavailableBookingDate.rejected,
      (state, { payload }) => {
        state.updateUnavailableBookingDate.isLoading = false;
        state.updateUnavailableBookingDate.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
    builder.addCase(
      DeleteUnavailableBookingDate.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateUnavailableBookingDate.isLoading = false;
        if (state.unavailableBookingDates)
          state.unavailableBookingDates = state.unavailableBookingDates.filter(
            (unavailableBookingDate) =>
              unavailableBookingDate._id !== payload.id
          );

        if (DEBUG)
          console.log(
            "DeleteUnavailableBookingDate (API): room category was deleted."
          );
      }
    );
    builder.addCase(
      DeleteUnavailableBookingDate.pending,
      (state, { payload }) => {
        state.updateUnavailableBookingDate.error = "";
        state.updateUnavailableBookingDate.isLoading = true;
      }
    );
    builder.addCase(
      DeleteUnavailableBookingDate.rejected,
      (state, { payload }) => {
        state.updateUnavailableBookingDate.isLoading = false;
        state.updateUnavailableBookingDate.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
  },
});

export const {} = unavailableBookingDatesSlice.actions;
