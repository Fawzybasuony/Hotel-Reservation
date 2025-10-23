import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoomDetails from "./pages/RoomDetailsPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Dashboard from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
