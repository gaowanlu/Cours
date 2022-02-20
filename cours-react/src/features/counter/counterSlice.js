import {
  createSlice
} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
};



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      
    },
    decrement: (state) => {
      
    },
    incrementByAmount: (state, action) => {
      
    }
  }
});

export const {
  increment,
  decrement,
  incrementByAmount
} = counterSlice.actions;



export default counterSlice.reducer;