import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Importe updateItem e deleteItem aqui!
import { 
  getCollections, 
  getCollectionItems, 
  createItem, 
  updateItem, 
  deleteItem 
} from '../services/collectionService';

export const useCollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do Modal
  const [openItemModal, setOpenItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // NOVO: Guarda o item sendo editado
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
      setUser(parsedUser);

      try {
        const allCollections = await getCollections(parsedUser.id);
        // Garante comparação correta (string vs number)
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

  // --- HANDLERS ---

  // Abre para CRIAR (Limpa tudo)
  const handleOpenItemModal = () => {
    setEditingItem(null); 
    setNewItemData({ name: '', description: '', quantity: 1, estimatedValue: '' });
    setOpenItemModal(true);
  };

  // Abre para EDITAR (Preenche com dados do item)
  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItemData({
      name: item.name,
      description: item.description || '',
      quantity: item.quantity,
      // O backend manda 'estimated_value', mas o form usa 'estimatedValue'
      estimatedValue: item.estimated_value 
    });
    setOpenItemModal(true);
  };
  
  const handleCloseItemModal = () => {
    setOpenItemModal(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData(prev => ({ ...prev, [name]: value }));
  };

  // Função Inteligente: Salva ou Atualiza
  const handleSubmitItem = async () => {
    if (!newItemData.name) return;

    let result;

    if (editingItem) {
      // MODO UPDATE
      result = await updateItem(editingItem.id, newItemData);
      
      if (result) {
        // Atualiza a lista local substituindo o item antigo
        setItems(prevItems => prevItems.map(item => 
          item.id === editingItem.id ? result : item
        ));
      }
    } else {
      // MODO CREATE
      result = await createItem({
        ...newItemData,
        collectionId: id
      });
      
      if (result) {
        setItems([...items, result]);
      }
    }

    if (result) {
      handleCloseItemModal();
      // Atualiza totais (opcional: refetch da coleção para garantir sincronia)
      // Se quiser atualizar o card de cima imediatamente:
      setCollection(prev => {
         // Recalculo simples local para feedback visual rápido
         // (Idealmente buscaria do backend novamente)
         return prev; 
      });
    } else {
      alert("Erro ao salvar item.");
    }
  };

  // Função Deletar
  const handleDeleteItem = async (item) => {
    if (window.confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
      const success = await deleteItem(item.id);
      if (success) {
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
      } else {
        alert("Erro ao excluir item.");
      }
    }
  };

  return {
    user,
    collection,
    items,
    loading,
    openItemModal,
    newItemData,
    editingItem, // NOVO
    handleOpenItemModal,
    handleCloseItemModal,
    handleInputChange,
    handleSubmitItem,
    handleEditItem,   // NOVO
    handleDeleteItem  // NOVO
  };
};