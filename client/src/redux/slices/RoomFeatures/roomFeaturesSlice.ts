import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateRoomFeatureApiResponseType,
  CreateRoomFeatureType,
  GetRoomFeaturesApiResponseType,
  RoomFeatureType,
  UpdateRoomFeatureApiResponseType,
  UpdateRoomFeatureType,
} from "./types";
import {
  createRoomFeature,
  getRoomFeatures,
  updateRoomFeature,
} from "./httpRequests";

const DEBUG = true;

// API requests
export const GetRoomFeatures = createAsyncThunk(
  "roomFeatures/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getRoomFeatures.url}`, {
        method: getRoomFeatures.method,
        headers: {
          ...getRoomFeatures.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetRoomFeatures (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetRoomFeatures (API error): " + err);
    }
  }
);

export const CreateRoomFeature = createAsyncThunk(
  "roomFeatures/create",
  async (
    payload: {
      roomFeature: CreateRoomFeatureType;
    },
    thunkAPI
  ) => {
    try {
      const { roomFeature } = payload;

      const res = await fetch(`${createRoomFeature.url}`, {
        method: createRoomFeature.method,
        headers: {
          ...createRoomFeature.headers,
        },
        body: JSON.stringify(roomFeature),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateRoomFeature (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateRoomFeature (API error): " + err);
    }
  }
);

export const UpdateRoomFeature = createAsyncThunk(
  "roomFeatures/update",
  async (
    payload: {
      roomFeature: UpdateRoomFeatureType;
    },
    thunkAPI
  ) => {
    try {
      const { roomFeature } = payload;

      const res = await fetch(`${updateRoomFeature.url}/${roomFeature._id}`, {
        method: updateRoomFeature.method,
        headers: {
          ...updateRoomFeature.headers,
        },
        body: JSON.stringify(roomFeature),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateRoomFeature (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateRoomFeature (API error): " + err);
    }
  }
);

export const DeleteRoomFeature = createAsyncThunk(
  "roomFeatures/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${updateRoomFeature.url}/${id}`, {
        method: updateRoomFeature.method,
        headers: {
          ...updateRoomFeature.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteRoomFeature (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteRoomFeature (API error): " + err);
    }
  }
);

interface IRoomFeatureState {
  roomFeatures: RoomFeatureType[] | null;
  getRoomFeatures: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createRoomFeature: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateRoomFeature: {
    data: RoomFeatureType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteRoomFeature: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomFeatureState = {
  roomFeatures: null,
  getRoomFeatures: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createRoomFeature: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateRoomFeature: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteRoomFeature: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const roomFeaturesSlice = createSlice({
  name: "roomFeatures",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetRoomFeatures.fulfilled,
      (state, { payload }: { payload: GetRoomFeaturesApiResponseType }) => {
        state.getRoomFeatures.isLoading = false;
        const roomFeatures = payload.data;
        state.roomFeatures = roomFeatures;

        if (DEBUG)
          console.log("GetRoomFeatures (API): roomFeatures was recieved.");
      }
    );
    builder.addCase(GetRoomFeatures.pending, (state, { payload }) => {
      state.getRoomFeatures.error = "";
      state.getRoomFeatures.isLoading = true;
    });
    builder.addCase(GetRoomFeatures.rejected, (state, { payload }) => {
      state.getRoomFeatures.isLoading = false;
      state.getRoomFeatures.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateRoomFeature.fulfilled,
      (state, { payload }: { payload: CreateRoomFeatureApiResponseType }) => {
        state.createRoomFeature.isLoading = false;
        const roomFeature = payload.data;
        if (state.roomFeatures) {
          state.roomFeatures.push(roomFeature);
        } else {
          state.roomFeatures = [roomFeature];
        }
        if (DEBUG)
          console.log("CreateRoomFeature (API): roomFeature was created.");
      }
    );
    builder.addCase(CreateRoomFeature.pending, (state, { payload }) => {
      state.createRoomFeature.error = "";
      state.createRoomFeature.isLoading = true;
    });
    builder.addCase(CreateRoomFeature.rejected, (state, { payload }) => {
      state.createRoomFeature.isLoading = false;
      state.createRoomFeature.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateRoomFeature.fulfilled,
      (state, { payload }: { payload: UpdateRoomFeatureApiResponseType }) => {
        state.updateRoomFeature.isLoading = false;
        const updatedRoomFeature = payload.data;
        if (state.roomFeatures)
          state.roomFeatures = state.roomFeatures.map((roomFeature) => {
            return roomFeature._id === updatedRoomFeature._id
              ? updatedRoomFeature
              : roomFeature;
          });

        if (DEBUG)
          console.log("CreateRoomFeature (API): roomFeature was updated.");
      }
    );
    builder.addCase(UpdateRoomFeature.pending, (state, { payload }) => {
      state.updateRoomFeature.error = "";
      state.updateRoomFeature.isLoading = true;
    });
    builder.addCase(UpdateRoomFeature.rejected, (state, { payload }) => {
      state.updateRoomFeature.isLoading = false;
      state.updateRoomFeature.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteRoomFeature.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.deleteRoomFeature.isLoading = false;

        if (state.roomFeatures)
          state.roomFeatures = state.roomFeatures.filter(
            (roomFeature) => roomFeature._id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteRoomFeature (API): roomFeature was deleted.");
      }
    );
    builder.addCase(DeleteRoomFeature.pending, (state, { payload }) => {
      state.deleteRoomFeature.error = "";
      state.deleteRoomFeature.isLoading = true;
    });
    builder.addCase(DeleteRoomFeature.rejected, (state, { payload }) => {
      state.deleteRoomFeature.isLoading = false;
      state.deleteRoomFeature.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = roomFeaturesSlice.actions;
