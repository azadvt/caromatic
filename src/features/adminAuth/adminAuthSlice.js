import { createSlice,createAsyncThunk} from "@reduxjs/toolkit"; 
    import authAdminService from "./adminAuthService";

//get user form localStorage    

const admin = JSON.parse(localStorage.getItem('admin'))
const initialState = {
    admin:admin ? admin :null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}


//Login user
export const  adminLogin = createAsyncThunk('authAdmin/login',async(admin,thunkAPI) => {
    try {
        return await authAdminService.adminLogin(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const adminLogout =   ('authAdmin/logout',async()=> {
    await authAdminService.adminLogout()
}) 

export const authAdminSlice = createSlice({
    name:'authAdmin',
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
        .addCase(adminLogin.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =  true
            state.message = action.payload
            state.admin = null
        })
        
       
    }
}) 

export const {reset} = authAdminSlice.actions
export default authAdminSlice.reducer   