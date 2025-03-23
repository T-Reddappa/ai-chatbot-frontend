import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: string;
  username: string;
  token: string;
  loading: boolean;
  error: string | null;
  message: string;
}

const initialState: AuthState = {
  userId: "",
  username: "",
  token: "",
  loading: false,
  error: null,
  message: "",
};

const setAuthData = (data: {
  token: string;
  username: string;
  userId: string;
}) => {
  localStorage.setItem("authData", JSON.stringify(data));
};

const clearAuthData = () => {
  localStorage.removeItem("authData");
};

const getAuthData = () => {
  const data = localStorage.getItem("authData");
  return data ? JSON.parse(data) : null;
};

export const signInUser = createAsyncThunk<
  { userId: string; username: string; token: string; message: string },
  { username: string; password: string },
  { rejectValue: string }
>("auth/signInUser", async (credentials, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3002/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid credentials");
    }

    const result = await response.json();
    setAuthData({
      userId: result.userId,
      username: result.username,
      token: result.token,
    });
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to sign in");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      (state.userId = ""),
        (state.username = ""),
        (state.token = ""),
        (state.loading = false),
        (state.error = null),
        (state.message = ""),
        clearAuthData();
    },
    loadAuthFromStorage: (state) => {
      const data = getAuthData();
      if (data) {
        state.userId = data.userId;
        state.username = data.username;
        state.token = data.token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Sign-in failed";
      });
  },
});

export const { signout, loadAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
