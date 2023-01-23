import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCar, requestedCar } from '../redux/cars/carSlice';
import Navbar from './Navbar';
import './Detail.css';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const car = useSelector(requestedCar);

  useEffect(() => { dispatch(getCar(id)); }, [dispatch]);

  const handleReservation = (carId) => {
    navigate(`/reserve/${carId}`);
  };

  return (
    <div className="App">
      <Navbar />
      <main className="main">
        <h1>This is the Details page</h1>
        <div className="details-container">
          <div className="image-wrapper">
            <img className="car-img" src={car.image} alt={car.name} />
          </div>
          <div className="details-info">
            <h2 className="title">{car.name}</h2>
            <table className="recipe-food-table">
              <tr>
                <th>Model</th>
                <td>{car.model}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>{car.price}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{car.description}</td>
              </tr>
            </table>
            <button type="button" className="res-btn" onClick={() => handleReservation(car.id)}>Reserve Car</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;
