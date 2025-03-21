import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  token: string;
  loading: boolean;
  error: string | null;
  message: string;
}

const initialState: AuthState = {
  username: "",
  token: "",
  loading: false,
  error: null,
  message: "",
};

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      console.log("credetials:", credentials);
      const response = await fetch("http://localhost:3002/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const result = await response.json();
      console.log("result", result);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      state.username = "";
      (state.token = ""), (state.loading = false);
      state.error = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("user signingin innnn");
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log(action.payload, "fullfiilled signing");
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.loading = false;
        state.message = action.payload.message;
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
