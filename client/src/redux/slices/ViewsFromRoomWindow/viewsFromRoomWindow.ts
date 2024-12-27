import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createViewFromRoomWindow,
  deleteViewFromRoomWindow,
  getViewsFromRoomWindow,
  updateViewFromRoomWindow,
} from "./httpRequests";
import {
  CreateViewFromRoomWindowApiResponseType,
  CreateViewFromRoomWindowType,
  GetViewsFromRoomWindowApiResponseType,
  ViewFromRoomWindowType,
  UpdateViewFromRoomWindowApiResponseType,
  UpdateViewFromRoomWindowType,
} from "./types";

const DEBUG = true;

// API requests
export const GetViewsFromRoomWindow = createAsyncThunk(
  "viewsFromRoomWindow/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${getViewsFromRoomWindow.url}`, {
        method: getViewsFromRoomWindow.method,
        headers: {
          ...getViewsFromRoomWindow.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetViewsFromRoomWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "GetViewsFromRoomWindow (API error): " + err
      );
    }
  }
);

export const CreateViewFromRoomWindow = createAsyncThunk(
  "viewsFromRoomWindow/create",
  async (
    payload: {
      viewFromRoomWindow: CreateViewFromRoomWindowType;
    },
    thunkAPI
  ) => {
    try {
      const { viewFromRoomWindow } = payload;

      const res = await fetch(`${createViewFromRoomWindow.url}`, {
        method: createViewFromRoomWindow.method,
        headers: {
          ...createViewFromRoomWindow.headers,
        },
        body: JSON.stringify(viewFromRoomWindow),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateViewFromRoomWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateViewFromRoomWindow (API error): " + err
      );
    }
  }
);

export const UpdateViewFromRoomWindow = createAsyncThunk(
  "viewsFromRoomWindow/update",
  async (
    payload: {
      viewFromRoomWindow: UpdateViewFromRoomWindowType;
    },
    thunkAPI
  ) => {
    try {
      const { viewFromRoomWindow } = payload;

      const res = await fetch(`${updateViewFromRoomWindow.url}`, {
        method: updateViewFromRoomWindow.method,
        headers: {
          ...updateViewFromRoomWindow.headers,
        },
        body: JSON.stringify(viewFromRoomWindow),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateViewFromRoomWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateViewFromRoomWindow (API error): " + err
      );
    }
  }
);

export const DeleteViewFromRoomWindow = createAsyncThunk(
  "viewsFromRoomWindow/delete",
  async (
    payload: {
      id: string;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteViewFromRoomWindow.url}/${id}`, {
        method: deleteViewFromRoomWindow.method,
        headers: {
          ...deleteViewFromRoomWindow.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteViewFromRoomWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteViewFromRoomWindow (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  viewsFromRoomWindow: ViewFromRoomWindowType[] | null;
  getViewsFromRoomWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createViewFromRoomWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateViewFromRoomWindow: {
    data: ViewFromRoomWindowType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteViewFromRoomWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  viewsFromRoomWindow: null,
  getViewsFromRoomWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createViewFromRoomWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateViewFromRoomWindow: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteViewFromRoomWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const viewsFromRoomWindowSlice = createSlice({
  name: "viewsFromRoomWindow",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetViewsFromRoomWindow.fulfilled,
      (
        state,
        { payload }: { payload: GetViewsFromRoomWindowApiResponseType }
      ) => {
        state.getViewsFromRoomWindow.isLoading = false;
        const viewsFromRoomWindow = payload.data;
        state.viewsFromRoomWindow = viewsFromRoomWindow;

        if (DEBUG)
          console.log(
            "GetViewsFromRoomWindow (API): rooms types was recieved."
          );
      }
    );
    builder.addCase(GetViewsFromRoomWindow.pending, (state, { payload }) => {
      state.getViewsFromRoomWindow.error = "";
      state.getViewsFromRoomWindow.isLoading = true;
    });
    builder.addCase(GetViewsFromRoomWindow.rejected, (state, { payload }) => {
      state.getViewsFromRoomWindow.isLoading = false;
      state.getViewsFromRoomWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateViewFromRoomWindow.fulfilled,
      (
        state,
        { payload }: { payload: CreateViewFromRoomWindowApiResponseType }
      ) => {
        state.createViewFromRoomWindow.isLoading = false;
        const viewFromRoomWindow = payload.data;
        if (state.viewsFromRoomWindow) {
          state.viewsFromRoomWindow.push(viewFromRoomWindow);
        } else {
          state.viewsFromRoomWindow = [viewFromRoomWindow];
        }
        if (DEBUG)
          console.log("CreateViewFromRoomWindow (API): room type was created.");
      }
    );
    builder.addCase(CreateViewFromRoomWindow.pending, (state, { payload }) => {
      state.createViewFromRoomWindow.error = "";
      state.createViewFromRoomWindow.isLoading = true;
    });
    builder.addCase(CreateViewFromRoomWindow.rejected, (state, { payload }) => {
      state.createViewFromRoomWindow.isLoading = false;
      state.createViewFromRoomWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateViewFromRoomWindow.fulfilled,
      (
        state,
        { payload }: { payload: UpdateViewFromRoomWindowApiResponseType }
      ) => {
        state.updateViewFromRoomWindow.isLoading = false;
        const updatedViewFromRoomWindow = payload.data;
        if (state.viewsFromRoomWindow)
          state.viewsFromRoomWindow = state.viewsFromRoomWindow.map(
            (viewFromRoomWindow) => {
              return viewFromRoomWindow._id === updatedViewFromRoomWindow._id
                ? updatedViewFromRoomWindow
                : viewFromRoomWindow;
            }
          );

        if (DEBUG)
          console.log("UpdateViewFromRoomWindow (API): room type was updated.");
      }
    );
    builder.addCase(UpdateViewFromRoomWindow.pending, (state, { payload }) => {
      state.updateViewFromRoomWindow.error = "";
      state.updateViewFromRoomWindow.isLoading = true;
    });
    builder.addCase(UpdateViewFromRoomWindow.rejected, (state, { payload }) => {
      state.updateViewFromRoomWindow.isLoading = false;
      state.updateViewFromRoomWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteViewFromRoomWindow.fulfilled,
      (state, { payload }: { payload: { id: string } }) => {
        state.updateViewFromRoomWindow.isLoading = false;
        if (state.viewsFromRoomWindow)
          state.viewsFromRoomWindow = state.viewsFromRoomWindow.filter(
            (viewFromRoomWindow) => viewFromRoomWindow._id !== payload.id
          );

        if (DEBUG)
          console.log(
            "DeleteViewFromRoomWindow (API): room category was deleted."
          );
      }
    );
    builder.addCase(DeleteViewFromRoomWindow.pending, (state, { payload }) => {
      state.updateViewFromRoomWindow.error = "";
      state.updateViewFromRoomWindow.isLoading = true;
    });
    builder.addCase(DeleteViewFromRoomWindow.rejected, (state, { payload }) => {
      state.updateViewFromRoomWindow.isLoading = false;
      state.updateViewFromRoomWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = viewsFromRoomWindowSlice.actions;
