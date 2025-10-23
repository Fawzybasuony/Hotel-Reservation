 
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white  rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      
      <div className="h-48 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
          alt={`${room.type} room`}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

    
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {room.type} Room
        </h2>
        <p className="text-gray-600 text-sm mb-2">${room.price} / night</p>

        <p
          className={`text-sm font-medium mb-3 ${
            room.available ? "text-green-600" : "text-red-500"
          }`}
        >
          {room.available ? "Available" : "Not Available"}
        </p>

        <Link
          to={`/room/${room.id}`}
          className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
