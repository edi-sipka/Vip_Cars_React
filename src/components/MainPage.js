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
import { allCars, getAllCars } from '../redux/cars/carSlice';
import Navbar from './Navbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainPage = () => {
  const cars = useSelector(allCars);

  const dispatch = useDispatch();
  const swiperRef = useRef();
  const navigate = useNavigate();

  useEffect(() => { dispatch(getAllCars()); }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main main-page">
        { cars.length < 1 ? (
          <section className="no-res">
            <FontAwesomeIcon icon={faTriangleExclamation} className="excl" />
            <h2>No Car has been made yet!</h2>
            <p>Add a car using the button bellow</p>
            <button className="link" type="button" onClick={() => navigate('/add_car')}>Add Car</button>
          </section>
        ) : (
          <>
            <h1 className="title">LATEST VIP CARS</h1>
            <p className="sub-title">Please select a Car to Reserve</p>

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
                { cars.map((car) => (
                  <SwiperSlide key={car.id}>
                    <a href={`/cars/${car.id}`} className="car">
                      <div className="car-img-wrap">
                        <img className="car-img" src={car.image} alt={car.name} />
                      </div>
                      <div className="car-details">
                        <h3 className="car-name">
                          {car.name.slice(0, 20)}
                          {car.name.length > 20 ? '...' : ''}
                        </h3>
                        <p className="car-model">{car.model}</p>
                        <hr />
                        <p className="car-desc">
                          {car.description.slice(0, 50)}
                          {car.description.length > 50 ? '...' : ''}
                        </p>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button type="button" aria-label="previous" className="btn prev" onClick={() => swiperRef.current?.slidePrev()} />
              <button type="button" aria-label="previous" className="btn next" onClick={() => swiperRef.current?.slideNext()} />
            </section>
          </>
        ) }
      </main>
    </div>
  );
};

export default MainPage;
