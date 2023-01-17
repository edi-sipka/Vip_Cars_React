const baseURL = 'http://localhost:3000/';

// ALL API CALLS
const api = {
  // User registration API
  register: async (user) => {
    const response = await fetch(`${baseURL}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });
    const data = await response.json();

    return data;
  },

  // User sign-in API
  sign_in: async (user) => {
    const response = await fetch(`${baseURL}users/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const { status } = response;

    if (status === 200) {
      const data = await response.json();
      return {
        currentUser: data.user,
        status: 'successful', // 'loading', 'successful', 'failed'
        login: true, // false if logged out
        message: data.message,
        error: null,
      };
    }

    return {
      currentUser: {},
      status: 'failed', // 'loading', 'successful', 'failed'
      login: false, // true if logged in
      message: 'Login failed',
      error: 'Login failed',
    };
  },

  // User sign-out API
  sign_out: async () => {
    const response = await fetch(`${baseURL}users/sign_out`, {
      method: 'DELETE',
    });

    const { status } = response;

    if (status === 200) {
      return {
        currentUser: {},
        status: 'successful', // 'loading', 'successful', 'failed'
        login: false, // true if logged in
        message: '',
        error: null,
      };
    }

    const data = await response.json();
    return {
      status: 'failed', // 'loading', 'successful', 'failed'
      login: true, // false if logged out
      message: data.message,
      error: 'Failed to logout',
    };
  },
};

export default api;
