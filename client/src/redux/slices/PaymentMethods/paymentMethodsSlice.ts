import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPaymentMethod,
  deletePaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
} from "./httpRequests";
import {
  CreatePaymentMethodApiResponseType,
  CreatePaymentMethodType,
  GetPaymentMethodsApiResponseType,
  PaymentMethodType,
  UpdatePaymentMethodApiResponseType,
  UpdatePaymentMethodType,
} from "./types";

const DEBUG = true;

// API requests
export const GetPaymentMethods = createAsyncThunk(
  "paymentMethods/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getPaymentMethods.url}`, {
        method: getPaymentMethods.method,
        headers: {
          ...getPaymentMethods.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetPaymentMethods (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetPaymentMethods (API error): " + err);
    }
  }
);

export const CreatePaymentMethod = createAsyncThunk(
  "paymentMethods/create",
  async (
    payload: {
      paymentMethod: CreatePaymentMethodType;
    },
    thunkAPI
  ) => {
    try {
      const { paymentMethod } = payload;

      const res = await fetch(`${createPaymentMethod.url}`, {
        method: createPaymentMethod.method,
        headers: {
          ...createPaymentMethod.headers,
        },
        body: JSON.stringify(paymentMethod),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreatePaymentMethod (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreatePaymentMethod (API error): " + err
      );
    }
  }
);

export const UpdatePaymentMethod = createAsyncThunk(
  "paymentMethods/update",
  async (
    payload: {
      paymentMethod: UpdatePaymentMethodType;
    },
    thunkAPI
  ) => {
    try {
      const { paymentMethod } = payload;

      const res = await fetch(`${updatePaymentMethod.url}`, {
        method: updatePaymentMethod.method,
        headers: {
          ...updatePaymentMethod.headers,
        },
        body: JSON.stringify(paymentMethod),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdatePaymentMethod (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdatePaymentMethod (API error): " + err
      );
    }
  }
);

export const DeletePaymentMethod = createAsyncThunk(
  "paymentMethods/delete",
  async (
    payload: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deletePaymentMethod.url}/${id}`, {
        method: deletePaymentMethod.method,
        headers: {
          ...deletePaymentMethod.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeletePaymentMethod (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeletePaymentMethod (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  paymentMethods: PaymentMethodType[] | null;
  getPaymentMethods: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createPaymentMethod: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updatePaymentMethod: {
    data: PaymentMethodType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deletePaymentMethod: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  paymentMethods: null,
  getPaymentMethods: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createPaymentMethod: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updatePaymentMethod: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deletePaymentMethod: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const paymentMethodsSlice = createSlice({
  name: "paymentMethods",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetPaymentMethods.fulfilled,
      (state, { payload }: { payload: GetPaymentMethodsApiResponseType }) => {
        state.getPaymentMethods.isLoading = false;
        const paymentMethods = payload.data;
        state.paymentMethods = paymentMethods;

        if (DEBUG)
          console.log("GetPaymentMethods (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetPaymentMethods.pending, (state, { payload }) => {
      state.getPaymentMethods.error = "";
      state.getPaymentMethods.isLoading = true;
    });
    builder.addCase(GetPaymentMethods.rejected, (state, { payload }) => {
      state.getPaymentMethods.isLoading = false;
      state.getPaymentMethods.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreatePaymentMethod.fulfilled,
      (state, { payload }: { payload: CreatePaymentMethodApiResponseType }) => {
        state.createPaymentMethod.isLoading = false;
        const paymentMethod = payload.data;
        if (state.paymentMethods) {
          state.paymentMethods.push(paymentMethod);
        } else {
          state.paymentMethods = [paymentMethod];
        }
        if (DEBUG)
          console.log("CreatePaymentMethod (API): room type was created.");
      }
    );
    builder.addCase(CreatePaymentMethod.pending, (state, { payload }) => {
      state.createPaymentMethod.error = "";
      state.createPaymentMethod.isLoading = true;
    });
    builder.addCase(CreatePaymentMethod.rejected, (state, { payload }) => {
      state.createPaymentMethod.isLoading = false;
      state.createPaymentMethod.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdatePaymentMethod.fulfilled,
      (state, { payload }: { payload: UpdatePaymentMethodApiResponseType }) => {
        state.updatePaymentMethod.isLoading = false;
        const updatedPaymentMethod = payload.data;
        if (state.paymentMethods)
          state.paymentMethods = state.paymentMethods.map((paymentMethod) => {
            return paymentMethod.id === updatedPaymentMethod.id
              ? updatedPaymentMethod
              : paymentMethod;
          });

        if (DEBUG)
          console.log("UpdatePaymentMethod (API): room type was updated.");
      }
    );
    builder.addCase(UpdatePaymentMethod.pending, (state, { payload }) => {
      state.updatePaymentMethod.error = "";
      state.updatePaymentMethod.isLoading = true;
    });
    builder.addCase(UpdatePaymentMethod.rejected, (state, { payload }) => {
      state.updatePaymentMethod.isLoading = false;
      state.updatePaymentMethod.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeletePaymentMethod.fulfilled,
      (state, { payload }: { payload: { id: number } }) => {
        state.updatePaymentMethod.isLoading = false;
        if (state.paymentMethods)
          state.paymentMethods = state.paymentMethods.filter(
            (paymentMethod) => paymentMethod.id !== payload.id
          );

        if (DEBUG)
          console.log("DeletePaymentMethod (API): room category was deleted.");
      }
    );
    builder.addCase(DeletePaymentMethod.pending, (state, { payload }) => {
      state.updatePaymentMethod.error = "";
      state.updatePaymentMethod.isLoading = true;
    });
    builder.addCase(DeletePaymentMethod.rejected, (state, { payload }) => {
      state.updatePaymentMethod.isLoading = false;
      state.updatePaymentMethod.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = paymentMethodsSlice.actions;
