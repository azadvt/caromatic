import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import userAuthService from './userAuthService'
const user = JSON.parse(localStorage.getItem('user'))
console.log("usererr",user);
const initialState = {
    user:user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//signup user
export const  signup = createAsyncThunk('auth/signup',async(user,thunkAPI) => {
    try {
        return await userAuthService.signup(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Login user
export const  login = createAsyncThunk('auth/login',async(user,thunkAPI) => {
    try {
        return await userAuthService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout =   ('auth/logout',async()=> {
    await userAuthService.logout()
}) 


export const userAuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder 
        .addCase(signup.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(signup.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signup.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =  true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =  true
            state.message = action.payload
            state.user = null
        })
        
        
        
    }
}) 

export const {reset} = userAuthSlice.actions
export default userAuthSlice.reducer