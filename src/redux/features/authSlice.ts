import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';


interface SignUpData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    application_name: string;
    gender: string;
    category: string;
    merchant_type: string;
    phone: string;
}

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (data: SignUpData, thunkAPI) => {
        try {
            const response = await axios.post(`${baseApi}auth/register`, data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

interface SignInData {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (data: SignInData, thunkAPI) => {
        try {
            const response = await axios.post(`${baseApi}auth/login/flip`, data);
            let token = response.data.token;
            let role = response.data.data.role;
            let merchant_type = response.data.data.profile.merchantType;
            let email = response.data.data.email;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('merchant_type', merchant_type);
            localStorage.setItem('email', email);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

interface VerifyEmailData {
    email: string;
    code: string;
}

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (data: VerifyEmailData, thunkAPI) => {
        try {
            const response = await axios.post(`${baseApi}auth/verify-email`, data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// slice
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    role: string | null;
    merchant_type: string | null;
    user: any;
    success: boolean;
    loading: boolean;
    error: string;
    message: string;
    email: string | null
}

const initialState: AuthState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    isAuthenticated: typeof window !== 'undefined' ? localStorage.getItem('token') ? true : false : false,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
    merchant_type: typeof window !== 'undefined' ? localStorage.getItem('merchant_type') : null,
    user: {},
    success: false,
    loading: false,
    error: '',
    message: '',
    email: typeof window !== 'undefined' ? localStorage.getItem('email') : null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.user = {};
            state.isAuthenticated = false;
            state.role = '';
            state.merchant_type = '';
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('merchant_type');
            localStorage.removeItem('email');
            window.location.href = '/';
        },
        clearError: (state) => {
            state.error = '';
            state.success = false;
        },
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.success = false;
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = true;
                state.token = action.payload.token;
                state.user = action.payload.data;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
                state.success = false;
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(signIn.pending, (state) => {
                state.success = false;
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = true;
                state.token = action.payload.token;
                state.user = action.payload.data;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
                state.success = false;
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.success = false;
                state.loading = true;
            })
            .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = true;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(verifyEmail.rejected, (state, action: PayloadAction<any>) => {
                state.success = false;
                state.error = action.payload.message;
                state.loading = false;
            })
    }

});

export const { logout, clearError, clearMessage } = authSlice.actions;

export default authSlice.reducer;