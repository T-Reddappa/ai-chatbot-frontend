import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Character {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetch",
  async () => {
    console.log("fetch characters requested");
    const response = await fetch("http://localhost:3002/characters");
    const data = await response.json();
    return data.characters;
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload;
        state.loading = false;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch characters";
      });
  },
});

export default charactersSlice.reducer;
