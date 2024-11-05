import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createRoomBedType,
  deleteRoomBedType,
  getRoomRoomBedTypes,
  updateRoomBedType,
} from "./httpRequests";
import {
  CreateRoomBedTypeApiResponseType,
  CreateRoomBedTypeType,
  GetRoomRoomBedTypesApiResponseType,
  RoomBedTypeType,
  UpdateRoomBedTypeApiResponseType,
  UpdateRoomBedTypeType,
} from "./types";

const DEBUG = true;

// API requests
export const GetRoomRoomBedTypes = createAsyncThunk(
  "roomBedTypes/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getRoomRoomBedTypes.url}`, {
        method: getRoomRoomBedTypes.method,
        headers: {
          ...getRoomRoomBedTypes.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetRoomRoomBedTypes (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "GetRoomRoomBedTypes (API error): " + err
      );
    }
  }
);

export const CreateRoomBedType = createAsyncThunk(
  "roomBedTypes/create",
  async (
    payload: {
      roomBedType: CreateRoomBedTypeType;
    },
    thunkAPI
  ) => {
    try {
      const { roomBedType } = payload;

      const res = await fetch(`${createRoomBedType.url}`, {
        method: createRoomBedType.method,
        headers: {
          ...createRoomBedType.headers,
        },
        body: JSON.stringify(roomBedType),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateRoomBedType (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateRoomBedType (API error): " + err);
    }
  }
);

export const UpdateRoomBedType = createAsyncThunk(
  "roomBedTypes/update",
  async (
    payload: {
      roomBedType: UpdateRoomBedTypeType;
    },
    thunkAPI
  ) => {
    try {
      const { roomBedType } = payload;

      const res = await fetch(`${updateRoomBedType.url}`, {
        method: updateRoomBedType.method,
        headers: {
          ...updateRoomBedType.headers,
        },
        body: JSON.stringify(roomBedType),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateRoomBedType (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateRoomBedType (API error): " + err);
    }
  }
);

export const DeleteRoomBedType = createAsyncThunk(
  "roomBedTypes/delete",
  async (
    payload: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteRoomBedType.url}/${id}`, {
        method: deleteRoomBedType.method,
        headers: {
          ...deleteRoomBedType.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteRoomBedType (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteRoomBedType (API error): " + err);
    }
  }
);

interface IRoomTypeState {
  roomBedTypes: RoomBedTypeType[] | null;
  getRoomRoomBedTypes: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createRoomBedType: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateRoomBedType: {
    data: RoomBedTypeType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteRoomBedType: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  roomBedTypes: null,
  getRoomRoomBedTypes: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createRoomBedType: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateRoomBedType: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteRoomBedType: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const roomBedTypesSlice = createSlice({
  name: "roomBedTypes",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetRoomRoomBedTypes.fulfilled,
      (state, { payload }: { payload: GetRoomRoomBedTypesApiResponseType }) => {
        state.getRoomRoomBedTypes.isLoading = false;
        const roomBedTypes = payload.data;
        state.roomBedTypes = roomBedTypes;

        if (DEBUG)
          console.log("GetRoomRoomBedTypes (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetRoomRoomBedTypes.pending, (state, { payload }) => {
      state.getRoomRoomBedTypes.error = "";
      state.getRoomRoomBedTypes.isLoading = true;
    });
    builder.addCase(GetRoomRoomBedTypes.rejected, (state, { payload }) => {
      state.getRoomRoomBedTypes.isLoading = false;
      state.getRoomRoomBedTypes.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateRoomBedType.fulfilled,
      (state, { payload }: { payload: CreateRoomBedTypeApiResponseType }) => {
        state.createRoomBedType.isLoading = false;
        const roomBedType = payload.data;
        if (state.roomBedTypes) {
          state.roomBedTypes.push(roomBedType);
        } else {
          state.roomBedTypes = [roomBedType];
        }
        if (DEBUG)
          console.log("CreateRoomBedType (API): room type was created.");
      }
    );
    builder.addCase(CreateRoomBedType.pending, (state, { payload }) => {
      state.createRoomBedType.error = "";
      state.createRoomBedType.isLoading = true;
    });
    builder.addCase(CreateRoomBedType.rejected, (state, { payload }) => {
      state.createRoomBedType.isLoading = false;
      state.createRoomBedType.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateRoomBedType.fulfilled,
      (state, { payload }: { payload: UpdateRoomBedTypeApiResponseType }) => {
        state.updateRoomBedType.isLoading = false;
        const updatedRoomBedType = payload.data;
        if (state.roomBedTypes)
          state.roomBedTypes = state.roomBedTypes.map((roomBedType) => {
            return roomBedType.id === updatedRoomBedType.id
              ? updatedRoomBedType
              : roomBedType;
          });

        if (DEBUG)
          console.log("UpdateRoomBedType (API): room type was updated.");
      }
    );
    builder.addCase(UpdateRoomBedType.pending, (state, { payload }) => {
      state.updateRoomBedType.error = "";
      state.updateRoomBedType.isLoading = true;
    });
    builder.addCase(UpdateRoomBedType.rejected, (state, { payload }) => {
      state.updateRoomBedType.isLoading = false;
      state.updateRoomBedType.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteRoomBedType.fulfilled,
      (state, { payload }: { payload: { id: number } }) => {
        state.updateRoomBedType.isLoading = false;
        if (state.roomBedTypes)
          state.roomBedTypes = state.roomBedTypes.filter(
            (roomBedType) => roomBedType.id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteRoomBedType (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteRoomBedType.pending, (state, { payload }) => {
      state.updateRoomBedType.error = "";
      state.updateRoomBedType.isLoading = true;
    });
    builder.addCase(DeleteRoomBedType.rejected, (state, { payload }) => {
      state.updateRoomBedType.isLoading = false;
      state.updateRoomBedType.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = roomBedTypesSlice.actions;
