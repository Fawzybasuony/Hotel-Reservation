import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockRooms = [
  { id: 1, type: "Single", price: 120, available: true, capacity: 1, amenities: "WiFi, TV" },
  { id: 2, type: "Double", price: 200, available: true, capacity: 2, amenities: "WiFi, TV, AC" },
  { id: 3, type: "Suite", price: 450, available: true, capacity: 4, amenities: "WiFi, TV, AC, Mini Bar" },
];

 
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const savedRooms = localStorage.getItem("rooms");
  if (savedRooms) return JSON.parse(savedRooms);
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRooms), 800);
  });
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {
    markRoomAsBooked: (state, action) => {
      const room = state.rooms.find((r) => r.id === action.payload);
      if (room) room.available = false;
      localStorage.setItem("rooms", JSON.stringify(state.rooms));  
    },

    markRoomAsAvailable: (state, action) => {
      const room = state.rooms.find((r) => r.id === action.payload);
      if (room) room.available = true;
      localStorage.setItem("rooms", JSON.stringify(state.rooms));  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load rooms";
      });
  },
});

export const { markRoomAsBooked, markRoomAsAvailable } = roomsSlice.actions;
export default roomsSlice.reducer;
