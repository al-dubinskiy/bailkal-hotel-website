import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateRoomApiResponseType,
  CreateRoomType,
  GetRoomsApiResponseType,
  RoomType,
  UpdateRoomApiResponseType,
  UpdateRoomType,
} from "./types";
import { createRoom, getRooms, updateRoom } from "./httpRequests";

const DEBUG = true;

// API requests
export const GetRooms = createAsyncThunk(
  "rooms/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getRooms.url}`, {
        method: getRooms.method,
        headers: {
          ...getRooms.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetRooms (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetRooms (API error): " + err);
    }
  }
);

export const CreateRoom = createAsyncThunk(
  "rooms/create",
  async (
    payload: {
      room: CreateRoomType;
    },
    thunkAPI
  ) => {
    try {
      const { room } = payload;

      const res = await fetch(`${createRoom.url}`, {
        method: createRoom.method,
        headers: {
          ...createRoom.headers,
        },
        body: JSON.stringify(room),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateRoom (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("CreateRoom (API error): " + err);
    }
  }
);

export const UpdateRoom = createAsyncThunk(
  "rooms/update",
  async (
    payload: {
      room: UpdateRoomType;
    },
    thunkAPI
  ) => {
    try {
      const { room } = payload;

      const res = await fetch(`${updateRoom.url}/${room._id}`, {
        method: updateRoom.method,
        headers: {
          ...updateRoom.headers,
        },
        body: JSON.stringify(room),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateRoom (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("UpdateRoom (API error): " + err);
    }
  }
);

export const DeleteRoom = createAsyncThunk(
  "rooms/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${updateRoom.url}/${id}`, {
        method: updateRoom.method,
        headers: {
          ...updateRoom.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteRoom (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("DeleteRoom (API error): " + err);
    }
  }
);

interface IRoomState {
  rooms: RoomType[] | null;
  getRooms: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createRoom: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateRoom: {
    data: RoomType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteRoom: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomState = {
  rooms: null,
  getRooms: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createRoom: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateRoom: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteRoom: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const roomsSlice = createSlice({
  name: "rooms",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetRooms.fulfilled,
      (state, { payload }: { payload: GetRoomsApiResponseType }) => {
        state.getRooms.isLoading = false;
        const rooms = payload.data;
        state.rooms = rooms;

        if (DEBUG) console.log("GetRooms (API): rooms was recieved.");
      }
    );
    builder.addCase(GetRooms.pending, (state, { payload }) => {
      state.getRooms.error = "";
      state.getRooms.isLoading = true;
    });
    builder.addCase(GetRooms.rejected, (state, { payload }) => {
      state.getRooms.isLoading = false;
      state.getRooms.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateRoom.fulfilled,
      (state, { payload }: { payload: CreateRoomApiResponseType }) => {
        state.createRoom.isLoading = false;
        const room = payload.data;
        if (state.rooms) {
          state.rooms.push(room);
        } else {
          state.rooms = [room];
        }
        if (DEBUG) console.log("CreateRoom (API): room was created.");
      }
    );
    builder.addCase(CreateRoom.pending, (state, { payload }) => {
      state.createRoom.error = "";
      state.createRoom.isLoading = true;
    });
    builder.addCase(CreateRoom.rejected, (state, { payload }) => {
      state.createRoom.isLoading = false;
      state.createRoom.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateRoom.fulfilled,
      (state, { payload }: { payload: UpdateRoomApiResponseType }) => {
        state.updateRoom.isLoading = false;
        const updatedRoom = payload.data;
        if (state.rooms)
          state.rooms = state.rooms.map((room) => {
            return room._id === updatedRoom._id ? updatedRoom : room;
          });

        if (DEBUG) console.log("CreateRoom (API): room was updated.");
      }
    );
    builder.addCase(UpdateRoom.pending, (state, { payload }) => {
      state.updateRoom.error = "";
      state.updateRoom.isLoading = true;
    });
    builder.addCase(UpdateRoom.rejected, (state, { payload }) => {
      state.updateRoom.isLoading = false;
      state.updateRoom.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteRoom.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.deleteRoom.isLoading = false;

        if (state.rooms)
          state.rooms = state.rooms.filter((room) => room._id !== payload.id);

        if (DEBUG) console.log("DeleteRoom (API): room was deleted.");
      }
    );
    builder.addCase(DeleteRoom.pending, (state, { payload }) => {
      state.deleteRoom.error = "";
      state.deleteRoom.isLoading = true;
    });
    builder.addCase(DeleteRoom.rejected, (state, { payload }) => {
      state.deleteRoom.isLoading = false;
      state.deleteRoom.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = roomsSlice.actions;
