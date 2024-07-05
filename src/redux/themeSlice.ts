import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  darkmode: boolean;
};

const initialState: ThemeState = {
  darkmode: true,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState): ThemeState => {
      return {
        ...state,
        darkmode: !state.darkmode,
      };
    },
    setTheme: (
      state: ThemeState,
      action: PayloadAction<boolean>
    ): ThemeState => {
      return {
        ...state,
        darkmode: action.payload,
      };
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
