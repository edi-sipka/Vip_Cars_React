import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getReservation, requestedReservation } from '../redux/reservations/reservationSlice';
import Navbar from './Navbar';
import './Detail.css';

const ReservationDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const reservation = useSelector(requestedReservation);

  useEffect(() => { dispatch(getReservation(id)); }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main">
        <h1>This is the Reservation Details page</h1>
        <div className="details-container">
          {reservation.id}
        </div>
      </main>
    </div>
  );
};

export default ReservationDetails;
