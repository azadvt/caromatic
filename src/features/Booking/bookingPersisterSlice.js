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
  },
});
export const { addData ,clear} = persistBookingSlice.actions;

export default persistBookingSlice.reducer;
