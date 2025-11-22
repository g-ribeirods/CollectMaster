import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, createCollection, updateCollection } from '../services/collectionService'; 

export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  
  // Estados do Modal e Formulário
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null); // Se não for null, estamos editando
  
  // Um estado único para o formulário facilita
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    isPublic: true
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    if (user) { 
      const fetchCollections = async () => {
        const userCollections = await getCollections(user.id); 
        setCollections(userCollections);
      };
      fetchCollections();
    }
  }, [user]);

  // Handlers do Modal
  const handleOpenCreateModal = () => {
    setEditingCollection(null); // Garante modo criação
    setFormData({ name: '', description: '', imageUrl: '', isPublic: true });
    setOpenCreateModal(true);
  };

  // Novo: Abre modal preenchido para editar
  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description || '',
      imageUrl: collection.image_url || '', // Backend manda snake_case
      isPublic: collection.is_public ?? true
    });
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setEditingCollection(null);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitCollection = async () => {
    if (!formData.name.trim()) return;
    if (!user) return;
    
    let result;

    if (editingCollection) {
        // MODO EDIÇÃO
        result = await updateCollection(editingCollection.id, formData);
        if (result) {
            setCollections(prev => prev.map(col => col.id === editingCollection.id ? result : col));
        }
    } else {
        // MODO CRIAÇÃO
        result = await createCollection({
            ...formData,
            ownerId: user.id
        });
        if (result) {
            setCollections([...collections, result]);
        }
    }

    if (result) {
        handleCloseCreateModal();
    } else {
        alert("Erro ao salvar coleção.");
    }
  };

  return {
    user,
    collections,
    openCreateModal,
    formData, // Exportamos o objeto inteiro
    editingCollection,
    handleOpenCreateModal,
    handleEditCollection, // Exportamos o novo handler
    handleCloseCreateModal,
    handleSubmitCollection,
    handleInputChange // Handler genérico para inputs
  };
};