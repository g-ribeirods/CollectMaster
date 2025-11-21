import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollections, getCollectionItems, createItem } from '../services/collectionService';

export const useCollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. ADICIONADO: Estado do usuário
  const [user, setUser] = useState(null);
  
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [openItemModal, setOpenItemModal] = useState(false);
  const [newItemData, setNewItemData] = useState({
    name: '',
    description: '',
    quantity: 1,
    estimatedValue: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // 2. ADICIONADO: Salva o usuário

      try {
        const allCollections = await getCollections(parsedUser.id);
        const found = allCollections.find(c => c.id == id);
        
        if (found) {
          setCollection(found);
          const realItems = await getCollectionItems(id);
          setItems(realItems);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  // ... (Handlers do Modal continuam iguais) ...
  const handleOpenItemModal = () => setOpenItemModal(true);
  
  const handleCloseItemModal = () => {
    setOpenItemModal(false);
    setNewItemData({ name: '', description: '', quantity: 1, estimatedValue: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitItem = async () => {
    if (!newItemData.name) return;

    const createdItem = await createItem({
      ...newItemData,
      collectionId: id
    });

    if (createdItem) {
      setItems([...items, createdItem]);
      handleCloseItemModal();
      setCollection(prev => ({
        ...prev,
        itemCount: (prev.itemCount || 0) + createdItem.quantity,
        value: (prev.value || 0) + (createdItem.estimated_value * createdItem.quantity)
      }));
    } else {
      alert("Erro ao criar item.");
    }
  };

  return {
    user, // 3. ADICIONADO: Exporta o usuário
    collection,
    items,
    loading,
    openItemModal,
    newItemData,
    handleOpenItemModal,
    handleCloseItemModal,
    handleInputChange,
    handleSubmitItem
  };
};