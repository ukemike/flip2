import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';

// payment_method delivery_address phone amount cart

interface OrderData {
    payment_method: string;
    delivery_address: string;
    phone: string;
    amount: number;
    cart: any;
    orderID: number
}

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (data: OrderData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/order/place-order`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getOrdersByMe = createAsyncThunk(
    'order/getOrdersByMe',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/order/orders-by-me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getOrdersForMerchant = createAsyncThunk(
    'order/getOrdersForMerchant',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/merchant/order/orders-for-merchants`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const acceptOrder = createAsyncThunk(
    'order/acceptOrder',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/order/accept-order/${data.orderID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const rejectOrder = createAsyncThunk(
    'order/rejectOrder',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/order/reject-order/${data.orderID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


interface OrderState {
    order: any;
    loading: boolean;
    error: any;
    message: string;
    success: boolean;
    loadingFetchOrders: boolean;
    orders: any;
    ordersForMe: any;
    successFetchOrders: boolean;
}

const initialState: OrderState = {
    order: {},
    loading: false,
    error: '',
    message: '',
    success: false,
    loadingFetchOrders: false,
    orders: [],
    ordersForMe: [],
    successFetchOrders: false,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = '';
            state.success = false;
        },
        clearError(state) {
            state.error = '';
            state.success = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.order = action.payload;
            state.message = action.payload?.message;
            state.success = true;
        })
        builder.addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
            state.success = false;
        })
        builder.addCase(getOrdersByMe.pending, (state) => {
            state.loadingFetchOrders = true;
        })
        builder.addCase(getOrdersByMe.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchOrders = false;
            state.ordersForMe = action.payload.data
            state.successFetchOrders = true;
        })
        builder.addCase(getOrdersByMe.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchOrders = false;
            state.error = action.payload?.message;
            state.successFetchOrders = false;
        })
        builder.addCase(getOrdersForMerchant.pending, (state) => {
            state.loadingFetchOrders = true;
        })
        builder.addCase(getOrdersForMerchant.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchOrders = false;
            state.orders = action.payload.data
            state.successFetchOrders = true;
        })
        builder.addCase(getOrdersForMerchant.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchOrders = false;
            state.error = action.payload?.message;
            state.successFetchOrders = false;
        })
        builder.addCase(acceptOrder.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(acceptOrder.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.success = true;
        })
        builder.addCase(acceptOrder.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
            state.success = false;
        })
        builder.addCase(rejectOrder.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(rejectOrder.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload?.message;
            state.success = true;
        })
        builder.addCase(rejectOrder.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
            state.success = false;
        })
    }
})

export const { clearMessage, clearError } = orderSlice.actions;

export default orderSlice.reducer;