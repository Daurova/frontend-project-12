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


export const createChannel = async (token, name) => {
  const response = await fetch('/api/v1/channels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Неавторизован');
    }
    throw new Error('Ошибка создания канала');
  }

  return response.json();
};

export const renameChannel = async (token, id, name) => {
  const response = await fetch(`/api/v1/channels/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Неавторизован');
    }
    throw new Error('Ошибка переименования канала');
  }

  return response.json();
};

export const removeChannel = async (token, id) => {
  const response = await fetch(`/api/v1/channels/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Неавторизован');
    }
    throw new Error('Ошибка удаления канала');
  }

  return response.json();
};