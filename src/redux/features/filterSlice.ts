import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        minPrice: 0,
        maxPrice: 0,
        rating: 0,
        category: [],
        discount: 0,
        search: '',
    },
    reducers: {
        setMinPrice: (state, action: PayloadAction<number>) => {
            state.minPrice = Math.min(action.payload, state.minPrice)
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = Math.max(action.payload, state.maxPrice)
        },
        setRating: (state, action: PayloadAction<number>) => {
            state.rating = action.payload
        },
        setCategory: (state, action: PayloadAction<[]>) => {
            state.category = action.payload
        },
        setDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
    },
})

export const { setMinPrice, setMaxPrice, setRating, setCategory, setDiscount, setSearch } = filterSlice.actions

export default filterSlice.reducer
