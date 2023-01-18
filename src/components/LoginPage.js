import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  signInUser, sessionStatus, userError,
} from '../redux/user/userSlice';

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^[A-z0-9!@#$%-_]{6,24}$/;
const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const status = useSelector(sessionStatus);
  const error = useSelector(userError);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
  }, [password]);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [status, navigate]);

  useEffect(() => {
    if (error && error.length > 0) {
      setErrMsg(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If button is enabled in JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 && !v2) {
      setErrMsg('Invalid Input Entries');
      return;
    }

    const user = {
      email,
      password,
    };
    dispatch(signInUser(user));
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

  return (
    <>
      { status ? (
        <main className="session">
          <section>
            <div className="success">
              <FontAwesomeIcon icon={faCheck} className="thick" />
            </div>
            <h2 ref={userRef}>Login Successful</h2>
          </section>
        </main>
      ) : (
        <main className="session">
          <section>
            <h1>Sign In</h1>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>

              {/*  Email */}
              <label htmlFor="email">
                Email:
                <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? 'hide' : 'invalid'} />
                <br />
                <input
                  type="email"
                  title="Email"
                  placeholder="Email"
                  className={nameClass(email, validEmail)}
                  ref={userRef}
                  id="email"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </label>
              <p id="emailnote" className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                5 or more characters.
                <br />
                Must have the
                {' '}
                <span aria-label="at symbol">@</span>
                {' '}
                letter.
                <br />
                Must have a top-level domain such as ‘.com’
              </p>

              {/*  Password */}
              <label htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? 'hide' : 'invalid'} />
                <br />
                <input
                  type="password"
                  id="password"
                  title="Password"
                  placeholder="Password"
                  className={nameClass(password, validPwd)}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </label>
              <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Allowed special characters:
                {' '}
                <span aria-label="exclamation mark">!</span>
                {' '}
                <span aria-label="at symbol">@</span>
                {' '}
                <span aria-label="hashtag">#</span>
                {' '}
                <span aria-label="dollar sign">$</span>
                {' '}
                <span aria-label="percent">%</span>
              </p>

              <br />

              <button type="submit" disabled={!!(!validEmail || !validPwd)}>
                Log In
              </button>
            </form>
            <p>
              Dont have an account?
              { ' ' }
              <span className="line">
                <a href="/sign_up">Sign Up</a>
              </span>
            </p>
          </section>
        </main>
      )}
    </>
  );
};

export default LoginPage;
