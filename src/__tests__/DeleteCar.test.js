import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import DeleteCar from '../components/Navbar';

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
              <DeleteCar />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    expect(login).toMatchSnapshot();
  });
});
