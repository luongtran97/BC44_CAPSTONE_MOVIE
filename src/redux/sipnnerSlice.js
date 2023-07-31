import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const sipnnerSlice = createSlice({
  name: "sipnnerSlice",
  initialState,
  reducers: {
    batLoading: ( state) => {
      state.isLoading = true;
    },
    tatLoading: ( state) => {
      state.isLoading = false;
    },
  },
});

export const { batLoading, tatLoading } = sipnnerSlice.actions;

export default sipnnerSlice.reducer;
