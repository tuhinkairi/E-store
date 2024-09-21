import { createSlice } from "@reduxjs/toolkit";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";
const MODE_CLASS = "_mode";

export const ThemeSlice = createSlice({
  name: "Ui controller",
  initialState: {
    theme: localStorage.getItem("theme") || THEME_DARK,
  },
  reducers: {
    ChangeTheme: (state) => {
      const newTheme = state.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
      state.theme = newTheme;

      document.documentElement.classList.toggle(THEME_DARK, newTheme === THEME_DARK);
      document.documentElement.classList.toggle(THEME_LIGHT, newTheme === THEME_LIGHT);

      const modeElements = document.querySelectorAll(`.${MODE_CLASS}`);
      modeElements.forEach((element) => {
        const mode = element.innerText === "light_mode" ? "dark_mode" : "light_mode";
        element.innerText = mode;
      });

      localStorage.setItem("theme", newTheme);
    },
  },
});

export const { ChangeTheme } = ThemeSlice.actions;