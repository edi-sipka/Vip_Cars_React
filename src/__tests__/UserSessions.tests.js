import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import LoginPage from '../components/LoginPage';

describe('Login component', () => {
  test('Should render the proper Login component', () => {
    const login = render(
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider
            authType="cokie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={false}
          >
            <Router>
              <LoginPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    expect(login).toMatchSnapshot();
  });
  test('Should have Sign Up link', () => {
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
              <LoginPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    const line = document.querySelector('.line');
    expect(line).toHaveTextContent('Sign Up');
  });
  test('Should Log In Button', () => {
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
              <LoginPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    const signUp = document.querySelector('button');
    expect(signUp).toHaveTextContent('Log In');
  });
  test('Should have Sign In title', () => {
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
              <LoginPage />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    const title = document.querySelector('h1');
    expect(title).toHaveTextContent('Sign In');
  });
});
