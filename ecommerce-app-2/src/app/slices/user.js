import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: true,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      let { name, email, pass, role } = action.payload;
      state.status = true;
      //rest api den gelen veriye göre değiştirebilir.
      state.user = {
        name: name,
        role: role,
        email: email,
        pass: pass,
      };
    },
    register: (state, action) => {
      let { name, email, pass } = action.payload;
      state.status = true;
      state.user = {
        name: name,
        role: "customer",
        email: email,
        pass: pass,
      };
    },
    logout: (state) => {
      state.status = false;
      state.user = {};
    },
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
