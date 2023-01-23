import {
  useEffect, useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { getCar, requestedCar } from '../redux/cars/carSlice';
import { addReservation, setStatusIdle } from '../redux/reservations/reservationSlice';
import './reservations.css';

const ReservePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const car = useSelector(requestedCar);
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
    dispatch(getCar(id));
    dispatch(setStatusIdle());
  }, []);
  useEffect(() => { setErrMsg(''); }, [city, resDate, retDate]);
  // useEffect(() => {
  //   if (status === 'successful') {
  //     setSuccess(true);
  //   }
  // }, [status]);

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
      car_id: car.id,
      reservation_date: resDate,
      returning_date: retDate,
    };
    dispatch(addReservation(reservation));
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
      dispatch(setStatusIdle());
    }, 1500);
  };

  return (
    <>
      { success ? (
        <main className="session">
          <section>
            <div className="success">
              <FontAwesomeIcon icon={faCheck} className="thick" />
            </div>
            <h2 ref={userRef}>Reservation Successful</h2>
          </section>
        </main>
      ) : (
        <main className="session">
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
        </main>
      )}
    </>
  );
};

export default ReservePage;
