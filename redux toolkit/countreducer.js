import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  counter: 5,
  user: true,
};

export const countslice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.counter += 1;
    },
    decrement: state => {
      state.counter -= 1;
    },
    newUser: state => {
      state.user = false;
    },
  },
});
export const {increment, decrement,newUser} = countslice.actions;
export default countslice.reducer;
