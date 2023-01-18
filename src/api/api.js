const baseURL = 'http://127.0.0.1:3000/api/v1/';

// ALL API CALLS
const api = {
  // User registration API
  register: async (user) => {
    const response = await fetch(`${baseURL}signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });
    const { status } = response;
    const data = await response.json();
    if (status === 200) {
      return {
        currentUser: {},
        status: 'successful', // 'loading', 'successful', 'failed'
        login: false, // true if logged in
        message: '',
        error: null,
      };
    }

    if (status === 422) {
      return {
        currentUser: {},
        status: 'failed', // 'loading', 'successful', 'failed'
        login: false, // true if logged in
        message: 'Signup failed',
        error: data.message,
      };
    }
    return null;
  },

  // User sign-in API
  sign_in: async (user) => {
    const response = await fetch(`${baseURL}signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });

    const { status, headers } = response;
    const data = await response.json();
    if (status === 200) {
      localStorage.setItem('authToken', headers.get('Authorization'));
      return {
        currentUser: data.data,
        status: 'successful', // 'loading', 'successful', 'failed'
        login: true, // false if logged out
        message: data.message,
        error: null,
      };
    }

    if (status === 401) {
      return {
        currentUser: {},
        status: 'failed', // 'loading', 'successful', 'failed'
        login: false, // true if logged in
        message: 'Login failed',
        error: data.message,
      };
    }

    return null;
  },

  // User sign-out API
  sign_out: async () => {
    const response = await fetch(`${baseURL}logout`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('authToken') },
    });

    const { status } = response;

    if (status === 200) {
      localStorage.removeItem('authToken');
      return {
        currentUser: {},
        status: 'idle', // 'loading', 'successful', 'failed'
        login: false, // true if logged in
        message: '',
        error: null,
      };
    }

    const data = await response.json();
    if (status === 401) {
      return {
        status: 'failed', // 'loading', 'successful', 'failed'
        login: false, // false if logged out
        message: 'Logout Failed',
        error: data.message,
      };
    }

    return {
      status: 'failed', // 'loading', 'successful', 'failed'
      login: true, // false if logged out
      message: 'Logout Failed',
      error: data.message,
    };
  },

  // Get Authenticated User
  getAuthUser: async () => {
    const response = await fetch(`${baseURL}/users`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });

    const { status } = response;

    const data = await response.json();
    if (status === 200) {
      return {
        currentUser: data,
        status: 'successful', // 'loading', 'successful', 'failed'
        login: true, // false if logged out
        message: '',
        error: null,
      };
    }

    if (status === 401) {
      localStorage.removeItem('authToken');
      return {
        currentUser: {},
        status: 'failed', // 'loading', 'successful', 'failed'
        login: false, // true if logged in
        message: 'Unauthorised user',
        error: 'Unauthorised user',
      };
    }
    return null;
  },

  // Get all car
  getAllCars: async (userId) => {
    const response = await fetch(`${baseURL}users/${userId}/cars`);
    const data = await response.json();
    return data;
  },

  // Get a specific car
  getCar: async (userId, carId) => {
    const response = await fetch(`${baseURL}users/${userId}/cars/${carId}`);
    const data = await response.json();
    return data;
  },

  // Add a new car
  addCar: async (userId, car) => {
    const response = await fetch(`${baseURL}users/${userId}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ car }),
    });
    const data = await response.json();
    return data;
  },
};

export default api;
