import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SpinnerRoundOutlined } from "spinners-react";
import { API_URL, handleToast } from "../redux/utils";
import "./reservations.css";

import {
    getAllCars,
    carStatus,
    carMessage,
  } from '../redux/cars/carSlice';

const ReservePage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(getAllCars);
  const status = useSelector(carStatus);
  const error = useSelector(carMessage);

  const CITIES = ["London", "New York", "Berlin", "Paris"];
  const { data } = useSelector((state) => state.user);
  const [city, setCity] = useState("London");
  const [car, setCar] = useState("");
  const dateObject = new Date();
  dateObject.setDate(dateObject.getDate());
  const today = dateObject.toISOString().substring(0, 10);
  const [date, setDate] = useState(today);

  useEffect(() => {
    if (cars.length > 0) {
      setCar(cars[0].id);
    }

    if (status === "idle") {
      dispatch(fetchCars());
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: data.auth,
        },
        body: JSON.stringify({
          reservation: {
            user_id: data.id,
            city,
            car_id: car,
            date,
          },
        }),
      });

      const msg = await res.json();

      if (res.status === 201) {
        handleToast({
          msg: "Created Reservation Successfully",
          type: "success",
        });
      } else {
        handleToast({
          msg: (
            <p>
              {msg.error}
              <br />
              {msg.exception}
            </p>
          ),
          type: "error",
        });
      }
    } catch (err) {
      handleToast({ msg: err.message, type: "error" });
    }
  };

  let content;
  if (status === "loading") {
    content = (
      <div className="loader text-white">
        Loading Cars ..
        <SpinnerRoundOutlined color="white" size={100} />
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <>
        <ToastContainer />
        <h1 className="reserve-title">BOOK A TESLA TEST - RIDE</h1>
        <form className="reserve-form" onSubmit={handleSubmit}>
          <select
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

          <input
            className="reserve-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="reserve-btn" type="submit">
            Book Now
          </button>
        </form>
      </>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <Container>
      <div className="reserve-background">
        <div className="reserve-layer">
          <div className="reserve-page">{content}</div>
        </div>
      </div>
    </Container>
  );
};

export default ReservePage;