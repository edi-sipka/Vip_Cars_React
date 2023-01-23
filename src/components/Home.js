import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SpinnerRoundOutlined } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import {
  getAllCars,
  carStatus,
  // getCarsError,
  addCar,
  allCars,
} from '../redux/cars/carSlice';

import Container from './Container';

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cars = useSelector(getAllCars);
  const status = useSelector(carStatus);
  // const error = useSelector(getCarsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(addCar());
    }
  }, [status, dispatch]);

  const showDetailsPage = (id) => {
    dispatch(allCars(id));
    navigate(`/cars/${id}`);
  };

  let content;
  if (status === 'loading') {
    content = (
      <div className="loader">
        Loading Cars ..
        <SpinnerRoundOutlined color="black" size={100} />
      </div>
    );
  } else if (status === 'succeeded') {
    content = cars.map((car) => (
      <div key={car.id} className="item p-3 mx-3 d-flex">
        <h3>{car.name}</h3>
        <p>{car.brand}</p>
        <p>{car.duration}</p>
        <p>{car.total_amount_payable}</p>
        <p>{car.option_to_purchase_fee}</p>
        <img src={car.image} alt="car" />
        <button
          onClick={() => showDetailsPage(car.id)}
          style={{
            width: 200,
          }}
          type="button"
        >
          View details
        </button>
      </div>
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }
  return (
    <Container>
      <div className="main-container">
        {content}
      </div>
    </Container>
  );
};
export default Home;