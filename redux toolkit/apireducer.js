import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loader: false,
  error: '',
};
export const ApiCall = () => {
  return dispatch => {
    dispatch(ApiCallStart());
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(response => {
        console.log('response:', response);
        dispatch(ApiSuccess(response));
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(ApiFailure(error));
      });
  };
};
export const apireducer = createSlice({
  name: 'apireducer',
  initialState,
  reducers: {
    ApiCallStart: state => {
      state.loader = true;
    },
    ApiSuccess: (state, action) => {
      console.log('Action-Success:', action);
      state.loader = false;
    },
    ApiFailure: (state, action) => {
      state.loader = false;
      console.log('Action-Failure:', action);
    },
  },
});
export const {ApiCallStart, ApiSuccess, ApiFailure} = apireducer.actions;
export default apireducer.reducer;
