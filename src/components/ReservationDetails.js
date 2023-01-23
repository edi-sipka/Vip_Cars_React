import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { allCars, getAllCars } from '../redux/cars/carSlice';
import { addReservation, setStatusIdle } from '../redux/reservations/reservationSlice';
import './Detail.css';

const ReservationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [car, setCar] = useState('');
  const cars = useSelector(allCars);
  const CITIES = ['London', 'New York', 'Berlin', 'Paris', 'Lagos', 'Nairobi', 'Cape Town'];
  const [city, setCity] = useState('London');
  const todayDateObject = new Date();
  const tomorrowDateObject = new Date();
  todayDateObject.setDate(todayDateObject.getDate());
  tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 1);
  const today = todayDateObject.toISOString().substring(0, 10);
  const tomorrow = tomorrowDateObject.toISOString().substring(0, 10);
  const [resDate, setResDate] = useState(today);
  const [retDate, setRetDate] = useState(tomorrow);
  const [retDateFocus, setRetDateFocus] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(setStatusIdle());
    if (cars.length > 0) {
      setCar(cars[0].id);
    }
  }, []);

  useEffect(() => { setErrMsg(''); }, [city, resDate, retDate]);

  useEffect(() => {
    if (retDate.localeCompare(resDate) > 0) {
      setValidDate(true);
    } else {
      setValidDate(false);
    }
  }, [resDate, retDate]);

  const nameClass = (valid) => {
    if (valid) {
      return 'valid-input';
    }
    if (!valid) {
      return 'invalid-input';
    }
    return '';
  };

  const handleReservation = (e) => {
    e.preventDefault();

    if (retDate.localeCompare(resDate) <= 0) {
      setErrMsg('Invalid Input Entries');
      return;
    }

    const reservation = {
      city,
      car_id: car,
      reservation_date: resDate,
      returning_date: retDate,
    };
    dispatch(addReservation(reservation));
    setSuccess(true);
    setTimeout(() => {
      navigate('/reservations');
      dispatch(setStatusIdle());
    }, 1500);
  };

  const addRes = () => {
    if (success) {
      return (
        <section>
          <div className="success">
            <FontAwesomeIcon icon={faCheck} className="thick" />
          </div>
          <h2 ref={userRef}>Reservation Successful</h2>
        </section>
      );
    }
    return (
      <section>
        <h1>
          Reserve
          {' '}
          {car.name}
        </h1>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <div className="res-container">
          <div className="car-img-wrapper">
            <img className="car-img" src={car.image} alt={car.name} />
          </div>
          <form id="reserve" onSubmit={handleReservation}>

            {/*  Car */}
            <label htmlFor="cars">
              City:
              <br />
              <select
                value={car}
                onChange={(e) => setCar(e.target.value)}
                name="cars"
                id="cars"
              >
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name}
                  </option>
                ))}
              </select>
            </label>

            {/*  City */}
            <label htmlFor="cities">
              City:
              <br />
              <select
                ref={userRef}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="cities"
                id="cities"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            {/*  Reserve Date */}
            <label htmlFor="reserveDate">
              Reserve Date:
              <br />
              <input
                className="reserve-date"
                id="reserveDate"
                type="date"
                value={resDate}
                aria-invalid={validDate ? 'false' : 'true'}
                onChange={(e) => setResDate(e.target.value)}
              />
            </label>

            {/*  Return Date */}
            <label htmlFor="returnDate">
              Return Date:
              <br />
              <input
                id="returnDate"
                type="date"
                value={retDate}
                onChange={(e) => setRetDate(e.target.value)}
                className={nameClass(validDate)}
                required
                aria-invalid={validDate ? 'false' : 'true'}
                aria-describedby="returnDate"
                onFocus={() => setRetDateFocus(true)}
                onBlur={() => setRetDateFocus(false)}
              />
            </label>
            <p id="returnDate" className={retDateFocus && !validDate ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Return date must be on
              <br />
              a later date to Reserve date
            </p>

            <br />

            <button type="submit" disabled={!validDate}>
              Reserve
            </button>
          </form>
        </div>
      </section>
    );
  };

  return (
    <main className="session">
      { cars.length < 1 ? (
        <section>
          <FontAwesomeIcon icon={faTriangleExclamation} className="thick" />
          <h2 ref={userRef}>No car has been added yet!</h2>
          <p>Add a car to make reservations</p>
          <button type="button" onClick={() => navigate('/add_car')}>Add Car</button>
        </section>
      ) : (addRes())}
    </main>
  );
};

export default ReservationDetails;
