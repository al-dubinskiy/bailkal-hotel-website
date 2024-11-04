import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransfer,
  deleteTransfer,
  getTransfers,
  updateTransfer,
} from "./httpRequests";
import {
  CreateTransferApiResponseType,
  CreateTransferType,
  GetTransfersApiResponseType,
  TransferType,
  UpdateTransferApiResponseType,
  UpdateTransferType,
} from "./types";

const DEBUG = true;

// API requests
export const GetTransfers = createAsyncThunk(
  "transfers/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getTransfers.url}`, {
        method: getTransfers.method,
        headers: {
          ...getTransfers.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetTransfers (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetTransfers (API error): " + err);
    }
  }
);

export const CreateTransfer = createAsyncThunk(
  "transfers/create",
  async (
    payload: {
      transfer: CreateTransferType;
    },
    thunkAPI
  ) => {
    try {
      const { transfer } = payload;

      const res = await fetch(`${createTransfer.url}`, {
        method: createTransfer.method,
        headers: {
          ...createTransfer.headers,
        },
        body: JSON.stringify(transfer),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateTransfer (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateTransfer (API error): " + err);
    }
  }
);

export const UpdateTransfer = createAsyncThunk(
  "transfers/update",
  async (
    payload: {
      transfer: UpdateTransferType;
    },
    thunkAPI
  ) => {
    try {
      const { transfer } = payload;

      const res = await fetch(`${updateTransfer.url}`, {
        method: updateTransfer.method,
        headers: {
          ...updateTransfer.headers,
        },
        body: JSON.stringify(transfer),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateTransfer (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateTransfer (API error): " + err);
    }
  }
);

export const DeleteTransfer = createAsyncThunk(
  "transfers/delete",
  async (
    payload: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteTransfer.url}/${id}`, {
        method: deleteTransfer.method,
        headers: {
          ...deleteTransfer.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteTransfer (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteTransfer (API error): " + err);
    }
  }
);

interface IRoomTypeState {
  transfers: TransferType[] | null;
  getTransfers: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  getTransfer: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createTransfer: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateTransfer: {
    data: TransferType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteTransfer: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  transfers: null,
  getTransfers: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  getTransfer: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createTransfer: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateTransfer: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteTransfer: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const transfersSlice = createSlice({
  name: "transfers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetTransfers.fulfilled,
      (state, { payload }: { payload: GetTransfersApiResponseType }) => {
        state.getTransfers.isLoading = false;
        const transfers = payload.data;
        state.transfers = transfers;

        if (DEBUG) console.log("GetTransfers (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetTransfers.pending, (state, { payload }) => {
      state.getTransfers.error = "";
      state.getTransfers.isLoading = true;
    });
    builder.addCase(GetTransfers.rejected, (state, { payload }) => {
      state.getTransfers.isLoading = false;
      state.getTransfers.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateTransfer.fulfilled,
      (state, { payload }: { payload: CreateTransferApiResponseType }) => {
        state.createTransfer.isLoading = false;
        const transfer = payload.data;
        if (state.transfers) {
          state.transfers.push(transfer);
        } else {
          state.transfers = [transfer];
        }
        if (DEBUG) console.log("CreateTransfer (API): room type was created.");
      }
    );
    builder.addCase(CreateTransfer.pending, (state, { payload }) => {
      state.createTransfer.error = "";
      state.createTransfer.isLoading = true;
    });
    builder.addCase(CreateTransfer.rejected, (state, { payload }) => {
      state.createTransfer.isLoading = false;
      state.createTransfer.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateTransfer.fulfilled,
      (state, { payload }: { payload: UpdateTransferApiResponseType }) => {
        state.updateTransfer.isLoading = false;
        const updatedTransfer = payload.data;
        if (state.transfers)
          state.transfers = state.transfers.map((transfer) => {
            return transfer.id === updatedTransfer.id
              ? updatedTransfer
              : transfer;
          });

        if (DEBUG) console.log("UpdateTransfer (API): room type was updated.");
      }
    );
    builder.addCase(UpdateTransfer.pending, (state, { payload }) => {
      state.updateTransfer.error = "";
      state.updateTransfer.isLoading = true;
    });
    builder.addCase(UpdateTransfer.rejected, (state, { payload }) => {
      state.updateTransfer.isLoading = false;
      state.updateTransfer.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteTransfer.fulfilled,
      (state, { payload }: { payload: { id: number } }) => {
        state.updateTransfer.isLoading = false;
        if (state.transfers)
          state.transfers = state.transfers.filter(
            (transfer) => transfer.id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteTransfer (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteTransfer.pending, (state, { payload }) => {
      state.updateTransfer.error = "";
      state.updateTransfer.isLoading = true;
    });
    builder.addCase(DeleteTransfer.rejected, (state, { payload }) => {
      state.updateTransfer.isLoading = false;
      state.updateTransfer.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = transfersSlice.actions;
