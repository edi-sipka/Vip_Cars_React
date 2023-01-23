import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addCar, requestedCar, carError, carStatus, allCars,
} from '../redux/cars/carSlice';
import { currentUserRole } from '../redux/user/userSlice';
import Navbar from './Navbar';

const INPUT_REGEX = /^[a-zA-Z0-9- ]{2,30}$/;
const TEXT_REGEX = /^[a-zA-Z0-9-.!@#$%&*:|;"'/?,>< ]{9,1000}$/;
const NUM_REGEX = /^\+?(\d*[1-9]\d*(\.\d*[1-9]\d*)?)$/;
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
const AddCar = () => {
  const inputRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameFocus, setNameFocus] = useState(false);
  const [validName, setValidName] = useState(false);

  const [model, setModel] = useState('');
  const [modelFocus, setModelFocus] = useState(false);
  const [validModel, setValidModel] = useState(false);

  const [price, setPrice] = useState('');
  const [priceFocus, setPriceFocus] = useState(false);
  const [validPrice, setValidPrice] = useState(false);

  const [image, setImage] = useState('');
  const [imageFocus, setImageFocus] = useState(false);
  const [validImage, setValidImage] = useState(false);

  const [description, setDescription] = useState('');
  const [desFocus, setDesFocus] = useState(false);
  const [validDes, setValidDes] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [allValid, setAllValid] = useState(false);

  const status = useSelector(carStatus);
  const error = useSelector(carError);
  const createdCar = useSelector(requestedCar);
  const userRole = useSelector(currentUserRole);
  const cars = useSelector(allCars);

  useEffect(() => {
    setErrMsg('');
    inputRef.current.focus();
    setImage('https://loremflickr.com/520/340/car');
  }, []);

  useEffect(() => { setValidName(INPUT_REGEX.test(name)); }, [name]);
  useEffect(() => { setValidModel(INPUT_REGEX.test(model)); }, [model]);
  useEffect(() => { setValidPrice(NUM_REGEX.test(price)); }, [price]);
  useEffect(() => { setValidImage(URL_REGEX.test(image)); }, [image]);
  useEffect(() => { setValidDes(TEXT_REGEX.test(description)); }, [description]);

  useEffect(() => { setErrMsg(''); }, [name, model, price, image, description]);
  useEffect(() => {
    setAllValid(validName && validModel && validPrice && validImage && validDes);
  }, [validName, validModel, validPrice, validImage, validDes]);

  useEffect(() => {
    if (status === 'successful' && cars.length > 0) {
      setTimeout(() => {
        navigate(`/cars/${createdCar.id}`);
      }, 1500);
    }
  }, [status, navigate, createdCar]);

  useEffect(() => {
    if (error && error.length > 0) {
      setErrMsg(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If button is enabled in JS hack
    const v1 = INPUT_REGEX.test(name);
    const v2 = INPUT_REGEX.test(model);
    const v3 = NUM_REGEX.test(price);
    const v4 = URL_REGEX.test(image);
    const v5 = TEXT_REGEX.test(description);
    if (!v1 && !v2 && !v3 && !v4 && !v5) {
      setErrMsg('Invalid Input Entries');
      return;
    }

    const car = {
      name, model, price, image, description,
    };
    dispatch(addCar(car));
  };

  const nameClass = (value, valid) => {
    if (value && valid) {
      return 'valid-input';
    }
    if (value && !valid) {
      return 'invalid-input';
    }
    return '';
  };

  const addCarFunc = () => {
    if (status === 'successful') {
      return (
        <div className="session">
          <section>
            <div className="success">
              <FontAwesomeIcon icon={faCheck} className="thick" />
            </div>
            <h2 ref={inputRef}>Car Added Successfully</h2>
          </section>
        </div>
      );
    }
    return (
      <div className="session">
        <section>
          <h1>Add A Car</h1>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
          <form onSubmit={handleSubmit}>

            {/*  Name */}
            <label htmlFor="name">
              Name:
              <br />
              <input
                type="text"
                title="Name"
                placeholder="Name"
                className={nameClass(name, validName)}
                ref={inputRef}
                id="name"
                autoComplete="off"
                required
                onChange={(e) => setName(e.target.value)}
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="nameNote"
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
            </label>
            <p id="nameNote" className={nameFocus && name && !validName ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              3 or more characters.
            </p>

            {/*  Model */}
            <label htmlFor="model">
              Model:
              <br />
              <input
                type="text"
                id="model"
                title="Model"
                placeholder="Model"
                className={nameClass(model, validModel)}
                onChange={(e) => setModel(e.target.value)}
                value={model}
                required
                aria-invalid={validModel ? 'false' : 'true'}
                aria-describedby="modelNote"
                onFocus={() => setModelFocus(true)}
                onBlur={() => setModelFocus(false)}
              />
            </label>
            <p id="modelNote" className={modelFocus && model && !validModel ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              3 or more characters.
            </p>

            {/*  Price */}
            <label htmlFor="price">
              Price ($):
              <br />
              <input
                type="number"
                id="price"
                title="Price"
                placeholder="1"
                className={nameClass(price, validPrice)}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                aria-invalid={validPrice ? 'false' : 'true'}
                aria-describedby="priceNote"
                onFocus={() => setPriceFocus(true)}
                onBlur={() => setPriceFocus(false)}
              />
            </label>
            <p id="priceNote" className={priceFocus && price && !validPrice ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Only numbers greater than zero(0)!
            </p>

            {/*  Image */}
            <label htmlFor="image">
              Image:
              <br />
              <input
                type="text"
                id="image"
                title="Image"
                placeholder="Image URL"
                className={nameClass(image, validImage)}
                onChange={(e) => setImage(e.target.value)}
                value={image}
                required
                aria-invalid={validImage ? 'false' : 'true'}
                aria-describedby="imageNote"
                onFocus={() => setImageFocus(true)}
                onBlur={() => setImageFocus(false)}
              />
            </label>
            <p id="imageNote" className={imageFocus && image && !validImage ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must begin with ftp or http or https
              <br />
              Then followed by ://
            </p>

            {/* Description */}
            <label htmlFor="description">
              Description:
              <br />
              <textarea
                title="Description"
                placeholder="Car description"
                className={nameClass(description, validDes)}
                id="description"
                autoComplete="off"
                rows="3"
                required
                onChange={(e) => setDescription(e.target.value)}
                aria-invalid={validDes ? 'false' : 'true'}
                aria-describedby="desNote"
                onFocus={() => setDesFocus(true)}
                onBlur={() => setDesFocus(false)}
              />
            </label>
            <p id="desNote" className={desFocus && description && !validDes ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              10 to 1,000 characters.
            </p>

            <button type="submit" disabled={!allValid}>
              Add Car
            </button>
          </form>
        </section>
      </div>
    );
  };

  return (
    <div className="App">
      <Navbar />
      <main className="main">
        { (userRole !== 1) ? (
          <div className="session">
            <section className="not-allowed">
              <FontAwesomeIcon icon={faTriangleExclamation} className="caution" />
              <h2 ref={inputRef}>Only Admins Can Add A Car!!!!!</h2>
            </section>
          </div>
        ) : (addCarFunc()) }

      </main>
    </div>
  );
};

export default AddCar;
