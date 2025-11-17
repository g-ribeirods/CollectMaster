import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, createCollection } from '../services/collectionService'; 

export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isPublic, setIsPublic] = useState(true); 

useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // 2. Busca as coleções DESTE usuário
  useEffect(() => {
    // Só roda se o 'user' já foi carregado
    if (user) { 
      const fetchCollections = async () => {
        // Passa o user.id para o serviço
        const userCollections = await getCollections(user.id); 
        setCollections(userCollections);
      };

      fetchCollections();
    }
  }, [user]);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setNewCollectionName('');
    setIsPublic(true);
  };

    const handleSubmitCollection = async () => {
        if (!newCollectionName || !user) {
            console.error("Usuário não carregado ou nome da coleção em branco");
            return; 
        }
        
        const newCollection = await createCollection(
        newCollectionName, 
        isPublic,
        user.id 
        );
        
        if (newCollection) {
        setCollections([newCollection, ...collections]);
        handleCloseCreateModal(); 
        } else {
        console.error("A criação da coleção falhou, o serviço retornou null.");
        }
    };

  return {
    user,
    collections,
    openCreateModal,
    newCollectionName,
    setNewCollectionName,
    isPublic,
    setIsPublic,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleSubmitCollection,
  };
};