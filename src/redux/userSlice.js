import { createSlice } from '@reduxjs/toolkit'
import { LocalStoreService } from '../Services/LocalStoreService';

const initialState = {
    userInfo: LocalStoreService.getItem("USER_LOGIN")
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin : (state,action) => { 
        state.userInfo = action.payload
     }
  }
});

export const {setLogin} = userSlice.actions

export default userSlice.reducer