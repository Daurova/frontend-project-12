export const getMessages = async (token) => {
  const response = await fetch('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Неавторизован');
    }
    throw new Error('Ошибка загрузки сообщений');
  }

  return response.json();
};


export const sendMessage = async (token, { body, channelId, username }) => {

    if (!navigator.onLine) {

    throw new Error('Нет подключения к интернету');
  }
  const controller = new AbortController();
  
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch('/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body, channelId, username }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Ошибка отправки сообщения');
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Превышено время ожидания. Проверьте соединение.');
    }
    throw error;
  }
};