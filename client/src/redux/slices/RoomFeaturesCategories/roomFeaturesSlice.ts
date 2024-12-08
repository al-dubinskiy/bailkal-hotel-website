import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateRoomFeaturesCategoryApiResponseType,
  CreateRoomFeaturesCategoryType,
  GetRoomFeaturesCategoriesApiResponseType,
  RoomFeaturesCategoryType,
  UpdateRoomFeaturesCategoryApiResponseType,
  UpdateRoomFeaturesCategoryType,
} from "./types";
import {
  createRoomFeaturesCategory,
  deleteRoomFeaturesCategory,
  getRoomFeaturesCategories,
  updateRoomFeaturesCategory,
} from "./httpRequests";

const DEBUG = true;

// API requests
export const GetRoomFeaturesCategories = createAsyncThunk(
  "roomFeaturesCategories/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getRoomFeaturesCategories.url}`, {
        method: getRoomFeaturesCategories.method,
        headers: {
          ...getRoomFeaturesCategories.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetRoomFeaturesCategories (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "GetRoomFeaturesCategories (API error): " + err
      );
    }
  }
);

export const CreateRoomFeatureCategory = createAsyncThunk(
  "roomFeaturesCategories/create",
  async (
    payload: {
      roomFeaturesCategory: CreateRoomFeaturesCategoryType;
    },
    thunkAPI
  ) => {
    try {
      const { roomFeaturesCategory } = payload;

      const res = await fetch(`${createRoomFeaturesCategory.url}`, {
        method: createRoomFeaturesCategory.method,
        headers: {
          ...createRoomFeaturesCategory.headers,
        },
        body: JSON.stringify(roomFeaturesCategory),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateRoomFeaturesCategory (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateRoomFeaturesCategory (API error): " + err
      );
    }
  }
);

export const UpdateRoomFeaturesCategory = createAsyncThunk(
  "roomFeaturesCategories/update",
  async (
    payload: {
      roomFeaturesCategory: UpdateRoomFeaturesCategoryType;
    },
    thunkAPI
  ) => {
    try {
      const { roomFeaturesCategory } = payload;

      const res = await fetch(
        `${updateRoomFeaturesCategory.url}/${roomFeaturesCategory._id}`,
        {
          method: updateRoomFeaturesCategory.method,
          headers: {
            ...updateRoomFeaturesCategory.headers,
          },
          body: JSON.stringify(roomFeaturesCategory),
        }
      );

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateRoomFeaturesCategory (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateRoomFeaturesCategory (API error): " + err
      );
    }
  }
);

export const DeleteRoomFeaturesCategory = createAsyncThunk(
  "roomFeaturesCategories/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteRoomFeaturesCategory.url}/${id}`, {
        method: deleteRoomFeaturesCategory.method,
        headers: {
          ...deleteRoomFeaturesCategory.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteRoomFeaturesCategory (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteRoomFeaturesCategory (API error): " + err
      );
    }
  }
);

interface IRoomFeatureState {
  roomFeaturesCategories: RoomFeaturesCategoryType[] | null;
  getRoomFeaturesCategories: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createRoomFeaturesCategory: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateRoomFeaturesCategory: {
    data: RoomFeaturesCategoryType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteRoomFeaturesCategory: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomFeatureState = {
  roomFeaturesCategories: null,
  getRoomFeaturesCategories: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createRoomFeaturesCategory: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateRoomFeaturesCategory: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteRoomFeaturesCategory: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const roomFeaturesCategoriesSlice = createSlice({
  name: "roomFeaturesCategories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetRoomFeaturesCategories.fulfilled,
      (
        state,
        { payload }: { payload: GetRoomFeaturesCategoriesApiResponseType }
      ) => {
        state.getRoomFeaturesCategories.isLoading = false;
        const roomFeaturesCategories = payload.data;
        state.roomFeaturesCategories = roomFeaturesCategories;

        if (DEBUG)
          console.log(
            "GetRoomFeaturesCategories (API): roomFeaturesCategories was recieved."
          );
      }
    );
    builder.addCase(GetRoomFeaturesCategories.pending, (state, { payload }) => {
      state.getRoomFeaturesCategories.error = "";
      state.getRoomFeaturesCategories.isLoading = true;
    });
    builder.addCase(
      GetRoomFeaturesCategories.rejected,
      (state, { payload }) => {
        state.getRoomFeaturesCategories.isLoading = false;
        state.getRoomFeaturesCategories.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
    builder.addCase(
      CreateRoomFeatureCategory.fulfilled,
      (
        state,
        { payload }: { payload: CreateRoomFeaturesCategoryApiResponseType }
      ) => {
        state.createRoomFeaturesCategory.isLoading = false;
        const roomFeaturesCategory = payload.data;
        if (state.roomFeaturesCategories) {
          state.roomFeaturesCategories.push(roomFeaturesCategory);
        } else {
          state.roomFeaturesCategories = [roomFeaturesCategory];
        }
        if (DEBUG)
          console.log(
            "CreateRoomFeaturesCategory (API): RoomFeaturesCategory was created."
          );
      }
    );
    builder.addCase(CreateRoomFeatureCategory.pending, (state, { payload }) => {
      state.createRoomFeaturesCategory.error = "";
      state.createRoomFeaturesCategory.isLoading = true;
    });
    builder.addCase(
      CreateRoomFeatureCategory.rejected,
      (state, { payload }) => {
        state.createRoomFeaturesCategory.isLoading = false;
        state.createRoomFeaturesCategory.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
    builder.addCase(
      UpdateRoomFeaturesCategory.fulfilled,
      (
        state,
        { payload }: { payload: UpdateRoomFeaturesCategoryApiResponseType }
      ) => {
        state.updateRoomFeaturesCategory.isLoading = false;
        const updateRoomFeaturesCategory = payload.data;
        if (state.roomFeaturesCategories)
          state.roomFeaturesCategories = state.roomFeaturesCategories.map(
            (roomFeaturesCategories) => {
              return roomFeaturesCategories._id ===
                updateRoomFeaturesCategory._id
                ? updateRoomFeaturesCategory
                : roomFeaturesCategories;
            }
          );

        if (DEBUG)
          console.log(
            "UpdateRoomFeaturesCategory (API): roomFeaturesCategory was updated."
          );
      }
    );
    builder.addCase(
      UpdateRoomFeaturesCategory.pending,
      (state, { payload }) => {
        state.updateRoomFeaturesCategory.error = "";
        state.updateRoomFeaturesCategory.isLoading = true;
      }
    );
    builder.addCase(
      UpdateRoomFeaturesCategory.rejected,
      (state, { payload }) => {
        state.updateRoomFeaturesCategory.isLoading = false;
        state.updateRoomFeaturesCategory.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
    builder.addCase(
      DeleteRoomFeaturesCategory.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.deleteRoomFeaturesCategory.isLoading = false;

        if (state.roomFeaturesCategories)
          state.roomFeaturesCategories = state.roomFeaturesCategories.filter(
            (roomFeaturesCategory) => roomFeaturesCategory._id !== payload.id
          );

        if (DEBUG)
          console.log(
            "DeleteRoomFeature (API): RoomFeaturesCategory was deleted."
          );
      }
    );
    builder.addCase(
      DeleteRoomFeaturesCategory.pending,
      (state, { payload }) => {
        state.deleteRoomFeaturesCategory.error = "";
        state.deleteRoomFeaturesCategory.isLoading = true;
      }
    );
    builder.addCase(
      DeleteRoomFeaturesCategory.rejected,
      (state, { payload }) => {
        state.deleteRoomFeaturesCategory.isLoading = false;
        state.deleteRoomFeaturesCategory.error = payload;
        if (DEBUG) console.log(payload);
      }
    );
  },
});

export const {} = roomFeaturesCategoriesSlice.actions;
