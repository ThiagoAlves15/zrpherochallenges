import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import {
  fetchAllHeroes
} from '../../api/heroAPI';

const initialState = {
  heroes: [
    {
      id: 0,
      name: "",
      rank: "",
      latitude: "",
      longitude: "",
      created_at: "",
      updated_at: ""
    }
  ],
  loading: true,
  error: false,
  errorMessages: []
}

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async (accessToken, { rejectWithValue }) => {
    const response = await fetchAllHeroes(accessToken);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const createHero = createAsyncThunk(
  'heroes/createHero',
  async (payload, { rejectWithValue }) => {
    const response = await fetchAllHeroes(payload.accessToken);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.errorMessages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        return produce(state, (draft) => {
          draft.loading = true;
          draft.error = false;
          draft.errorMessages = [];
        })
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        return produce(state, (draft) => {
          draft.heroes = action.payload;
          draft.loading = false;
          draft.error = false;
          draft.errorMessages = [];
        })
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        return produce(state, (draft) => {
          draft.loading = false;
          draft.error = true;
          draft.errorMessages = action.payload;
        })
      });
  },
});

export const {  } = heroSlice.actions;

export default heroSlice.reducer;
