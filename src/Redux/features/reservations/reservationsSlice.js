import { createSlice } from "@reduxjs/toolkit";
import { markRoomAsAvailable } from "../rooms/roomsSlice"; 
const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
  },
  reducers: {
    bookRoom: (state, action) => {
      state.reservations.push(action.payload);
    },
    cancelReservation: (state, action) => {
      state.reservations = state.reservations.filter(
        (res) => res.id !== action.payload
      );
    },
  },
});

 
export const cancelRoomWithUpdate =
  ({ id, roomId }) =>
  (dispatch) => {
    dispatch(reservationsSlice.actions.cancelReservation(id));
    dispatch(markRoomAsAvailable(roomId));
  };

export const { bookRoom, cancelReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;
