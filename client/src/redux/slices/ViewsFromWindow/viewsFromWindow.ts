import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createViewFromWindow,
  deleteViewFromWindow,
  getViewsFromWindow,
  updateViewFromWindow,
} from "./httpRequests";
import {
  CreateViewFromWindowApiResponseType,
  CreateViewFromWindowType,
  GetViewsFromWindowApiResponseType,
  ViewFromWindowType,
  UpdateViewFromWindowApiResponseType,
  UpdateViewFromWindowType,
} from "./types";

const DEBUG = true;

// API requests
export const GetViewsFromWindow = createAsyncThunk(
  "viewsFromWindow/getAll",
  async (payload: {}, thunkAPI) => {
    try {
      const res = await fetch(`${getViewsFromWindow.url}`, {
        method: getViewsFromWindow.method,
        headers: {
          ...getViewsFromWindow.headers,
        },
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "GetViewsFromWindow (API error): " + res.status + " " + res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("GetViewsFromWindow (API error): " + err);
    }
  }
);

export const CreateViewFromWindow = createAsyncThunk(
  "viewsFromWindow/create",
  async (
    payload: {
      viewFromWindow: CreateViewFromWindowType;
    },
    thunkAPI
  ) => {
    try {
      const { viewFromWindow } = payload;

      const res = await fetch(`${createViewFromWindow.url}`, {
        method: createViewFromWindow.method,
        headers: {
          ...createViewFromWindow.headers,
        },
        body: JSON.stringify(viewFromWindow),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "CreateViewFromWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "CreateViewFromWindow (API error): " + err
      );
    }
  }
);

export const UpdateViewFromWindow = createAsyncThunk(
  "viewsFromWindow/update",
  async (
    payload: {
      viewFromWindow: UpdateViewFromWindowType;
    },
    thunkAPI
  ) => {
    try {
      const { viewFromWindow } = payload;

      const res = await fetch(`${updateViewFromWindow.url}`, {
        method: updateViewFromWindow.method,
        headers: {
          ...updateViewFromWindow.headers,
        },
        body: JSON.stringify(viewFromWindow),
      });

      if (res.status === 200) {
        const json = await res.json();

        return json;
      } else {
        return thunkAPI.rejectWithValue(
          "UpdateViewFromWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "UpdateViewFromWindow (API error): " + err
      );
    }
  }
);

export const DeleteViewFromWindow = createAsyncThunk(
  "viewsFromWindow/delete",
  async (
    payload: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const { id } = payload;

      const res = await fetch(`${deleteViewFromWindow.url}/${id}`, {
        method: deleteViewFromWindow.method,
        headers: {
          ...deleteViewFromWindow.headers,
        },
      });

      if (res.status === 204) {
        return { id };
      } else {
        return thunkAPI.rejectWithValue(
          "DeleteViewFromWindow (API error): " +
            res.status +
            " " +
            res.statusText
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "DeleteViewFromWindow (API error): " + err
      );
    }
  }
);

interface IRoomTypeState {
  viewsFromWindow: ViewFromWindowType[] | null;
  getViewsFromWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  getViewFromWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  createViewFromWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  updateViewFromWindow: {
    data: ViewFromWindowType | null;
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
  deleteViewFromWindow: {
    successMessage: string | null;
    error: any;
    isLoading: boolean;
  };
}

const initialState: IRoomTypeState = {
  viewsFromWindow: null,
  getViewsFromWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  getViewFromWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  createViewFromWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
  updateViewFromWindow: {
    data: null,
    successMessage: null,
    error: null,
    isLoading: false,
  },
  deleteViewFromWindow: {
    successMessage: null,
    error: null,
    isLoading: false,
  },
};

export const viewsFromWindowSlice = createSlice({
  name: "viewsFromWindow",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      GetViewsFromWindow.fulfilled,
      (state, { payload }: { payload: GetViewsFromWindowApiResponseType }) => {
        state.getViewsFromWindow.isLoading = false;
        const viewsFromWindow = payload.data;
        state.viewsFromWindow = viewsFromWindow;

        if (DEBUG)
          console.log("GetViewsFromWindow (API): rooms types was recieved.");
      }
    );
    builder.addCase(GetViewsFromWindow.pending, (state, { payload }) => {
      state.getViewsFromWindow.error = "";
      state.getViewsFromWindow.isLoading = true;
    });
    builder.addCase(GetViewsFromWindow.rejected, (state, { payload }) => {
      state.getViewsFromWindow.isLoading = false;
      state.getViewsFromWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      CreateViewFromWindow.fulfilled,
      (
        state,
        { payload }: { payload: CreateViewFromWindowApiResponseType }
      ) => {
        state.createViewFromWindow.isLoading = false;
        const viewFromWindow = payload.data;
        if (state.viewsFromWindow) {
          state.viewsFromWindow.push(viewFromWindow);
        } else {
          state.viewsFromWindow = [viewFromWindow];
        }
        if (DEBUG)
          console.log("CreateViewFromWindow (API): room type was created.");
      }
    );
    builder.addCase(CreateViewFromWindow.pending, (state, { payload }) => {
      state.createViewFromWindow.error = "";
      state.createViewFromWindow.isLoading = true;
    });
    builder.addCase(CreateViewFromWindow.rejected, (state, { payload }) => {
      state.createViewFromWindow.isLoading = false;
      state.createViewFromWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      UpdateViewFromWindow.fulfilled,
      (
        state,
        { payload }: { payload: UpdateViewFromWindowApiResponseType }
      ) => {
        state.updateViewFromWindow.isLoading = false;
        const updatedViewFromWindow = payload.data;
        if (state.viewsFromWindow)
          state.viewsFromWindow = state.viewsFromWindow.map(
            (viewFromWindow) => {
              return viewFromWindow.id === updatedViewFromWindow.id
                ? updatedViewFromWindow
                : viewFromWindow;
            }
          );

        if (DEBUG)
          console.log("UpdateViewFromWindow (API): room type was updated.");
      }
    );
    builder.addCase(UpdateViewFromWindow.pending, (state, { payload }) => {
      state.updateViewFromWindow.error = "";
      state.updateViewFromWindow.isLoading = true;
    });
    builder.addCase(UpdateViewFromWindow.rejected, (state, { payload }) => {
      state.updateViewFromWindow.isLoading = false;
      state.updateViewFromWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
    builder.addCase(
      DeleteViewFromWindow.fulfilled,
      (state, { payload }: { payload: { id: number } }) => {
        state.updateViewFromWindow.isLoading = false;
        if (state.viewsFromWindow)
          state.viewsFromWindow = state.viewsFromWindow.filter(
            (viewFromWindow) => viewFromWindow.id !== payload.id
          );

        if (DEBUG)
          console.log("DeleteViewFromWindow (API): room category was deleted.");
      }
    );
    builder.addCase(DeleteViewFromWindow.pending, (state, { payload }) => {
      state.updateViewFromWindow.error = "";
      state.updateViewFromWindow.isLoading = true;
    });
    builder.addCase(DeleteViewFromWindow.rejected, (state, { payload }) => {
      state.updateViewFromWindow.isLoading = false;
      state.updateViewFromWindow.error = payload;
      if (DEBUG) console.log(payload);
    });
  },
});

export const {} = viewsFromWindowSlice.actions;
