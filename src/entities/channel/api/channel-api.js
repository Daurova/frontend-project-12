export const getChannels = async (token) => {
  const response = await fetch('/api/v1/channels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Неавторизован');
    }
    throw new Error('Ошибка загрузки каналов');
  }

  return response.json();
};