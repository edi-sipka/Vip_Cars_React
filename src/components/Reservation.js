import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SpinnerRoundOutlined } from 'spinners-react';
import { useNavigate } from 'react-router-dom';

import {
  allReservations,
  resStatus,
  resMessage,
  getAllReservations,
} from '../redux/reservations/reservationSlice';

import { allCars } from '../redux/cars/carSlice';

import './myreservation.css';

const MyReservations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector(getAllReservations);
  const status = useSelector(resStatus);
  const msg = useSelector(resMessage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(allReservations());
    }
  }, [status, dispatch]);

  const showDetailsPage = (resId) => {
    dispatch(allCars(resId));
    navigate(`/cars/${resId}`);
  };

  let content;
  if (status === 'loading') {
    content = (
      <div className="loader">
        Loading reservations ..
        <SpinnerRoundOutlined color="black" size={100} />
      </div>
    );
  } else if (status === 'succeeded') {
    content = reservations.map((reservation, index) => (
      <tr key={reservation.id}>
        <td data-label="Reservation ID">{index + 1}</td>
        <td data-label="Name">{reservation.car.name}</td>
        <td data-label="City">{reservation.city}</td>
        <td data-label="Date">{reservation.date}</td>
        <td data-label="Action">
          <button
            onClick={() => showDetailsPage(reservation.car.id)}
            className="btn btn-primary"
            style={{
              width: 100,
            }}
            type="button"
          >
            View Car
          </button>
        </td>
      </tr>
    ));
  } else if (status === 'failed') {
    content = <div>{msg}</div>;
  }
  return (
  // <Container>
    <div className="details-container">
      <div className="table-div">
        <h1 className="delete-title">My Reservations List</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {status === 'succeeded' && <tbody>{content}</tbody>}
        </table>
        {status !== 'succeeded' && content}
      </div>
    </div>
  // </Container>
  );
};
export default MyReservations;
