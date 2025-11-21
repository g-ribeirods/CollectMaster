import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Collections as CollectionsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CollectionDetailsHeader from './CollectionDetailsHeader';
import CollectionItemsGrid from './CollectionItemsGrid';
import { getCollectionItems } from '../../../mocks/collection-items';

const CollectionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      if (!id || !user) return;

      try {
        // Buscar coleções do usuário
        const response = await fetch(`http://localhost:8000/api/collections/${user.id}`);
        if (response.ok) {
          const collections = await response.json();
          const foundCollection = collections.find((c: any) => c.id === parseInt(id) || c.id === id);
          
          if (foundCollection) {
            setCollection(foundCollection);
            // Carregar itens mockados baseados no nome da coleção
            const mockItems = getCollectionItems(id, foundCollection.name);
            setItems(mockItems);
          } else {
            // Se não encontrou, redirecionar para dashboard
            navigate('/dashboard');
          }
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Erro ao buscar coleção:', error);
        // Em caso de erro, tentar usar dados mockados
        const mockCollection = {
          id: id,
          name: 'Coleção',
          category: 'Geral',
          description: 'Descrição da coleção',
          itemCount: 0,
          value: 0,
        };
        setCollection(mockCollection);
        const mockItems = getCollectionItems(id, 'Coleção');
        setItems(mockItems);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCollectionData();
    }
  }, [id, user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleViewItemDetails = (item: any) => {
    // TODO: Implementar visualização de detalhes do item
    console.log('Ver detalhes do item:', item);
  };

  const handleEditItem = (item: any) => {
    // TODO: Implementar edição do item
    console.log('Editar item:', item);
  };

  const handleDeleteItem = (item: any) => {
    // TODO: Implementar exclusão do item
    console.log('Excluir item:', item);
    setItems(items.filter((i) => i.id !== item.id));
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (!collection) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Coleção não encontrada
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#2F4F4F',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo CollectMaster */}
            <Typography
              variant="h4"
              component={RouterLink}
              to="/dashboard"
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#F5F5DC',
                textDecoration: 'none',
                '&::before': {
                  content: '"🏆"',
                  fontSize: '2rem',
                  filter: 'drop-shadow(0 0 8px #D4AF37)',
                },
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              CollectMaster
            </Typography>

            {/* Espaço vazio */}
            <Box sx={{ flex: 1 }} />

            {/* Botão Suas Coleções */}
            <Button
              variant="outlined"
              startIcon={<CollectionsIcon />}
              component={RouterLink}
              to="/dashboard"
              sx={{
                color: '#F5F5DC',
                borderColor: '#D4AF37',
                px: 2,
                py: 1,
                minWidth: 'auto',
                '&:hover': {
                  borderColor: '#D4AF37',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              Suas coleções
            </Button>

            {/* Botão Social */}
            <Button
              variant="outlined"
              startIcon={<PeopleIcon />}
              component={RouterLink}
              to="/social"
              sx={{
                color: '#F5F5DC',
                borderColor: '#D4AF37',
                px: 2,
                py: 1,
                minWidth: 'auto',
                ml: 1,
                '&:hover': {
                  borderColor: '#D4AF37',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              Social
            </Button>

            {/* Avatar do Usuário */}
            <Box
              component={RouterLink}
              to="/perfil"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                ml: 1,
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  bgcolor: '#D4AF37',
                  color: '#2F4F4F',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
            </Box>

            {/* Ícone de Busca */}
            <IconButton
              sx={{
                color: '#D4AF37',
                display: { xs: 'none', sm: 'flex' },
                ml: 1,
                '&:hover': {
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* Botão de Logout */}
            <IconButton
              onClick={handleLogout}
              sx={{
                color: '#D4AF37',
                ml: 1,
                '&:hover': {
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Botão Voltar */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{
            color: '#F5F5DC',
            mb: 3,
            '&:hover': {
              bgcolor: 'rgba(212, 175, 55, 0.1)',
            },
          }}
        >
          Voltar
        </Button>

        {/* Header da Coleção */}
        <CollectionDetailsHeader collection={collection} />

        {/* Título da Seção de Itens */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#F5F5DC',
              mb: 1,
            }}
          >
            Itens da Coleção
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(245, 245, 220, 0.8)',
            }}
          >
            {items.length} {items.length === 1 ? 'item encontrado' : 'itens encontrados'}
          </Typography>
        </Box>

        {/* Grid de Itens */}
        <CollectionItemsGrid
          items={items}
          onViewDetails={handleViewItemDetails}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </Container>
    </Box>
  );
};

export default CollectionDetails;

