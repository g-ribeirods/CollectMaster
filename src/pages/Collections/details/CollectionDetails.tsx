import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Collections as CollectionsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CollectionDetailsHeader from './CollectionDetailsHeader';
import CollectionItemsGrid from './CollectionItemsGrid';
import { useCollectionDetails } from '../../../hooks/useCollectionDetails';

const CollectionDetails: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    user,
    collection,
    items,
    loading,
    openItemModal,
    newItemData,
    editingItem, // Pegamos o estado de edição
    handleOpenItemModal,
    handleCloseItemModal,
    handleInputChange,
    handleSubmitItem,
    // Pegamos as novas funções de ação
    handleEditItem,
    handleDeleteItem
  } = useCollectionDetails();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Função de visualização (pode ficar vazia por enquanto)
  const handleViewItemDetails = (item: any) => console.log('Ver:', item);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>Carregando...</Typography>
      </Box>
    );
  }

  if (!collection) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>Coleção não encontrada</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* HEADER (IGUAL AO ANTERIOR) */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#2F4F4F' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component={RouterLink} to="/dashboard" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1, color: '#F5F5DC', textDecoration: 'none', '&::before': { content: '"🏆"', fontSize: '2rem', filter: 'drop-shadow(0 0 8px #D4AF37)' }, '&:hover': { opacity: 0.9 } }}>
              CollectMaster
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Button variant="outlined" startIcon={<CollectionsIcon />} component={RouterLink} to="/dashboard" sx={{ color: '#F5F5DC', borderColor: '#D4AF37', px: 2, py: 1, minWidth: 'auto', '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' }, display: { xs: 'none', sm: 'flex' } }}>
              Suas coleções
            </Button>
            <Button variant="outlined" startIcon={<PeopleIcon />} component={RouterLink} to="/social" sx={{ color: '#F5F5DC', borderColor: '#D4AF37', px: 2, py: 1, minWidth: 'auto', ml: 1, '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' }, display: { xs: 'none', sm: 'flex' } }}>
              Social
            </Button>
            <Box component={RouterLink} to="/perfil" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer', ml: 1, '&:hover': { opacity: 0.9 } }}>
              <Avatar sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 }, bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
            </Box>
            <IconButton onClick={handleLogout} sx={{ color: '#D4AF37', ml: 1, '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' } }}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* CONTEÚDO */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ color: '#F5F5DC', mb: 3, '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' } }}>
          Voltar
        </Button>

        <CollectionDetailsHeader collection={collection} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#F5F5DC', mb: 1 }}>
              Itens da Coleção
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
              {items.length} {items.length === 1 ? 'item encontrado' : 'itens encontrados'}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenItemModal}
            sx={{ bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', px: 3, '&:hover': { bgcolor: '#e5c55a', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}
          >
            Adicionar Item
          </Button>
        </Box>

        {/* AQUI ESTÁ A MÁGICA: Passamos as funções reais para o Grid */}
        <CollectionItemsGrid
          items={items}
          onViewDetails={handleViewItemDetails}
          onEdit={handleEditItem}     // <--- Conectado!
          onDelete={handleDeleteItem} // <--- Conectado!
        />
      </Container>

      {/* MODAL */}
      <Dialog 
        open={openItemModal} 
        onClose={handleCloseItemModal}
        PaperProps={{ sx: { bgcolor: '#F5F5DC', borderRadius: 3 } }}
        maxWidth="sm"
        fullWidth
      >
        {/* Título Dinâmico: "Novo Item" ou "Editar Item" */}
        <DialogTitle sx={{ color: '#2F4F4F', fontWeight: 'bold', textAlign: 'center', pt: 3, fontSize: '1.5rem' }}>
          {editingItem ? 'Editar Item' : 'Novo Item'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField
              label="Nome do Item"
              name="name"
              value={newItemData.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={inputStyles}
            />
            <TextField
              label="Descrição"
              name="description"
              value={newItemData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={inputStyles}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Quantidade"
                  name="quantity"
                  type="number"
                  value={newItemData.quantity}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Valor Estimado (R$)"
                  name="estimatedValue"
                  type="number"
                  value={newItemData.estimatedValue}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyles}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={handleCloseItemModal} 
            variant="outlined"
            sx={{ color: '#2F4F4F', borderColor: '#2F4F4F', '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' } }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitItem} 
            variant="contained"
            disabled={!newItemData.name}
            sx={{ 
              bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', 
              '&:hover': { bgcolor: '#e5c55a' },
              '&.Mui-disabled': { bgcolor: 'rgba(212, 175, 55, 0.3)' }
            }}
          >
            {editingItem ? 'Atualizar' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#ffffff',
    '& fieldset': { borderColor: '#2F4F4F' },
    '&:hover fieldset': { borderColor: '#D4AF37' },
    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
  },
  '& .MuiInputLabel-root': { color: '#2F4F4F' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#D4AF37' },
};

export default CollectionDetails;