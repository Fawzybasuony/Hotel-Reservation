import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRooms } from "../Redux/features/rooms/roomsSlice";
import RoomCard from "../components/RoomCard";
import Loader from "../components/Loader";
const Home = () => {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.rooms);
  const [filterType, setFilterType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const filteredRooms = rooms.filter((room) => {
    const matchesType = filterType === "all" || room.type === filterType;
    const matchesPrice = room.price <= maxPrice;
    return matchesType && matchesPrice;
  });

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Available Hotel Rooms
      </h1>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Filter Your Search
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-start w-full md:w-auto">
            <label className="text-gray-700 font-medium mb-2">Room Type</label>
            <select
              className="w-52 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="flex flex-col items-start w-full md:w-auto">
            <label className="text-gray-700 font-medium mb-2">
              Max Price:{" "}
              <span className="text-blue-600 font-semibold">${maxPrice}</span>
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-56 cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Home;
