import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isStudioSidebarExpanded: boolean;
}

const initialState: InitialState = {
  isStudioSidebarExpanded: true,
};

const toggleSlice = createSlice({
  name: 'toggleSlice',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<Partial<InitialState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { toggle } = toggleSlice.actions;

export default toggleSlice.reducer;
