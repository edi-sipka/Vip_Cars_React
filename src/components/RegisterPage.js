import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
  registerUser, userStatus, userError,
} from '../redux/user/userSlice';

const USER_REGEX = /^[a-zA-Z0-9 ]{2,23}$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^[A-z0-9!@#$%-_]{6,24}$/;

const RegistrationPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [userFocus, setUserFocus] = useState(false);
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [matchFocus, setMatchFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const status = useSelector(userStatus);
  const error = useSelector(userError);

  useEffect(() => { userRef.current.focus(); }, []);
  useEffect(() => { setValidName(USER_REGEX.test(name)); }, [name]);
  useEffect(() => { setValidEmail(EMAIL_REGEX.test(email)); }, [email]);
  useEffect(() => { setErrMsg(''); }, [name, email, password, matchPwd]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    if (error && error.length > 0) {
      setErrMsg(error);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'successful') {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [status, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If button is enabled in JS hack
    const v1 = USER_REGEX.test(name);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);
    if (!v1 && !v2 && !v3) {
      setErrMsg('Invalid Input Entries');
      return;
    }

    const user = {
      name,
      email,
      password,
    };
    dispatch(registerUser(user));
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
      { status === 'successful' ? (
        <main className="session">
          <section>
            <div className="success">
              <FontAwesomeIcon icon={faCheck} className="thick" />
            </div>
            <h2 ref={userRef}>Registration Successful</h2>
            <p>
              Want to Login?
              {' '}
              <span className="line">
                <a href="/login">Log In</a>
              </span>
            </p>
          </section>
        </main>
      ) : (
        <main className="session">
          <section>
            <h1>Register</h1>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
              {/* User Name */}
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                <FontAwesomeIcon icon={faTimes} className={validName || !name ? 'hide' : 'invalid'} />
                <br />
                <input
                  type="text"
                  title="User name"
                  placeholder="Username"
                  ref={userRef}
                  id="username"
                  className={nameClass(name, validName)}
                  autoComplete="off"
                  required
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </label>
              <p id="uidnote" className={userFocus && name && !validName ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                3 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

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

              {/*  Confirm Password */}
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
                <br />
                <input
                  type="password"
                  id="confirm_pwd"
                  title="Confirm Password"
                  placeholder="Confirm Password"
                  className={nameClass(matchPwd, validMatch)}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </label>
              <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <br />

              <button type="submit" disabled={!!(!validName || !validEmail || !validPwd || !validMatch)}>
                Sign Up
              </button>
            </form>
            <p>
              Already registered?
              { ' ' }
              <span className="line">
                <a href="/login">Log In</a>
              </span>
            </p>
          </section>
        </main>
      )}
    </>
  );
};

export default RegistrationPage;
