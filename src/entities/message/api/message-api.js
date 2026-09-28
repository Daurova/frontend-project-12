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
    console.log('sendMessage: начало'); // ← добавь

    if (!navigator.onLine) {
          console.log('sendMessage: нет сети'); // ← добавь

    throw new Error('Нет подключения к интернету');
  }
  console.log('1. sendMessage: начало');
  const controller = new AbortController();
  
  const timeoutId = setTimeout(() => {
    console.log('2. Таймаут сработал, abort');
    controller.abort();
  }, 5000);

  try {
    console.log('3. fetch: отправка');
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
    console.log('4. fetch: ответ получен', response.status);

    if (!response.ok) {
      throw new Error('Ошибка отправки сообщения');
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.log('5. catch:', error.name, error.message);
    
    if (error.name === 'AbortError') {
      throw new Error('Превышено время ожидания. Проверьте соединение.');
    }
    throw error;
  }
};