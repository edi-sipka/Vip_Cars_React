import {
  Routes, Route,
  // Outlet, Navigate,
} from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Details from './components/Details';
import MyReservations from './components/Reservation';
import ReservePage from './components/ReservePage';
import ReservationDetails from './components/ReservationDetails';
import MainPage from './components/MainPage';
import './App.css';
import AddCar from './components/AddCar';
import DeleteCar from './components/DeleteCar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth loginPath="/login"><MainPage /></RequireAuth>} />
      <Route path="/cars/:id" element={<RequireAuth loginPath="/login"><Details /></RequireAuth>} />
      <Route path="/reservations" element={<RequireAuth loginPath="/login"><MyReservations /></RequireAuth>} />
      <Route path="/reserve/:id" element={<RequireAuth loginPath="/login"><ReservePage /></RequireAuth>} />
      <Route path="/reserve" element={<RequireAuth loginPath="/login"><ReservationDetails /></RequireAuth>} />
      <Route path="/add_car" element={<RequireAuth loginPath="/login"><AddCar /></RequireAuth>} />
      <Route path="/delete_car" element={<RequireAuth loginPath="/login"><DeleteCar /></RequireAuth>} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign_up" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
