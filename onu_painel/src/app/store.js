import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './feature/sessions/sessionSlice';
import heroReducer from './feature/heroes/heroSlice';
import threatReducer from './feature/threats/threatSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    heroes: heroReducer,
    threats: threatReducer
  }
});
