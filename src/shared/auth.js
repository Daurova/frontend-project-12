const BASE_URL = 'http://localhost:5001';

export const login = async (username, password) => {
    console.log('login started ... ')
  const response = await fetch(`/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let errorMessage = 'Ошибка авторизации';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorData.detail || errorMessage;
    } catch {
      errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }

  const data = await response.json();
  
  if (!data.token) {
    throw new Error('Сервер не вернул токен');
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
      throw new Error('Пользователь с таким именем уже существует');
    }
    throw new Error('Ошибка регистрации');
  }

  return response.json();
}