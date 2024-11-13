import { createSlice } from '@reduxjs/toolkit';

const DebugModeSlice = createSlice({
  name: 'debugMode',
  initialState: localStorage.getItem('debug') === 'true' || false,
  reducers: {
    toggleDebugMode: (_state, action) => {
      return action.payload;
    },
  },
});

export const { toggleDebugMode } = DebugModeSlice.actions;
export default DebugModeSlice.reducer;
