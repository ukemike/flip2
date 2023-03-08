import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import authReducer from './features/authSlice'
import accountReducer from './features/accountSlice'
import productReducer from './features/productSlice'
import serviceReducer from './features/serviceSlice'
import proposalReducer from './features/proposalSlice'
import jobReducer from './features/jobSlice'
import cartReducer from './features/cartSlice'
import orderReducer from './features/orderSlice'
import messageSlice from './features/messageSlice'
import notificationSlice from './features/notificationSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            account: accountReducer,
            product: productReducer,
            service: serviceReducer,
            proposal: proposalReducer,
            job: jobReducer,
            cart: cartReducer,
            order: orderReducer,
            message: messageSlice,
            notification: notificationSlice,
        }
    })
}

const store = makeStore()

export type RootState = ReturnType<typeof store.getState>

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
