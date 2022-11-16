import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    userData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

  export const getUsers = createAsyncThunk("user/getUsers",async(_,thunkAPI)=>{
    try {
      const token = thunkAPI.getState().adminAuth?.admin?.token

      const data =  await userService.getUsers(token)
      console.log(data);

      return data
    } catch (error) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    }
})


export const blockUser = createAsyncThunk("user/blockUser",async(id,thunkAPI)=>{
    try {
      const token = thunkAPI.getState().adminAuth?.admin?.token
      return await userService.blockUser(id,token)
    } catch (error) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    }
})



export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUsers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.userData = action.payload

        })
        .addCase(getUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.userData = null;
        })
        .addCase(blockUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(blockUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
          })
          .addCase(blockUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
        
    },
    
  });
  export const { reset } = userSlice.actions;
  
  export default userSlice.reducer;
  