import { configureStore } from "@reduxjs/toolkit";
import { ThemeSlice } from "../Features/controlers/UiSlice";
import userSlice from "../Features/user/UserSlice";

export default configureStore({
    reducer:{
        theme : ThemeSlice.reducer,
        user: userSlice.reducer
    }
});