const API_URL = 'http://localhost:8000/api';

// --- COLEÇÕES ---

export const getCollections = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/collections/${userId}`);
    if (response.ok) return await response.json();
    console.error('Erro ao buscar coleções:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar coleções:', error);
    return [];
  }
};

export const createCollection = async (collectionData) => { // Agora recebe um objeto
  try {
    const response = await fetch(`${API_URL}/collections/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: collectionData.name,
        description: collectionData.description,
        image_url: collectionData.imageUrl, // Frontend usa camelCase, Backend snake_case
        is_public: collectionData.isPublic,
        owner_id: collectionData.ownerId
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro API criar coleção:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro conexão criar coleção:', error);
    return null;
  }
};

export const updateCollection = async (id, collectionData) => {
  try {
    const response = await fetch(`${API_URL}/collections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: collectionData.name,
        description: collectionData.description,
        image_url: collectionData.imageUrl,
        is_public: collectionData.isPublic,
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro API atualizar coleção:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro conexão atualizar coleção:', error);
    return null;
  }
};



// --- ITENS ---

export const getCollectionItems = async (collectionId) => {
  try {
    const response = await fetch(`${API_URL}/items/collection/${collectionId}`);
    if (response.ok) return await response.json();
    console.error('Erro ao buscar itens:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar itens:', error);
    return [];
  }
};

export const createItem = async (itemData) => {
  try {
    const response = await fetch(`${API_URL}/items/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: itemData.name,
        description: itemData.description,
        quantity: parseInt(itemData.quantity),
        estimated_value: parseFloat(itemData.estimatedValue),
        collection_id: parseInt(itemData.collectionId),
        image_url: itemData.imageUrl // <--- NOVO CAMPO
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro API ao criar Item:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao criar Item:', error);
    return null;
  }
};

export const updateItem = async (itemId, itemData) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: itemData.name,
        description: itemData.description,
        quantity: parseInt(itemData.quantity),
        estimated_value: parseFloat(itemData.estimatedValue),
        image_url: itemData.imageUrl // <--- NOVO CAMPO
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro ao atualizar item:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão no Update:', error);
    return null;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'DELETE',
    });
    return response.ok; 
  } catch (error) {
    console.error('Erro de conexão no Delete:', error);
    return false;
  }
};

export const deleteCollection = async (id) => {
  try {
    const response = await fetch(`${API_URL}/collections/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Erro ao deletar coleção:', error);
    return false;
  }
};