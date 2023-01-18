import { useSelector } from 'react-redux';
import {
  Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import { sessionStatus } from './redux/user/userSlice';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './components/Home';
import Details from './components/Details';
import Reservation from './components/Reservation';
import './App.css';
import AddCar from './components/AddCar';

function App() {
  const login = useSelector(sessionStatus);

  return (
    <Routes>
      <Route element={login ? <Outlet /> : <Navigate to="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/add_car" element={<AddCar />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign_up" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
