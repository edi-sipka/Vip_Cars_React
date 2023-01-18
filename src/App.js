import './App.css';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Login from './components/Login';
import Reservation from './components/Reservation';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <div className="App">
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

    </>

  );
}

export default App;
