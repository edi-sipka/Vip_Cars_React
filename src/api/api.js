// const baseURL = 'http://127.0.0.1:3000/api/v1/'; // For Local Server
const baseURL = 'https://vip-cars-api.onrender.com/api/v1'; // For Remote Server

// ALL API CALLS
const api = {
  // User registration API
  register: async (user) => {
    const response = await fetch(`${baseURL}/signup`, {
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
    const response = await fetch(`${baseURL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });

    const { status, headers } = response;
    const data = await response.json();
    if (status === 200) {
      localStorage.setItem('authToken', headers.get('Authorization'));
      localStorage.setItem('user', JSON.stringify(data.data));
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
        error: data.error,
      };
    }

    return null;
  },

  // User sign-out API
  sign_out: async () => {
    const response = await fetch(`${baseURL}/logout`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('authToken') },
    });

    const { status } = response;

    if (status === 200) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
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
      login: false, // false if logged out
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
  getAllCars: async () => {
    const response = await fetch(`${baseURL}/cars`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    const data = await response.json();
    return data;
  },

  // Get a specific car
  getCar: async (carId) => {
    const response = await fetch(`${baseURL}/cars/${carId}`, {
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    const data = await response.json();
    return data;
  },

  // Add a new car
  addCar: async (car) => {
    const response = await fetch(`${baseURL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('authToken') },
      body: JSON.stringify({ car }),
    });

    const { status } = response;

    if (status === 200) {
      const data = await response.json();
      return {
        car: data.car,
        status: 'successful', // 'loading', 'successful', 'failed'
        message: '',
        error: null,
      };
    }
    if (status === 400) {
      const data = await response.json();
      return {
        car: {},
        status: 'failed', // 'loading', 'successful', 'failed'
        message: data.error,
        error: data.error,
      };
    }
    if (status === 401) {
      return {
        car: {},
        status: 'failed', // 'loading', 'successful', 'failed'
        message: response.error,
        error: 'Only admins can add a car',
      };
    }

    return {
      car: {},
      status: 'failed', // 'loading', 'successful', 'failed'
      message: '',
      error: null,
    };
  },

  // Remove a specific car
  deleteCar: async (carId) => {
    const response = await fetch(`${baseURL}/cars/${carId}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    const data = await response.json();
    return data;
  },

  // Get all reservations
  getAllReservation: async (userId) => {
    const response = await fetch(`${baseURL}/users/${userId}/reservations`,
      {
        headers: { Authorization: localStorage.getItem('authToken') },
      });
    const data = await response.json();
    return data;
  },

  // Get a specific reservation
  getReservation: async (userId, resId) => {
    const response = await fetch(`${baseURL}/users/${userId}/reservations/${resId}`,
      {
        headers: { Authorization: localStorage.getItem('authToken') },
      });
    const data = await response.json();
    return data;
  },

  // Add a new reservation
  addReservation: async (userId, reservation) => {
    const response = await fetch(`${baseURL}/users/${userId}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('authToken') },
      body: JSON.stringify({ reservation }),
    });
    const data = await response.json();
    return data;
  },

  // Remove a reservation
  removeReservation: async (userId, resId) => {
    const response = await fetch(`${baseURL}/users/${userId}/reservations/${resId}`, {
      method: 'DELETE',
      headers: { Authorization: localStorage.getItem('authToken') },
    });
    const data = await response.json();
    return data;
  },
};

export default api;
