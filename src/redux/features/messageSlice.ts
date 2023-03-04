import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';


interface MessageData {
    message: string;
    userID: number;
}

export const getAllChats = createAsyncThunk(
    'job/getAllChats',
    async (thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}account/all-chats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSingleChat = createAsyncThunk(
    'job/getSingleChat',
    async (userID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}account/chat-with-user/${userID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const sendMesage = createAsyncThunk(
    'job/createJob',
    async (data: MessageData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}account/send-message/${data.userID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

interface JobState {
    allChats: any;
    singleChat: any;
    success: boolean;
    error: '';
    message: '';
    loading: boolean;
    loadingFetchAllChats: boolean;
    successFetchAllChats: boolean;
    loadingFetchSingleChat: boolean;
    successFetchSingleChat: boolean;
}

const initialState: JobState = {
    allChats: [],
    singleChat: [],
    success: false,
    error: '',
    message: '',
    loading: false,
    loadingFetchAllChats: false,
    successFetchAllChats: false,
    loadingFetchSingleChat: false,
    successFetchSingleChat: false,
}

const messageSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchAllChats = false;
            state.successFetchSingleChat = false;
        },
        clearError: (state) => {
            state.error = '';
            state.success = false;
            state.successFetchAllChats = false;
            state.successFetchSingleChat = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllChats.pending, (state) => {
            state.loadingFetchAllChats = true;
        });
        builder.addCase(getAllChats.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchAllChats = false;
            state.successFetchAllChats = true;
            state.allChats = action.payload.data;
        });
        builder.addCase(getAllChats.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchAllChats = false;
            state.error = action.payload?.message;
        });
        builder.addCase(getSingleChat.pending, (state) => {
            state.loadingFetchSingleChat = true;
        });
        builder.addCase(getSingleChat.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchSingleChat = false;
            state.successFetchSingleChat = true;
            state.singleChat = action.payload.data.reverse();
        });
        builder.addCase(getSingleChat.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchSingleChat = false;
            state.error = action.payload?.message;
        });
        builder.addCase(sendMesage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendMesage.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(sendMesage.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
    }
})

export const { clearMessage, clearError } = messageSlice.actions;

export default messageSlice.reducer;