import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';


export const getNotifications = createAsyncThunk(
    'notification/getNotifications',
    async (thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}account/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

interface NotificationState {
    success: boolean,
    loading: boolean,
    error: null,
    message: '',
    notifications: [],
}

const initialState: NotificationState = {
    success: false,
    loading: false,
    error: null,
    message: '',
    notifications: [],
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
            state.success = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNotifications.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.notifications = action.payload.data;
        });
        builder.addCase(getNotifications.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    }
})

export const { clearMessage, clearError } = notificationSlice.actions;

export default notificationSlice.reducer;