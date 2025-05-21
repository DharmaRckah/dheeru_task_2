import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBooking = createAsyncThunk(
  'booking/create',
  async (bookingData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      console.log("redux response",response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Booking failed');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createBooking.pending, state => { state.loading = true; })
      .addCase(createBooking.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  }
});

export const { resetStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
