import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./features/GlobalSlice";
import userSlice from "./features/UserSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// ✅ Infer types for strong type safety across app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
