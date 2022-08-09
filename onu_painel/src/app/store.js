import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './feature/sessions/sessionSlice'
import heroReducer from './feature/heroes/heroSlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    heroes: heroReducer,
  }
});
