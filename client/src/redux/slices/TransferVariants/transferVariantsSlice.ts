import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransferVariant,
  deleteTransferVariant,
  getTransferVariants,
  updateTransferVariant,
} from "./httpRequests";
import {
  CreateTransferVariantApiResponseType,
  CreateTransferVariantType,
  GetTransferVariantsApiResponseType,
  TransferVariantType,
  UpdateTransferVariantApiResponseType,
  UpdateTransferVariantType,
} from "./types";

const DEBUG = true;

// API requests
export const GetTransferVariants = createAsyncThunk(
  "transferVariants/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getTransferVariants.url}`, {
        method: getTransferVariants.method,
        headers: {
          ...getTransferVariants.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetTransferVariants (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "GetTransferVariants (API error): " + err
      );
    }
  }
);

export const CreateTransferVariant = createAsyncThunk(
  "transferVariants/create",
  async (
    payload: {
      transferVariant: CreateTransferVariantType;
    },
    thunkAPI
  ) => {
    try {
      const { transferVariant } = payload;

      const res = await fetch(`${createTransferVariant.url}`, {
        method: createTransferVariant.method,
        headers: {
          ...createTransferVariant.headers,
        },
        body: JSON.stringify(transferVariant),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateTransferVariant (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateTransferVariant (API error): " + err
      );
    }
  }
);

export const UpdateTransferVariant = createAsyncThunk(
  "transferVariants/update",
  async (
    payload: {
      transferVariant: UpdateTransferVariantType;
    },
    thunkAPI
  ) => {
    try {
      const { transferVariant } = payload;

      const res = await fetch(`${updateTransferVariant.url}`, {
        method: updateTransferVariant.method,
        headers: {
          ...updateTransferVariant.headers,
        },
        body: JSON.stringify(transferVariant),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateTransferVariant (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateTransferVariant (API error): " + err
      );
    }
  }
);

export const DeleteTransferVariant = createAsyncThunk(
  "transferVariants/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteTransferVariant.url}/${id}`, {
        method: deleteTransferVariant.method,
        headers: {
          ...deleteTransferVariant.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteTransferVariant (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteTransferVariant (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  transferVariants: TransferVariantType[] | null;
  getTransferVariants: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createTransferVariant: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateTransferVariant: {
    data: TransferVariantType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteTransferVariant: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  transferVariants: null,
  getTransferVariants: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createTransferVariant: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateTransferVariant: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteTransferVariant: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const transfersVariantsSlice = createSlice({
  name: "transferVariants",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetTransferVariants.fulfilled,
      (state, { payload }: { payload: GetTransferVariantsApiResponseType }) => {
        state.getTransferVariants.isLoading = false;
        const transferVariants = payload.data;
        state.transferVariants = transferVariants;

        if (DEBUG)
          console.log(
            "GetTransferVariantVariants (API): rooms types was recieved."
          );
      }
    );
    builder.addCase(GetTransferVariants.pending, (state, { payload }) => {
      state.getTransferVariants.error = "";
      state.getTransferVariants.isLoading = true;
    });
    builder.addCase(GetTransferVariants.rejected, (state, { payload }) => {
      state.getTransferVariants.isLoading = false;
      state.getTransferVariants.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateTransferVariant.fulfilled,
      (
        state,
        { payload }: { payload: CreateTransferVariantApiResponseType }
      ) => {
        state.createTransferVariant.isLoading = false;
        const transferVariant = payload.data;
        if (state.transferVariants) {
          state.transferVariants.push(transferVariant);
        } else {
          state.transferVariants = [transferVariant];
        }
        if (DEBUG)
          console.log("CreateTransferVariant (API): room type was created.");
      }
    );
    builder.addCase(CreateTransferVariant.pending, (state, { payload }) => {
      state.createTransferVariant.error = "";
      state.createTransferVariant.isLoading = true;
    });
    builder.addCase(CreateTransferVariant.rejected, (state, { payload }) => {
      state.createTransferVariant.isLoading = false;
      state.createTransferVariant.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateTransferVariant.fulfilled,
      (
        state,
        { payload }: { payload: UpdateTransferVariantApiResponseType }
      ) => {
        state.updateTransferVariant.isLoading = false;
        const updatedTransferVariant = payload.data;
        if (state.transferVariants)
          state.transferVariants = state.transferVariants.map(
            (transferVariant) => {
              return transferVariant._id === updatedTransferVariant._id
                ? updatedTransferVariant
                : transferVariant;
            }
          );

        if (DEBUG)
          console.log("UpdateTransferVariant (API): room type was updated.");
      }
    );
    builder.addCase(UpdateTransferVariant.pending, (state, { payload }) => {
      state.updateTransferVariant.error = "";
      state.updateTransferVariant.isLoading = true;
    });
    builder.addCase(UpdateTransferVariant.rejected, (state, { payload }) => {
      state.updateTransferVariant.isLoading = false;
      state.updateTransferVariant.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteTransferVariant.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateTransferVariant.isLoading = false;
        if (state.transferVariants)
          state.transferVariants = state.transferVariants.filter(
            (transferVariant) => transferVariant._id !== payload.id
          );

        if (DEBUG)
          console.log(
            "DeleteTransferVariant (API): room category was deleted."
          );
      }
    );
    builder.addCase(DeleteTransferVariant.pending, (state, { payload }) => {
      state.updateTransferVariant.error = "";
      state.updateTransferVariant.isLoading = true;
    });
    builder.addCase(DeleteTransferVariant.rejected, (state, { payload }) => {
      state.updateTransferVariant.isLoading = false;
      state.updateTransferVariant.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = transfersVariantsSlice.actions;
