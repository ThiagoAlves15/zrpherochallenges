import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllOccurrences,
  createNewOccurrence,
  updateOccurrenceById,
} from '../../api/occurrenceAPI';

const initialState = {
  occurrences: [
    {
      id: 0,
      hero_id: 0,
      threat_id: 0,
      hero: {
        id: 0
      },
      threat: {
        id: 0
      }
    }
  ],
  loading: true,
  error: false,
  errorMessages: []
}

export const fetchOccurrences = createAsyncThunk(
  'occurrences/fetchOccurrences',
  async (accessToken, { rejectWithValue }) => {
    const response = await fetchAllOccurrences(accessToken);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const createOccurrence = createAsyncThunk(
  'occurrences/createOccurrence',
  async (payload, { rejectWithValue }) => {
    const response = await createNewOccurrence(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const updateOccurrence = createAsyncThunk(
  'occurrences/updateOccurrence',
  async (payload, { rejectWithValue }) => {
    const response = await updateOccurrenceById(payload);

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const occurrenceSlice = createSlice({
  name: 'occurrences',
  initialState,
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.errorMessages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccurrences.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(fetchOccurrences.fulfilled, (state, action) => {
        state.occurrences = action.payload;
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(fetchOccurrences.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(createOccurrence.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(createOccurrence.fulfilled, (state, action) => {
        state.occurrences.push(action.payload);
        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(createOccurrence.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(updateOccurrence.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateOccurrence.fulfilled, (state, action) => {
        const index = state.occurrences.findIndex(occurrence => occurrence.id === action.payload.id);
        state.occurrences[index] = action.payload;

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateOccurrence.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      });
  },
});

export const { resetErrorState } = occurrenceSlice.actions;

export default occurrenceSlice.reducer;
