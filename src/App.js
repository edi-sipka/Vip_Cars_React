import { useSelector } from 'react-redux';
import {
  Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import { sessionStatus } from './redux/user/userSlice';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const login = useSelector(sessionStatus);

  return (
    <Routes>
      <Route element={login ? <Outlet /> : <Navigate to="/login" />}>
        <Route
          path="/"
          element={(
            <>
              <div className="App">
                <Navbar />
              </div>
            </>
          )}
        />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign_up" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
