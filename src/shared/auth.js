export const login = async (username, password) => {
  const response = await fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('loginFailed');
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error('loginFailed');
  }

  return data;
};

export const signup = async (username, password) => {
  const response = await fetch('/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('userExists');
    }
    throw new Error('signupFailed');
  }

  return response.json();
};