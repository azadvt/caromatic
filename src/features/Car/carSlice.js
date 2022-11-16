import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carService from "./carService";

const initialState = {
  carData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Add Car
export const addCar = createAsyncThunk(
  "car/addCar",
  async (carData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth?.admin?.token
      return await carService.addCar(carData,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCars = createAsyncThunk("car/getCars",async(_,thunkAPI)=>{
      try {
        const token = thunkAPI.getState().adminAuth?.admin?.token

        return await carService.getCars(token)
      } catch (error) {
        const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
      }
})


export const deleteCar = createAsyncThunk("car/deleteCar",async(id,thunkAPI)=>{
  try {
    const token = thunkAPI.getState().adminAuth?.admin?.token
    return await carService.deleteCar(id,token)
  } catch (error) {
    const message = (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
  }
})


export const carSlice = createSlice({
  name: "car",
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
      .addCase(addCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carData = action.payload;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.carData = null;
      })
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(getCars.fulfilled,(state,action)=>{
        state.isLoading = false
        state.carData = action.payload
      }).addCase(getCars.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;

      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
      
  },
});
export const { reset } = carSlice.actions;

export default carSlice.reducer;
