import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "Ui controller",
  initialState: {
    isDarkMode: localStorage.getItem("theme") === "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      console.log(state.isDarkMode)
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
      const html = document.documentElement;
      state.isDarkMode ? html.classList.add("dark") : html.classList.remove("dark");
    },        
    },
  });

export const { toggleTheme } = ThemeSlice.actions;



