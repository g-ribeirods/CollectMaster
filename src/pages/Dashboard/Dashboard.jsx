import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Container,
  Card, CardActionArea, CardContent, CardActions, CardMedia, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, FormControlLabel, Checkbox, Slide, Grid
} from '@mui/material';
import { 
  Search as SearchIcon, Add as AddIcon, PhotoCamera,
  Collections as CollectionsIcon, Logout as LogoutIcon, People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';

import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import CollectionCard from '../../components/CollectionCard/CollectionCard';

const ModalTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardView = ({
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
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideSearch = location.pathname === '/dashboard';

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#2F4F4F' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ color: '#F5F5DC', fontWeight: 'bold' }}>
              🏆 CollectMaster
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#D4AF37', color: '#2F4F4F' }}>
                  {user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <IconButton onClick={handleLogout} sx={{ color: '#D4AF37', ml: 1 }}>
                  <LogoutIcon />
                </IconButton>
            </Box>

            {/* 6. Ícone de Busca */}
            {!hideSearch && (
              <IconButton 
                sx={{ 
                  color: '#D4AF37',
                  display: { xs: 'none', sm: 'flex' },
                  ml: 1,
                  '&:hover': { 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            )}

            {/* 7. Botão de Logout */}
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

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h2" gutterBottom sx={{ color: '#F5F5DC', fontWeight: 'bold' }}>
          Suas Coleções
        </Typography>

        {/* Grid de Coleções */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
          
          {/* Card de CRIAR NOVA */}
          <Card sx={{ 
              border: '2px dashed #D4AF37', bgcolor: 'transparent', 
              minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
            <CardActionArea onClick={handleOpenCreateModal} sx={{ height: '100%', textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 60, color: '#D4AF37' }} />
              <Typography variant="h6" sx={{ color: '#F5F5DC', mt: 2 }}>
                Criar Coleção
              </Typography>
            </CardActionArea>
          </Card>

          {/* Lista de Coleções Existentes */}
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </Box>
      </Container>

      {/* --- O MODAL --- */}
      <Dialog
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        TransitionComponent={ModalTransition}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#F5F5DC', borderRadius: 3 } }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#2F4F4F' }}>
          Nova Coleção
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField
              autoFocus
              label="Nome da Coleção"
              fullWidth
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            
            <Box textAlign="center">
              <IconButton sx={{ border: '2px dashed #D4AF37', p: 4 }}>
                <PhotoCamera sx={{ fontSize: 40, color: '#D4AF37' }} />
              </IconButton>
              <Typography variant="caption" display="block">Inserir Foto</Typography>
            </Box>

            <FormControlLabel
              control={
                <Checkbox 
                  checked={isPublic} 
                  onChange={(e) => setIsPublic(e.target.checked)} 
                  sx={{ color: '#2F4F4F', '&.Mui-checked': { color: '#D4AF37' } }}
                />
              }
              label="Coleção Pública"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseCreateModal} color="inherit">Cancelar</Button>
          <Button 
            onClick={handleSubmitCollection} 
            variant="contained" 
            sx={{ bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold' }}
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const Dashboard = () => {
  const logic = useDashboard();
  return <DashboardView {...logic} />;
};

export default Dashboard;