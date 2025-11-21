import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, createCollection } from '../services/collectionService';

export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  
  // Estados do Modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // 1. Carregar Usuário
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // 2. Carregar Coleções
  useEffect(() => {
    if (user) {
      const loadData = async () => {
        const data = await getCollections(user.id);
        setCollections(data);
      };
      loadData();
    }
  }, [user]);

  // Funções do Modal
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setNewCollectionName(''); // Limpa o campo
    setIsPublic(true);
  };

  // Função de Criar
  const handleSubmitCollection = async () => {
    if (!newCollectionName.trim()) {
        alert("Digite um nome para a coleção.");
        return;
    }
    if (!user) return;

    const newCollection = await createCollection(newCollectionName, isPublic, user.id);

    if (newCollection) {
      // Adiciona à lista sem recarregar a página
      setCollections([...collections, newCollection]);
      handleCloseCreateModal();
    } else {
      alert("Erro ao criar coleção. Veja o console.");
    }
  };

  return {
    user,
    collections,
    // Modal Props
    openCreateModal,
    newCollectionName,
    setNewCollectionName,
    isPublic,
    setIsPublic,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleSubmitCollection
  };
};