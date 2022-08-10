import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllThreats,
  createNewThreat,
  updateThreatById,
  deleteThreatById
} from '../../api/threatAPI';

const initialState = {
  threats: [
    {
      id: 0,
      name: "",
      tier: "",
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

export const fetchThreats = createAsyncThunk(
  'threats/fetchThreats',
  async (accessToken, { rejectWithValue }) => {
    const response = await fetchAllThreats(accessToken);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const createThreat = createAsyncThunk(
  'threats/createThreat',
  async (payload, { rejectWithValue }) => {
    const response = await createNewThreat(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const updateThreat = createAsyncThunk(
  'threats/updateThreat',
  async (payload, { rejectWithValue }) => {
    const response = await updateThreatById(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const deleteThreat = createAsyncThunk(
  'threats/deleteThreat',
  async (payload, { rejectWithValue }) => {
    const response = await deleteThreatById(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const threatSlice = createSlice({
  name: 'threats',
  initialState,
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.errorMessages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreats.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(fetchThreats.fulfilled, (state, action) => {
        state.threats = action.payload;
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(fetchThreats.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(createThreat.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(createThreat.fulfilled, (state, action) => {
        state.threats.push(action.payload);
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(createThreat.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(updateThreat.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateThreat.fulfilled, (state, action) => {
        const index = state.threats.findIndex(threat => threat.id === action.payload.id);
        state.threats[index] = action.payload;

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateThreat.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(deleteThreat.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(deleteThreat.fulfilled, (state, action) => {
        state.threats = action.payload;
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(deleteThreat.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      });
  },
});

export const { resetErrorState } = threatSlice.actions;

export default threatSlice.reducer;
