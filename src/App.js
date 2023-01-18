/* eslint-disable react/jsx-no-undef */
import './App.css';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import Login from './components/Login';
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line react/jsx-no-undef
import Reservation from './components/Reservation';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Navbar />
       <header className="App-header" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
