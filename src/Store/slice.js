import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('fetchData', async () => {
  const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

const initialState = {
  user: [],
  selectedUserIds: [],
  checke: false,
  isLoading: false,
  searchQuery: '', // New search query state
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    editData: (state, action) => {
      const user = state.user.find((data) => data.id === action.payload.id);
      if (user) {
        Object.assign(user, action.payload);
      }
    },
    deleteData: (state, action) => {
      state.user = state.user.filter((data) => data.id !== action.payload);
    },
    selectAll: (state) => {
      state.selectedUserIds = state.user.map(user => user.id);
      state.checke = true;
    },
    select: (state, action) => {
      if (!state.selectedUserIds.includes(action.payload)) {
        state.selectedUserIds.push(action.payload);
      }
    },
    deselect: (state, action) => {
      state.selectedUserIds = state.selectedUserIds.filter((id) => id !== action.payload);
    },
    deselectAll: (state) => {
      state.selectedUserIds = [];
      state.checke = false;
    },
    deleteSelected: (state) => {
      state.user = state.user.filter((item) => !state.selectedUserIds.includes(item.id));
      state.selectedUserIds = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Store the search query
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { editData, deleteData, deleteSelected, selectAll, deselectAll, select, deselect, setSearchQuery } = adminSlice.actions;
export default adminSlice.reducer;
