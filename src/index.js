import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-auth-kit';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import store from './redux/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider
        authType="cokie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
