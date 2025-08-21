import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProps } from "../../types/user";

const STORAGE_KEY = "elegance_session";

const loadState = (): UserProps | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? (JSON.parse(data) as UserProps) : null;
    } catch {
        return null;
    }
};

const saveState = (state: string | null) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(""));
    }
};

// ✅ Explicit type annotation
const initialState: UserProps | null = loadState();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserAuth: (state, action: PayloadAction<UserProps>) => {
            const newState = action.payload;
            saveState(newState.token);
            return newState;
        },
        updateUserAuthField: <K extends keyof UserProps>(
            state: UserProps | null,
            action: PayloadAction<{ field: K; value: UserProps[K] }>
        ) => {
            if (state) {
                state[action.payload.field] = action.payload.value;
                if ("token" === action.payload.field) {
                    saveState(state.token);
                }
            }
        },
        logout: () => {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        },
    },
});

export const { setUserAuth, updateUserAuthField, logout } = userSlice.actions;
export default userSlice;
