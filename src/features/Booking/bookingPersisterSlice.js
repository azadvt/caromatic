import { createSlice, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  bookingData: []
};

export const persistBookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addData: (state, { payload }) => {
        state.bookingData = [payload];
    },
    clear: () => {
        localStorage.removeItem('persist:booking')
    },
    reset:(state) =>{
        state.bookingData = null
    }
  },
});
export const { addData ,clear,reset} = persistBookingSlice.actions;

export default persistBookingSlice.reducer;
