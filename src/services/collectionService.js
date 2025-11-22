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

export const createCollection = async (name, isPublic, userId) => {
  try {
    const response = await fetch(`${API_URL}/collections/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        is_public: isPublic,
        owner_id: userId
      }),
    });

    if (response.ok) return await response.json();
    
    console.error('Erro API ao criar coleção:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao criar coleção:', error);
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
        collection_id: parseInt(itemData.collectionId)
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