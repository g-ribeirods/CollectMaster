export const getCollections = async (userId) => {
  try {
    // Chama a nova URL, passando o ID do usuário
    const response = await fetch(`http://localhost:8000/api/collections/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Erro ao buscar coleções:', await response.json());
      return []; // Retorna um array vazio em caso de erro
    }
  } catch (error) {
    console.error('Erro de conexão ao buscar coleções:', error);
    return [];
  }
};

export const createCollection = async (name, isPublic, userId) => {
  try {
    const response = await fetch('http://localhost:8000/api/collections/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        is_public: isPublic,
        owner_id: userId
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      // Log do erro real para facilitar a depuração
      const errorData = await response.json();
      console.error('Erro ao criar coleção:', errorData); 
      return null;
    }

  } catch (error) {
    console.error('Erro de conexão ao criar coleção:', error);
    return null;
  }
};