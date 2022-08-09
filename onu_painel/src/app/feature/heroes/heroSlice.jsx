import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllHeroes,
  createNewHero,
  updateHeroById,
  deleteHeroById
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
    const response = await createNewHero(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const updateHero = createAsyncThunk(
  'heroes/updateHero',
  async (payload, { rejectWithValue }) => {
    const response = await updateHeroById(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async (payload, { rejectWithValue }) => {
    const response = await deleteHeroById(payload);

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
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(createHero.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(createHero.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(updateHero.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        const index = state.heroes.findIndex(hero => hero.id === action.payload.id);
        state.heroes[index] = action.payload;

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(deleteHero.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      });
  },
});

export const { resetErrorState } = heroSlice.actions;

export default heroSlice.reducer;
