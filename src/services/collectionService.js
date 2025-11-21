const API_URL = 'http://localhost:8000/api';

export const getCollections = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/collections/${userId}`);
    if (response.ok) return await response.json();
    return [];
  } catch (error) {
    console.error('Erro ao buscar:', error);
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
        owner_id: userId // <--- CRUCIAL: Enviar o ID do dono
      }),
    });

    if (response.ok) return await response.json();
    
    // Se der erro, loga o detalhe
    console.error('Erro API:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro Conexão:', error);
    return null;
  }
};

export const getCollectionItems = async (collectionId) => {
  try {
    const response = await fetch(`${API_URL}/items/collection/${collectionId}`);
    if (response.ok) return await response.json();
    return [];
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
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
    console.error('Erro API Item:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro Conexão Item:', error);
    return null;
  }
};