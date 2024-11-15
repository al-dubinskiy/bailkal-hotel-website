import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransferCar,
  deleteTransferCar,
  getTransferCars,
  updateTransferCar,
} from "./httpRequests";
import {
  CreateTransferCarApiResponseType,
  CreateTransferCarType,
  GetTransferCarsApiResponseType,
  TransferCarType,
  UpdateTransferCarApiResponseType,
  UpdateTransferCarType,
} from "./types";

const DEBUG = true;

// API requests
export const GetTransferCars = createAsyncThunk(
  "transferCars/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getTransferCars.url}`, {
        method: getTransferCars.method,
        headers: {
          ...getTransferCars.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetTransferCars (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetTransferCars (API error): " + err);
    }
  }
);

export const CreateTransferCar = createAsyncThunk(
  "transferCars/create",
  async (
    payload: {
      transferCar: CreateTransferCarType;
    },
    thunkAPI
  ) => {
    try {
      const { transferCar } = payload;

      const res = await fetch(`${createTransferCar.url}`, {
        method: createTransferCar.method,
        headers: {
          ...createTransferCar.headers,
        },
        body: JSON.stringify(transferCar),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateTransferCar (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateTransferCar (API error): " + err);
    }
  }
);

export const UpdateTransferCar = createAsyncThunk(
  "transferCars/update",
  async (
    payload: {
      transferCar: UpdateTransferCarType;
    },
    thunkAPI
  ) => {
    try {
      const { transferCar } = payload;

      const res = await fetch(`${updateTransferCar.url}`, {
        method: updateTransferCar.method,
        headers: {
          ...updateTransferCar.headers,
        },
        body: JSON.stringify(transferCar),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateTransferCar (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateTransferCar (API error): " + err);
    }
  }
);

export const DeleteTransferCar = createAsyncThunk(
  "transferCars/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteTransferCar.url}/${id}`, {
        method: deleteTransferCar.method,
        headers: {
          ...deleteTransferCar.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteTransferCar (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteTransferCar (API error): " + err);
    }
  }
);

interface IRoomTypeState {
  transferCars: TransferCarType[] | null;
  getTransferCars: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createTransferCar: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateTransferCar: {
    data: TransferCarType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteTransferCar: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  transferCars: null,
  getTransferCars: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createTransferCar: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateTransferCar: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteTransferCar: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const transfersVariantsSlice = createSlice({
  name: "transferCars",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetTransferCars.fulfilled,
      (state, { payload }: { payload: GetTransferCarsApiResponseType }) => {
        state.getTransferCars.isLoading = false;
        const transferCars = payload.data;
        state.transferCars = transferCars;

        if (DEBUG)
          console.log(
            "GetTransferCarVariants (API): rooms types was recieved."
          );
      }
    );
    builder.addCase(GetTransferCars.pending, (state, { payload }) => {
      state.getTransferCars.error = "";
      state.getTransferCars.isLoading = true;
    });
    builder.addCase(GetTransferCars.rejected, (state, { payload }) => {
      state.getTransferCars.isLoading = false;
      state.getTransferCars.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateTransferCar.fulfilled,
      (state, { payload }: { payload: CreateTransferCarApiResponseType }) => {
        state.createTransferCar.isLoading = false;
        const transferCar = payload.data;
        if (state.transferCars) {
          state.transferCars.push(transferCar);
        } else {
          state.transferCars = [transferCar];
        }
        if (DEBUG)
          console.log("CreateTransferCar (API): room type was created.");
      }
    );
    builder.addCase(CreateTransferCar.pending, (state, { payload }) => {
      state.createTransferCar.error = "";
      state.createTransferCar.isLoading = true;
    });
    builder.addCase(CreateTransferCar.rejected, (state, { payload }) => {
      state.createTransferCar.isLoading = false;
      state.createTransferCar.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateTransferCar.fulfilled,
      (state, { payload }: { payload: UpdateTransferCarApiResponseType }) => {
        state.updateTransferCar.isLoading = false;
        const updatedTransferCar = payload.data;
        if (state.transferCars)
          state.transferCars = state.transferCars.map((transferCar) => {
            return transferCar._id === updatedTransferCar._id
              ? updatedTransferCar
              : transferCar;
          });

        if (DEBUG)
          console.log("UpdateTransferCar (API): room type was updated.");
      }
    );
    builder.addCase(UpdateTransferCar.pending, (state, { payload }) => {
      state.updateTransferCar.error = "";
      state.updateTransferCar.isLoading = true;
    });
    builder.addCase(UpdateTransferCar.rejected, (state, { payload }) => {
      state.updateTransferCar.isLoading = false;
      state.updateTransferCar.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteTransferCar.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateTransferCar.isLoading = false;
        if (state.transferCars)
          state.transferCars = state.transferCars.filter(
            (transferCar) => transferCar._id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteTransferCar (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteTransferCar.pending, (state, { payload }) => {
      state.updateTransferCar.error = "";
      state.updateTransferCar.isLoading = true;
    });
    builder.addCase(DeleteTransferCar.rejected, (state, { payload }) => {
      state.updateTransferCar.isLoading = false;
      state.updateTransferCar.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = transfersVariantsSlice.actions;
