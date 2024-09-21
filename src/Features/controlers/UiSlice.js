import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "Ui controller",
  initialState: {
    theme: localStorage.getItem("theme") && true,
  },
  reducers: {
    ChangeTheme: (state) => {
      localStorage.setItem("theme", !state.theme);
      state.theme = localStorage.getItem('theme')
    },
  },
});

export const { ChangeTheme } = ThemeSlice.actions;