import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBedType,
  deleteBedType,
  getBedTypes,
  updateBedType,
} from "./httpRequests";
import {
  CreateBedTypeApiResponseType,
  CreateBedTypeType,
  GetBedTypesApiResponseType,
  BedTypeType,
  UpdateBedTypeApiResponseType,
  UpdateBedTypeType,
} from "./types";

const DEBUG = true;

// API requests
export const GetBedTypes = createAsyncThunk(
  "bedTypes/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getBedTypes.url}`, {
        method: getBedTypes.method,
        headers: {
          ...getBedTypes.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetBedTypes (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetBedTypes (API error): " + err);
    }
  }
);

export const CreateBedType = createAsyncThunk(
  "bedTypes/create",
  async (
    payload: {
      bedType: CreateBedTypeType;
    },
    thunkAPI
  ) => {
    try {
      const { bedType } = payload;

      const res = await fetch(`${createBedType.url}`, {
        method: createBedType.method,
        headers: {
          ...createBedType.headers,
        },
        body: JSON.stringify(bedType),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateBedType (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateBedType (API error): " + err);
    }
  }
);

export const UpdateBedType = createAsyncThunk(
  "bedTypes/update",
  async (
    payload: {
      bedType: UpdateBedTypeType;
    },
    thunkAPI
  ) => {
    try {
      const { bedType } = payload;

      const res = await fetch(`${updateBedType.url}`, {
        method: updateBedType.method,
        headers: {
          ...updateBedType.headers,
        },
        body: JSON.stringify(bedType),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateBedType (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateBedType (API error): " + err);
    }
  }
);

export const DeleteBedType = createAsyncThunk(
  "bedTypes/delete",
  async (
    payload: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteBedType.url}/${id}`, {
        method: deleteBedType.method,
        headers: {
          ...deleteBedType.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteBedType (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteBedType (API error): " + err);
    }
  }
);

interface IRoomTypeState {
  bedTypes: BedTypeType[] | null;
  getBedTypes: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  getBedType: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createBedType: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateBedType: {
    data: BedTypeType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteBedType: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  bedTypes: null,
  getBedTypes: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  getBedType: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createBedType: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateBedType: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteBedType: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const bedTypesSlice = createSlice({
  name: "bedTypes",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetBedTypes.fulfilled,
      (state, { payload }: { payload: GetBedTypesApiResponseType }) => {
        state.getBedTypes.isLoading = false;
        const bedTypes = payload.data;
        state.bedTypes = bedTypes;

        if (DEBUG) console.log("GetBedTypes (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetBedTypes.pending, (state, { payload }) => {
      state.getBedTypes.error = "";
      state.getBedTypes.isLoading = true;
    });
    builder.addCase(GetBedTypes.rejected, (state, { payload }) => {
      state.getBedTypes.isLoading = false;
      state.getBedTypes.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateBedType.fulfilled,
      (state, { payload }: { payload: CreateBedTypeApiResponseType }) => {
        state.createBedType.isLoading = false;
        const bedType = payload.data;
        if (state.bedTypes) {
          state.bedTypes.push(bedType);
        } else {
          state.bedTypes = [bedType];
        }
        if (DEBUG) console.log("CreateBedType (API): room type was created.");
      }
    );
    builder.addCase(CreateBedType.pending, (state, { payload }) => {
      state.createBedType.error = "";
      state.createBedType.isLoading = true;
    });
    builder.addCase(CreateBedType.rejected, (state, { payload }) => {
      state.createBedType.isLoading = false;
      state.createBedType.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateBedType.fulfilled,
      (state, { payload }: { payload: UpdateBedTypeApiResponseType }) => {
        state.updateBedType.isLoading = false;
        const updatedBedType = payload.data;
        if (state.bedTypes)
          state.bedTypes = state.bedTypes.map((bedType) => {
            return bedType.id === updatedBedType.id ? updatedBedType : bedType;
          });

        if (DEBUG) console.log("UpdateBedType (API): room type was updated.");
      }
    );
    builder.addCase(UpdateBedType.pending, (state, { payload }) => {
      state.updateBedType.error = "";
      state.updateBedType.isLoading = true;
    });
    builder.addCase(UpdateBedType.rejected, (state, { payload }) => {
      state.updateBedType.isLoading = false;
      state.updateBedType.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteBedType.fulfilled,
      (state, { payload }: { payload: { id: number } }) => {
        state.updateBedType.isLoading = false;
        if (state.bedTypes)
          state.bedTypes = state.bedTypes.filter(
            (bedType) => bedType.id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteBedType (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteBedType.pending, (state, { payload }) => {
      state.updateBedType.error = "";
      state.updateBedType.isLoading = true;
    });
    builder.addCase(DeleteBedType.rejected, (state, { payload }) => {
      state.updateBedType.isLoading = false;
      state.updateBedType.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = bedTypesSlice.actions;
