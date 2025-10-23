import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { bookRoom } from "../Redux/features/reservations/reservationsSlice";
import { markRoomAsBooked } from "../Redux/features/rooms/roomsSlice" 

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const { user } = useSelector((state) => state.auth);

  const room = rooms.find((r) => r.id === parseInt(id));
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!room) return <p className="text-center mt-10">Room not found</p>;

const handleBooking = () => {
  if (!checkIn || !checkOut) {
    toast.error("Please select check-in and check-out dates");
    return;
  }

  const reservation = {
    id: Date.now(),
    roomId: room.id,
    roomType: room.type,
    price: room.price,
    checkIn,
    checkOut,
  };

  dispatch(bookRoom(reservation));
dispatch(markRoomAsBooked(room.id));

  toast.success("Room booked successfully!");
  navigate("/dashboard");
};

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000"
          alt={`${room.type} room`}
          className="w-full h-72 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {room.type} Room
          </h1>
          <p className="text-gray-600 mb-2 text-lg">
            💰 <span className="font-semibold">${room.price}</span> / night
          </p>
          <p className="text-gray-700 mb-2">
            👥 Capacity: {room.capacity} guests
          </p>
          <p className="text-gray-700 mb-6">
            🛏️ Amenities:{" "}
            <span className="text-gray-600">{room.amenities}</span>
          </p>

          {user ? (
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                📅 Book Your Stay
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1 font-medium">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1 font-medium">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                ✅ Book Now
              </button>
            </div>
          ) : (
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-3">
                Please log in to make a reservation.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                🔑 Login to Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
