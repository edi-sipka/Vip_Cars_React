import {
  Routes, Route,
  // Outlet, Navigate,
} from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './components/Home';
import Details from './components/Details';
import Reservation from './components/Reservation';
import MainPage from './components/MainPage'
import './App.css';
import AddCar from './components/AddCar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth loginPath="/login"><Home /></RequireAuth>} />
      <Route path="/" element={<RequireAuth loginPath="/login"><MainPage /></RequireAuth>} />
      <Route path="/details" element={<RequireAuth loginPath="/login"><Details /></RequireAuth>} />
      <Route path="/reservations" element={<RequireAuth loginPath="/login"><Reservation /></RequireAuth>} />
      <Route path="/add_car" element={<RequireAuth loginPath="/login"><AddCar /></RequireAuth>} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign_up" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
