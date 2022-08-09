import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  updateUserProfile,
  logoutUserWithToken,
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

export const updateProfile = createAsyncThunk(
  'session/updateProfile',
  async (payload, { rejectWithValue }) => {
    const response = await updateUserProfile(
      payload?.email,
      payload?.password,
      payload.currentPassword,
      payload.accessToken
    );

    if (response.errors) {
      return rejectWithValue(response.errors);
    }

    return response;
  }
);


export const loginUser = createAsyncThunk(
  'session/loginUser',
  async (payload, { rejectWithValue }) => {
    const loginResponse = await loginWithEmailAndPassword(
      payload.email,
      payload.password
    );

    if (loginResponse.error) {
      return rejectWithValue(loginResponse);
    }

    const userResponse = await getCurrentUser(loginResponse.access_token);

    if (userResponse.error) {
      return rejectWithValue(userResponse.data);
    }

    const response = {
      ...loginResponse,
      ...userResponse,
    };

    return response;
  }
);

export const logoutUser = createAsyncThunk(
  'session/logoutUser',
  async (payload, { rejectWithValue }) => {
    const response = await logoutUserWithToken(payload);

    if (response.error) {
      return rejectWithValue(response);
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

    const userResponse = await getCurrentUser(refreshResponse.access_token);

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
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.errorMessages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
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
        state.errorMessages = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
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
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = ["Invalid credentials"];
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
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
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = undefined;
        state.refreshToken = undefined;
        state.expiresIn = undefined;
        state.tokenType = undefined;

        state.currentUser = {
          id: undefined,
          email: undefined,
          role: undefined,
          createdAt: undefined,
        };

        removeRefreshToken();

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
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
      .addCase(refreshAccessToken.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

function getRefreshToken() {
  return localStorage.getItem('refresToken');
}

function storeRefreshToken(token) {
  localStorage.setItem('refresToken', token);
}

function removeRefreshToken() {
  localStorage.removeItem('refresToken');
}

export const { resetErrorState } = sessionSlice.actions;

export default sessionSlice.reducer;
