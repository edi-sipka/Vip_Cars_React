import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination, A11y,
} from 'swiper';
import { getAllReservations, allReservations } from '../redux/reservations/reservationSlice';
import Navbar from './Navbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainPage = () => {
  const reservations = useSelector(allReservations);

  const dispatch = useDispatch();
  const swiperRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main main-page">
        { reservations.length > 0 ? (
          <>
            <h1 className="title">MY RESERVATIONS</h1>
            <p className="sub-title">Please select a Reservation to see details</p>
            <section className="cars-container">
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                breakpoints={{
                  // when window width is >= 640px
                  0: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 768px
                  768: {
                    spaceBetween: 15,
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  900: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                  },
                }}
                className="mySwiper"
              >
                { reservations.map((res) => (
                  <SwiperSlide key={res.id}>
                    <div className="car res">
                      <div className="car-img-wrap">
                        <img className="car-img" src={res.car.image} alt={res.car.name} />
                      </div>
                      <h3>{res.car.name}</h3>
                      <table>
                        <tr>
                          <th>City</th>
                          <tr>{res.city}</tr>
                        </tr>
                        <tr>
                          <th>Reserved</th>
                          <tr>{res.reservation_date.slice(0, 10)}</tr>
                        </tr>
                        <tr>
                          <th>Returning</th>
                          <tr>{res.returning_date.slice(0, 10)}</tr>
                        </tr>
                      </table>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button type="button" aria-label="previous" className="btn prev" onClick={() => swiperRef.current?.slidePrev()} />
              <button type="button" aria-label="previous" className="btn next" onClick={() => swiperRef.current?.slideNext()} />
            </section>
          </>
        ) : (
          <section className="no-res">
            <FontAwesomeIcon icon={faTriangleExclamation} className="excl" />
            <h2>No reservation has been made yet!</h2>
            <p>Reserve a car using the button bellow</p>
            <button className="link" type="button" onClick={() => navigate('/reserve')}>Add Car</button>
          </section>
        ) }

      </main>
    </div>
  );
};

export default MainPage;
