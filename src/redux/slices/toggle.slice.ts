import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isPrimarySidebarExpanded: boolean;
  isStudioSidebarExpanded: boolean;
  isOpenLoginModal: boolean;
  isOpenUploadModal: boolean;
}

const initialState: InitialState = {
  isPrimarySidebarExpanded: false,
  isStudioSidebarExpanded: true,
  isOpenLoginModal: false,
  isOpenUploadModal: false,
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
