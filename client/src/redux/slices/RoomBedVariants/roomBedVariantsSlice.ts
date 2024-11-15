import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createRoomBedVariant,
  deleteRoomBedVariant,
  getRoomRoomBedVariants,
  updateRoomBedVariant,
} from "./httpRequests";
import {
  CreateRoomBedVariantApiResponseType,
  CreateRoomBedVariantType,
  GetRoomRoomBedVariantsApiResponseType,
  RoomBedVariantType,
  UpdateRoomBedVariantApiResponseType,
  UpdateRoomBedVariantType,
} from "./types";

const DEBUG = true;

// API requests
export const GetRoomRoomBedVariants = createAsyncThunk(
  "roomBedVariants/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getRoomRoomBedVariants.url}`, {
        method: getRoomRoomBedVariants.method,
        headers: {
          ...getRoomRoomBedVariants.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetRoomRoomBedVariants (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "GetRoomRoomBedVariants (API error): " + err
      );
    }
  }
);

export const CreateRoomBedVariant = createAsyncThunk(
  "roomBedVariants/create",
  async (
    payload: {
      roomBedVariant: CreateRoomBedVariantType;
    },
    thunkAPI
  ) => {
    try {
      const { roomBedVariant } = payload;

      const res = await fetch(`${createRoomBedVariant.url}`, {
        method: createRoomBedVariant.method,
        headers: {
          ...createRoomBedVariant.headers,
        },
        body: JSON.stringify(roomBedVariant),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateRoomBedVariant (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateRoomBedVariant (API error): " + err
      );
    }
  }
);

export const UpdateRoomBedVariant = createAsyncThunk(
  "roomBedVariants/update",
  async (
    payload: {
      roomBedVariant: UpdateRoomBedVariantType;
    },
    thunkAPI
  ) => {
    try {
      const { roomBedVariant } = payload;

      const res = await fetch(`${updateRoomBedVariant.url}`, {
        method: updateRoomBedVariant.method,
        headers: {
          ...updateRoomBedVariant.headers,
        },
        body: JSON.stringify(roomBedVariant),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateRoomBedVariant (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateRoomBedVariant (API error): " + err
      );
    }
  }
);

export const DeleteRoomBedVariant = createAsyncThunk(
  "roomBedVariants/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteRoomBedVariant.url}/${id}`, {
        method: deleteRoomBedVariant.method,
        headers: {
          ...deleteRoomBedVariant.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteRoomBedVariant (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteRoomBedVariant (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  roomBedVariants: RoomBedVariantType[] | null;
  getRoomRoomBedVariants: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createRoomBedVariant: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateRoomBedVariant: {
    data: RoomBedVariantType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteRoomBedVariant: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  roomBedVariants: null,
  getRoomRoomBedVariants: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createRoomBedVariant: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateRoomBedVariant: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteRoomBedVariant: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const roomBedVariantsSlice = createSlice({
  name: "roomBedVariants",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetRoomRoomBedVariants.fulfilled,
      (
        state,
        { payload }: { payload: GetRoomRoomBedVariantsApiResponseType }
      ) => {
        state.getRoomRoomBedVariants.isLoading = false;
        const roomBedVariants = payload.data;
        state.roomBedVariants = roomBedVariants;

        if (DEBUG)
          console.log(
            "GetRoomRoomBedVariants (API): rooms types was recieved."
          );
      }
    );
    builder.addCase(GetRoomRoomBedVariants.pending, (state, { payload }) => {
      state.getRoomRoomBedVariants.error = "";
      state.getRoomRoomBedVariants.isLoading = true;
    });
    builder.addCase(GetRoomRoomBedVariants.rejected, (state, { payload }) => {
      state.getRoomRoomBedVariants.isLoading = false;
      state.getRoomRoomBedVariants.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateRoomBedVariant.fulfilled,
      (
        state,
        { payload }: { payload: CreateRoomBedVariantApiResponseType }
      ) => {
        state.createRoomBedVariant.isLoading = false;
        const roomBedVariant = payload.data;
        if (state.roomBedVariants) {
          state.roomBedVariants.push(roomBedVariant);
        } else {
          state.roomBedVariants = [roomBedVariant];
        }
        if (DEBUG)
          console.log("CreateRoomBedVariant (API): room type was created.");
      }
    );
    builder.addCase(CreateRoomBedVariant.pending, (state, { payload }) => {
      state.createRoomBedVariant.error = "";
      state.createRoomBedVariant.isLoading = true;
    });
    builder.addCase(CreateRoomBedVariant.rejected, (state, { payload }) => {
      state.createRoomBedVariant.isLoading = false;
      state.createRoomBedVariant.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateRoomBedVariant.fulfilled,
      (
        state,
        { payload }: { payload: UpdateRoomBedVariantApiResponseType }
      ) => {
        state.updateRoomBedVariant.isLoading = false;
        const updatedRoomBedVariant = payload.data;
        if (state.roomBedVariants)
          state.roomBedVariants = state.roomBedVariants.map(
            (roomBedVariant) => {
              return roomBedVariant._id === updatedRoomBedVariant._id
                ? updatedRoomBedVariant
                : roomBedVariant;
            }
          );

        if (DEBUG)
          console.log("UpdateRoomBedVariant (API): room type was updated.");
      }
    );
    builder.addCase(UpdateRoomBedVariant.pending, (state, { payload }) => {
      state.updateRoomBedVariant.error = "";
      state.updateRoomBedVariant.isLoading = true;
    });
    builder.addCase(UpdateRoomBedVariant.rejected, (state, { payload }) => {
      state.updateRoomBedVariant.isLoading = false;
      state.updateRoomBedVariant.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteRoomBedVariant.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateRoomBedVariant.isLoading = false;
        if (state.roomBedVariants)
          state.roomBedVariants = state.roomBedVariants.filter(
            (roomBedVariant) => roomBedVariant._id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteRoomBedVariant (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteRoomBedVariant.pending, (state, { payload }) => {
      state.updateRoomBedVariant.error = "";
      state.updateRoomBedVariant.isLoading = true;
    });
    builder.addCase(DeleteRoomBedVariant.rejected, (state, { payload }) => {
      state.updateRoomBedVariant.isLoading = false;
      state.updateRoomBedVariant.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = roomBedVariantsSlice.actions;
