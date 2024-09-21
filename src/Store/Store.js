import { configureStore } from "@reduxjs/toolkit";
import { ThemeSlice } from "../Features/controlers/UiSlice";

export default configureStore({
    reducer:{
        theme : ThemeSlice.reducer
    }
});