import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getCurrentUser,
  requestAccessTokenWithRefreshToken
} from '../../api/sessionAPI';

const initialState = {
  currentUser: {
    id: undefined,
    email: undefined,
    role: undefined,
    created_at: undefined,
  },
  loading: true,
  error: false,
  errorMessages: [],
  accessToken: undefined,
  refreshToken: getRefreshToken(),
  expiresIn: undefined,
  tokenType: undefined,
}

export const signUpUser = createAsyncThunk(
  'session/signUpUser',
  async (payload, { rejectWithValue }) => {
    const response = await createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);

export const refreshAccessToken = createAsyncThunk(
  'session/refreshAccessToken',
  async (refreshToken, { rejectWithValue }) => {
    if (!refreshToken) {
      return rejectWithValue('No refresh token');
    }

    const refreshResponse = await requestAccessTokenWithRefreshToken(
      refreshToken
    );

    if (refreshResponse.error) {
      return rejectWithValue(refreshResponse.data);
    }

    const userResponse = await getCurrentUser(refreshResponse.acess_token);

    if (userResponse.error) {
      return rejectWithValue(userResponse.data);
    }

    const response = {
      ...refreshResponse,
      ...userResponse,
    };

    return response;
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.acess_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;

        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };

        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.acess_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;

        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };

        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

function getRefreshToken() {
  return localStorage.getItem('refresToken');
}

function storeRefreshToken() {
  localStorage.setItem('refresToken');
}

function removeRefreshToken() {
  localStorage.removeItem('refresToken');
}

// export const { } = sessionSlice.actions;

export default sessionSlice.reducer;
