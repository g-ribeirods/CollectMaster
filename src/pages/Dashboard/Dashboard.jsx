import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Container,
  Card, CardActionArea, CardContent, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, FormControlLabel, Checkbox, Slide, useTheme, useMediaQuery, Grid
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  PhotoCamera,
  Collections as CollectionsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount || 0), 0);
  const totalValue = collections.reduce((sum, col) => sum + (col.value || 0), 0);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* AppBar Moderno */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: '#2F4F4F',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <Avatar sx={{ 
                width: 40, 
                height: 40,
                bgcolor: '#D4AF37',
                color: '#2F4F4F',
                fontWeight: 'bold',
              }}>
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
              <Box>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold', 
                    lineHeight: 1.2,
                    color: '#F5F5DC',
                  }}
                >
                  {user?.name || 'Usuário'}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(245, 245, 220, 0.8)',
                    fontSize: '0.75rem' 
                  }}
                >
                  Colecionador
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<CollectionsIcon sx={{ color: '#D4AF37' }} />}
                label="Suas coleções"
                sx={{
                  bgcolor: 'rgba(212, 175, 55, 0.2)',
                  color: '#F5F5DC',
                  fontWeight: 'bold',
                  border: '1px solid #D4AF37',
                  '& .MuiChip-icon': {
                    color: '#D4AF37',
                  },
                  display: { xs: 'none', sm: 'flex' }
                }}
              />
              <IconButton 
                sx={{ 
                  color: '#D4AF37',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': { 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton 
                onClick={handleLogout}
                sx={{ 
                  color: '#D4AF37',
                  '&:hover': { 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Header Section */}
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
            Suas Coleções
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(245, 245, 220, 0.8)',
              mb: 4 
            }}
          >
            Gerencie e organize todas as suas coleções em um só lugar
          </Typography>

          {/* Estatísticas */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '2px solid #D4AF37',
                p: 3,
                textAlign: 'center',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <CollectionsIcon sx={{ fontSize: 32, color: '#D4AF37', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#F5F5DC' }}>
                  {collections.length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                  Coleções
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '2px solid #D4AF37',
                p: 3,
                textAlign: 'center',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ fontSize: 32, color: '#D4AF37', mb: 1 }}>📦</Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#F5F5DC' }}>
                  {totalItems}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                  Itens
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '2px solid #D4AF37',
                p: 3,
                textAlign: 'center',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ fontSize: 32, color: '#D4AF37', mb: 1 }}>💰</Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#D4AF37' }}>
                  R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                  Valor Total
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '2px solid #D4AF37',
                p: 3,
                textAlign: 'center',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ fontSize: 32, color: '#D4AF37', mb: 1 }}>🌐</Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#F5F5DC' }}>
                  {collections.filter(c => c.isPublic).length}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                  Públicas
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Grid de Coleções */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {/* Card de "Criar coleção" */}
          <Card 
            sx={{ 
              border: '2px dashed',
              borderColor: '#D4AF37',
              bgcolor: '#F5F5DC',
              boxShadow: 'none',
              height: '480px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#e5c55a',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
              }
            }}
          >
            <CardActionArea 
              onClick={handleOpenCreateModal}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                p: 3
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    bgcolor: 'rgba(212, 175, 55, 0.2)',
                    border: '2px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      bgcolor: '#D4AF37',
                    }
                  }}
                >
                  <AddIcon sx={{ fontSize: 45, color: '#D4AF37' }} />
                </Box>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ color: '#2F4F4F', mb: 1 }}
                >
                  Criar Coleção
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: 'rgba(47, 79, 79, 0.8)' }}
                >
                  Adicione uma nova coleção
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Coleções existentes */}
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </Box>

        {/* Mensagem quando não há coleções */}
        {collections.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            bgcolor: '#F5F5DC',
            borderRadius: 2,
            mt: 3,
            border: '2px dashed #D4AF37',
          }}>
            <CollectionsIcon sx={{ fontSize: 80, color: '#D4AF37', mb: 2 }} />
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ color: '#2F4F4F', mb: 1 }}
            >
              Nenhuma coleção ainda
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(47, 79, 79, 0.8)',
                mb: 3 
              }}
            >
              Comece criando sua primeira coleção!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateModal}
              size="large"
              sx={{
                bgcolor: '#D4AF37',
                color: '#2F4F4F',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#e5c55a',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              Criar Primeira Coleção
            </Button>
          </Box>
        )}
      </Container>

      {/* Modal para criar coleção */}
      <Dialog
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        TransitionComponent={ModalTransition}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: '#F5F5DC',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          fontSize: '1.75rem',
          pt: 3,
          color: '#2F4F4F',
        }}>
          Nova Coleção
        </DialogTitle>
        <DialogContent sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3, 
          px: 3,
          pb: 2
        }}>
          {/* Campo "Nome" */}
          <TextField
            autoFocus
            label="Nome da Coleção"
            type="text"
            fullWidth
            variant="outlined"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#ffffff',
                '& fieldset': {
                  borderColor: '#2F4F4F',
                },
                '&:hover fieldset': {
                  borderColor: '#D4AF37',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D4AF37',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#2F4F4F',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#D4AF37',
              },
            }}
          />
          
          {/* Botão "Inserir Foto" */}
          <Box textAlign="center" sx={{ py: 2 }}>
            <IconButton 
              component="label"
              sx={{ 
                border: '2px dashed #D4AF37', 
                borderRadius: '50%', 
                width: 150, 
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                color: '#2F4F4F',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#e5c55a',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <PhotoCamera sx={{ fontSize: 40, mb: 1, color: '#D4AF37' }} />
              <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#2F4F4F' }}>
                Inserir Foto
              </Typography>
              <input type="file" hidden accept="image/*" />
            </IconButton>
          </Box>

          {/* Checkbox "Pública?" */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              label={
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#2F4F4F' }}>
                  Coleção Pública
                </Typography>
              }
              control={
                <Checkbox 
                  checked={isPublic} 
                  onChange={(e) => setIsPublic(e.target.checked)}
                  sx={{ 
                    color: '#2F4F4F',
                    '&.Mui-checked': {
                      color: '#D4AF37'
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: 28
                    }
                  }}
                />
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3,
          gap: 2,
        }}>
          <Button 
            onClick={handleCloseCreateModal}
            sx={{ 
              color: '#2F4F4F',
              borderColor: '#2F4F4F',
              '&:hover': {
                borderColor: '#D4AF37',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
              }
            }}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitCollection} 
            variant="contained"
            disabled={!newCollectionName}
            sx={{
              bgcolor: '#D4AF37',
              color: '#2F4F4F',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#e5c55a',
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              '&:disabled': {
                bgcolor: 'rgba(212, 175, 55, 0.3)',
                color: 'rgba(47, 79, 79, 0.5)'
              }
            }}
          >
            Criar Coleção
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// 6. O componente "Pai" (Container) - Nenhuma mudança aqui
const Dashboard = () => {
  const logic = useDashboard();
  
  return <DashboardView {...logic} />;
};

export default Dashboard;