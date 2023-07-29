import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachGheDat: [],
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    datGhe: (state, action) => {
      const index = state.danhSachGheDat.findIndex(item => item.maGhe === action.payload.maGhe);      
      if (index !== -1) {
        state.danhSachGheDat = state.danhSachGheDat.filter(item => item.maGhe !== action.payload.maGhe);
      } else {
        state.danhSachGheDat.push(action.payload);
      }
    },
  },
});

export const { datGhe } = bookingSlice.actions;

export default bookingSlice.reducer;
