import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData,
        {withCredentials: true}
    );
    return response.data;
})

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        {withCredentials: true}
    );
    return response.data;
})

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
    const response = await axios.get(
        `${API_BASE_URL}/api/auth/check-auth`,
        {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            }
        }
    )

    return response.data;
})

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
    const response = await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {withCredentials: true}
    );
    return response.data;
})

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: () => {
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;