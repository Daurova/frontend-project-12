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