import { createSlice } from '@reduxjs/toolkit';

const PersistenceSlice = createSlice({
  name: 'persistence',
  initialState: true,
  reducers: {
    togglePersistence: (_state, action) => {
      return action.payload;
    },
  },
});

export const { togglePersistence } = PersistenceSlice.actions;
export default PersistenceSlice.reducer;
