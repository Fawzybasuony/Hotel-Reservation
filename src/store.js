import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/features/auth/authSlice";
import roomsReducer from "./Redux/features/rooms/roomsSlice";
import reservationsReducer from "./Redux/features/reservations/reservationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
