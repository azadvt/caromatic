import { createSlice, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  bookingData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


export const stripeCheckOut = createAsyncThunk("booking/stripe",async(bookingData,thunkAPI)=>{
  try {
    const token = thunkAPI.getState().userAuth?.user?.token;
    return await bookingService.stripeCheckout(bookingData,token)
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
  }
})

//Add booking
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth?.user?.token;
      return await bookingService.addBooking(bookingData, token);
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

export const getBookings = createAsyncThunk(
  "booking/getBookings",
  async (_, thunkAPI) => {
    try {
      const userData = thunkAPI.getState().userAuth?.user;
      return await bookingService.getBookings(userData._id,userData.token);
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

export const getBookingsAdmin = createAsyncThunk(
  "booking/getBookingsAdmin",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth?.admin?.token
      return await bookingService.getBookingsAdmin(token);
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

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth?.user?.token;
      return await bookingService.deleteBooking(id, token);
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

export const bookingSlice = createSlice({
  name: "booking",
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
    .addCase(stripeCheckOut.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(stripeCheckOut.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    })
    .addCase(stripeCheckOut.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.bookingData = null;
    })
      .addCase(addBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.bookingData = null;
      })
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingData = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookingsAdmin.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getBookingsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingData = action.payload;
      })
      .addCase(getBookingsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = bookingSlice.actions;

export default bookingSlice.reducer;
