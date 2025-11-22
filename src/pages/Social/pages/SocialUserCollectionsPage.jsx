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
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { getUserById } from '../../../services/userService';
import { getCollections } from '../../../services/collectionService';
import SocialCollectionCard from '../components/SocialCollectionCard';

const SocialUserCollectionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collections, setCollections] = useState([]);
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
    const fetchUserData = async () => {
      if (!id) return;

      try {
        const fetchedUser = await getUserById(id);
        if (fetchedUser) {
          setViewingUser(fetchedUser);
          // Buscar apenas coleções públicas do usuário
          const userCollections = await getCollections(id);
          const publicCollections = userCollections.filter((c) => c.is_public || c.isPublic);
          setCollections(publicCollections);
        } else {
          navigate('/social');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        navigate('/social');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
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

  if (!viewingUser) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Usuário não encontrado
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
          onClick={() => navigate('/social')}
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

        {/* Header do Usuário */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mb: 4,
            p: 3,
            bgcolor: '#F5F5DC',
            borderRadius: 2,
            border: '2px solid #D4AF37',
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: '#D4AF37',
              color: '#2F4F4F',
              fontWeight: 'bold',
              fontSize: '2.5rem',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
            }}
          >
            {viewingUser?.name ? viewingUser.name[0].toUpperCase() : '?'}
          </Avatar>
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: '#2F4F4F',
                fontWeight: 'bold',
              }}
            >
              {viewingUser?.name || 'Usuário'}
            </Typography>
          </Box>
        </Box>

        {/* Título das Coleções */}
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
            Coleções Públicas
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(245, 245, 220, 0.8)',
            }}
          >
            {collections.length} {collections.length === 1 ? 'coleção pública' : 'coleções públicas'}
          </Typography>
        </Box>

        {/* Grid de Coleções */}
        {collections.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
              borderRadius: 3,
              border: '2px dashed #D4AF37',
              bgcolor: 'rgba(255, 251, 217, 0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#F5F5DC',
                fontWeight: 'bold',
                mb: 1,
              }}
              gutterBottom
            >
              Nenhuma coleção pública
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(245, 245, 220, 0.8)',
              }}
            >
              Este usuário ainda não possui coleções públicas.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {collections.map((collection) => (
              <SocialCollectionCard key={collection.id} collection={collection} userId={id} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SocialUserCollectionsPage;

