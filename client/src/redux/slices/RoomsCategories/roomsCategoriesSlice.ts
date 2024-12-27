import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createRoomCategory,
  deleteRoomCategory,
  getRoomsCategories,
  updateRoomCategory,
} from "./httpRequests";
import {
  CreateRoomCategoryApiResponseType,
  CreateRoomCategoryType,
  GetRoomsCategoriesApiResponseType,
  RoomCategoryType,
  UpdateRoomCategoryApiResponseType,
  UpdateRoomCategoryType,
} from "./types";

const DEBUG = true;

// API requests
export const GetRoomsCategories = createAsyncThunk(
  "roomsCategories/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getRoomsCategories.url}`, {
        method: getRoomsCategories.method,
        headers: {
          ...getRoomsCategories.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetRoomsCategories (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetRoomsCategories (API error): " + err);
    }
  }
);

export const CreateRoomCategory = createAsyncThunk(
  "roomsCategories/create",
  async (
    payload: {
      roomCategory: CreateRoomCategoryType;
    },
    thunkAPI
  ) => {
    try {
      const { roomCategory } = payload;

      const res = await fetch(`${createRoomCategory.url}`, {
        method: createRoomCategory.method,
        headers: {
          ...createRoomCategory.headers,
        },
        body: JSON.stringify(roomCategory),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateRoomCategory (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateRoomCategory (API error): " + err);
    }
  }
);

export const UpdateRoomCategory = createAsyncThunk(
  "roomsCategories/update",
  async (
    payload: {
      roomCategory: UpdateRoomCategoryType;
    },
    thunkAPI
  ) => {
    try {
      const { roomCategory } = payload;

      const res = await fetch(`${updateRoomCategory.url}`, {
        method: updateRoomCategory.method,
        headers: {
          ...updateRoomCategory.headers,
        },
        body: JSON.stringify(roomCategory),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateRoomCategory (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateRoomCategory (API error): " + err);
    }
  }
);

export const DeleteRoomCategory = createAsyncThunk(
  "roomsCategories/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteRoomCategory.url}/${id}`, {
        method: deleteRoomCategory.method,
        headers: {
          ...deleteRoomCategory.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteRoomCategory (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteRoomCategory (API error): " + err);
    }
  }
);

interface IRoomTypeState {
  roomsCategories: RoomCategoryType[] | null;
  getRoomsCategories: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createRoomCategory: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateRoomCategory: {
    data: RoomCategoryType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteRoomCategory: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  roomsCategories: null,
  getRoomsCategories: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createRoomCategory: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateRoomCategory: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteRoomCategory: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const roomsCategoriesSlice = createSlice({
  name: "roomsCategories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetRoomsCategories.fulfilled,
      (state, { payload }: { payload: GetRoomsCategoriesApiResponseType }) => {
        state.getRoomsCategories.isLoading = false;
        const roomsCategories = payload.data;
        state.roomsCategories = roomsCategories;

        if (DEBUG)
          console.log("GetRoomsCategories (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetRoomsCategories.pending, (state, { payload }) => {
      state.getRoomsCategories.error = "";
      state.getRoomsCategories.isLoading = true;
    });
    builder.addCase(GetRoomsCategories.rejected, (state, { payload }) => {
      state.getRoomsCategories.isLoading = false;
      state.getRoomsCategories.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateRoomCategory.fulfilled,
      (state, { payload }: { payload: CreateRoomCategoryApiResponseType }) => {
        state.createRoomCategory.isLoading = false;
        const roomCategory = payload.data;
        if (state.roomsCategories) {
          state.roomsCategories.push(roomCategory);
        } else {
          state.roomsCategories = [roomCategory];
        }
        if (DEBUG)
          console.log("CreateRoomCategory (API): room type was created.");
      }
    );
    builder.addCase(CreateRoomCategory.pending, (state, { payload }) => {
      state.createRoomCategory.error = "";
      state.createRoomCategory.isLoading = true;
    });
    builder.addCase(CreateRoomCategory.rejected, (state, { payload }) => {
      state.createRoomCategory.isLoading = false;
      state.createRoomCategory.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateRoomCategory.fulfilled,
      (state, { payload }: { payload: UpdateRoomCategoryApiResponseType }) => {
        state.updateRoomCategory.isLoading = false;
        const updatedRoomCategory = payload.data;
        if (state.roomsCategories)
          state.roomsCategories = state.roomsCategories.map((roomType) => {
            return roomType._id === updatedRoomCategory._id
              ? updatedRoomCategory
              : roomType;
          });

        if (DEBUG)
          console.log("UpdateRoomCategory (API): room type was updated.");
      }
    );
    builder.addCase(UpdateRoomCategory.pending, (state, { payload }) => {
      state.updateRoomCategory.error = "";
      state.updateRoomCategory.isLoading = true;
    });
    builder.addCase(UpdateRoomCategory.rejected, (state, { payload }) => {
      state.updateRoomCategory.isLoading = false;
      state.updateRoomCategory.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteRoomCategory.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateRoomCategory.isLoading = false;
        if (state.roomsCategories)
          state.roomsCategories = state.roomsCategories.filter(
            (roomCategory) => roomCategory._id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteRoomCategory (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteRoomCategory.pending, (state, { payload }) => {
      state.updateRoomCategory.error = "";
      state.updateRoomCategory.isLoading = true;
    });
    builder.addCase(DeleteRoomCategory.rejected, (state, { payload }) => {
      state.updateRoomCategory.isLoading = false;
      state.updateRoomCategory.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = roomsCategoriesSlice.actions;
