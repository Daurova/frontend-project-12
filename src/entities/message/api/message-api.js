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
  const response = await fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body, channelId, username }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Неавторизован');
    }
    throw new Error('Ошибка отправки сообщения');
  }

  return response.json();
};