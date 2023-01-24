import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import Details from '../components/Details';

describe('Login component', () => {
  test('Should render the proper details component', () => {
    const details = render(
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider
            authType="cokie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={false}
          >
            <Router>
              <Details />
            </Router>
          </AuthProvider>
        </Provider>
        ,
      </React.StrictMode>,
    );
    expect(details).toMatchSnapshot();
  });
});
