import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Container,
  Button, TextField, InputAdornment,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Collections as CollectionsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SocialUserList from './components/SocialUserList';

const Social = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
                }
              }}
            >
              CollectMaster
            </Typography>

            {/* Grande Espaço Vazio */}
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
                display: { xs: 'none', sm: 'flex' }
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
                bgcolor: 'rgba(212, 175, 55, 0.2)',
                '&:hover': {
                  borderColor: '#D4AF37',
                  bgcolor: 'rgba(212, 175, 55, 0.3)',
                },
                display: { xs: 'none', sm: 'flex' }
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
                }
              }}
            >
              <Avatar sx={{ 
                width: { xs: 36, sm: 40 }, 
                height: { xs: 36, sm: 40 },
                bgcolor: '#D4AF37',
                color: '#2F4F4F',
                fontWeight: 'bold',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
            </Box>

            {/* Campo de Busca */}
            <TextField
              placeholder="Buscar usuários..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                ml: 1,
                minWidth: '250px',
                '& .MuiOutlinedInput-root': {
                  color: '#F5F5DC',
                  '& fieldset': {
                    borderColor: '#D4AF37',
                  },
                  '&:hover fieldset': {
                    borderColor: '#e5c55a',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4AF37',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(245, 245, 220, 0.7)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(245, 245, 220, 0.5)',
                  opacity: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#D4AF37' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Botão de Logout */}
            <IconButton 
              onClick={handleLogout}
              sx={{ 
                color: '#D4AF37',
                ml: 1,
                '&:hover': { 
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                }
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#F5F5DC',
              mb: 1
            }}
          >
            Social
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(245, 245, 220, 0.8)',
              mb: 3 
            }}
          >
            Conecte-se com outros colecionadores e descubra novas coleções
          </Typography>

          {/* Campo de Busca (Mobile e Desktop) */}
          <TextField
            fullWidth
            placeholder="Buscar usuários por nome..."
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: '#F5F5DC',
                bgcolor: 'rgba(245, 245, 220, 0.1)',
                '& fieldset': {
                  borderColor: '#D4AF37',
                },
                '&:hover fieldset': {
                  borderColor: '#e5c55a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D4AF37',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(245, 245, 220, 0.7)',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(245, 245, 220, 0.5)',
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#D4AF37' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Lista de Usuários */}
        <SocialUserList searchQuery={searchQuery} />
      </Container>
    </Box>
  );
};

export default Social;

