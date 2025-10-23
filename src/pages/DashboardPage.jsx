import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { markRoomAsAvailable } from "../Redux/features/rooms/roomsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reservations } = useSelector((state) => state.reservations);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
        <p className="text-lg font-medium text-gray-700 bg-white p-6 rounded-xl shadow-md">
          Please <span className="text-blue-600 font-semibold">login</span> to
          view your dashboard.
        </p>
      </div>
    );
  }

  const handleCancel = (id, roomId) => {
    dispatch(markRoomAsAvailable(roomId));
    toast.info("Reservation cancelled.");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here’s a summary of your hotel reservations
          </p>
        </div>

        {/* Reservations Section */}
        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-200">
            <p className="text-gray-600 text-lg">
              You don’t have any reservations yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    {res.roomType} Room
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Check-in:</span> {res.checkIn}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Check-out:</span>{" "}
                    {res.checkOut}
                  </p>
                  <p className="text-gray-800 mt-2 font-semibold">
                    Price: ${res.price}/night
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(res.id, res.roomId)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                 Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
