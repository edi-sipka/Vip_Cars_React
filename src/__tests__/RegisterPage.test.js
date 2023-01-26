import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import RegistrationPage from '../components/RegisterPage';

describe('Login component', () => {
  test('Should render the proper Register component', () => {
    const register = render(
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider
            authType="cokie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={false}
          >
            <Router>
              <RegistrationPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    expect(register).toMatchSnapshot();
  });
  test('Should have Log In link', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider
            authType="cokie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={false}
          >
            <Router>
              <RegistrationPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    const line = document.querySelector('.line');
    expect(line).toHaveTextContent('Log In');
  });
  test('Should Sign Up Button', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider
            authType="cokie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={false}
          >
            <Router>
              <RegistrationPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    const signUp = document.querySelector('button');
    expect(signUp).toHaveTextContent('Sign Up');
  });
  test('Should have Register title', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider
            authType="cokie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={false}
          >
            <Router>
              <RegistrationPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    const title = document.querySelector('h1');
    expect(title).toHaveTextContent('Register');
  });
});
