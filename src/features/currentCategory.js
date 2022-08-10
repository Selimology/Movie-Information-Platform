import { createSlice } from '@reduxjs/toolkit';

export const category = createSlice({
  name: 'category',
  initialState: {
    categoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectCategory: (state, action) => {
      console.log(action.payload);
      // state.categoryName=
    },
  },
});

export const { selectCategory } = category.actions;
export default category.reducer;
