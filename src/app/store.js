import {configureStore} from '@reduxjs/toolkit'
import userAuthReducer from '../features/userAuth/userAuthSlice'
 import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
export const store = configureStore({
    reducer:{
        userAuth:userAuthReducer,
        adminAuth:adminAuthReducer
    }
})