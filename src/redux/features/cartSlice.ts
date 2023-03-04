import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';

interface CartData {
    number_of_items: number;
    productID: number;
    cartID: number;
}

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (data: CartData,  thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/cart/create-cart/${data.productID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCartAdd = createAsyncThunk(
    'cart/updateCartAdd',
    async (data: CartData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/cart/update-cart/${data.cartID}/add`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateCartRemove = createAsyncThunk(
    'cart/updateCartRemove',
    async (data: CartData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/cart/update-cart/${data.cartID}/remove`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (cartID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/cart/remove-cart-item/${cartID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/cart/get-cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

interface CartState {
    cartItems: any;
    success: boolean;
    loading: boolean;
    error: any;
    message: string;
    loadingFetchCart: boolean;
    successFetchCart: boolean;
    errorFetchCart: any;
    loadingUpdateCart: boolean;
}

const initialState: CartState = {
    cartItems: [],
    success: false,
    loading: false,
    error: null,
    message: '',
    loadingFetchCart: false,
    successFetchCart: false,
    errorFetchCart: null,
    loadingUpdateCart: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchCart = false;
        },
        clearError: (state) => {
            state.error = null;
            state.success = false;
            state.successFetchCart = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message
        });

        builder.addCase(updateCartAdd.pending, (state) => {
            state.loadingUpdateCart = true;
        });
        builder.addCase(updateCartAdd.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingUpdateCart = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(updateCartAdd.rejected, (state, action: PayloadAction<any>) => {
            state.loadingUpdateCart = false;
            state.error = action.payload?.message
        });
        builder.addCase(updateCartRemove.pending, (state) => {
            state.loadingUpdateCart = true;
        });
        builder.addCase(updateCartRemove.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingUpdateCart = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(updateCartRemove.rejected, (state, action: PayloadAction<any>) => {
            state.loadingUpdateCart = false;
            state.error = action.payload?.message
        });

        builder.addCase(removeFromCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(removeFromCart.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message
        });

        builder.addCase(getCart.pending, (state) => {
            state.loadingFetchCart = true;
        });
        builder.addCase(getCart.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchCart = false;
            state.successFetchCart = true;
            state.cartItems = action.payload.data;
        });
        builder.addCase(getCart.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchCart = false;
            state.errorFetchCart = action.payload?.message
        });
    }
})

export const { clearMessage, clearError } = cartSlice.actions;

export default cartSlice.reducer;