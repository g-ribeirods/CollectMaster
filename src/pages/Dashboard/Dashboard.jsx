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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount || 0), 0);
  const totalValue = collections.reduce((sum, col) => sum + (col.value || 0), 0);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar Moderno */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ py: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
              <Avatar sx={{ 
                width: { xs: 36, sm: 40 }, 
                height: { xs: 36, sm: 40 },
                bgcolor: 'rgba(255,255,255,0.2)'
              }}>
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
            </IconButton>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                {user?.name || 'Usuário'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                Colecionador
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Chip
              icon={<CollectionsIcon />}
              label="Suas coleções"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.3)',
                display: { xs: 'none', sm: 'flex' }
              }}
            />
            <IconButton 
              color="inherit" 
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton 
              color="inherit"
              onClick={handleLogout}
              sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1
            }}
          >
            Suas Coleções
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Gerencie e organize todas as suas coleções em um só lugar
          </Typography>

          {/* Estatísticas */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={4} md={3}>
              <Card sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                p: 2,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
              }}>
                <Typography variant="h4" fontWeight="bold">
                  {collections.length}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Coleções
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Card sx={{ 
                bgcolor: 'secondary.main', 
                color: 'white',
                p: 2,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
              }}>
                <Typography variant="h4" fontWeight="bold">
                  {totalItems}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Itens
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Card sx={{ 
                bgcolor: 'success.main', 
                color: 'white',
                p: 2,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
              }}>
                <Typography variant="h4" fontWeight="bold">
                  R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Valor Total
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Card sx={{ 
                bgcolor: 'warning.main', 
                color: 'white',
                p: 2,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
              }}>
                <Typography variant="h4" fontWeight="bold">
                  {collections.filter(c => c.isPublic).length}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Públicas
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Grid de Coleções */}
        <Grid container spacing={3}>
          {/* Card de "Criar coleção" */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card 
              sx={{ 
                border: '2px dashed',
                borderColor: 'primary.main',
                bgcolor: 'transparent',
                boxShadow: 'none',
                minHeight: { xs: 280, sm: 360 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'rgba(102, 126, 234, 0.05)',
                  transform: 'translateY(-4px)',
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
                  color: 'primary.main',
                  p: 3
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <AddIcon sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    Criar Coleção
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Adicione uma nova coleção
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Coleções existentes */}
          {collections.map((collection) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={collection.id}>
              <CollectionCard collection={collection} />
            </Grid>
          ))}
        </Grid>

        {/* Mensagem quando não há coleções */}
        {collections.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            bgcolor: 'grey.50',
            borderRadius: 2,
            mt: 3
          }}>
            <CollectionsIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Nenhuma coleção ainda
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Comece criando sua primeira coleção!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateModal}
              size="large"
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
        fullScreen={isSmallMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.98) 0%, rgba(124, 58, 237, 0.98) 100%)',
            color: 'white',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.75rem' },
          pt: 3
        }}>
          Nova Coleção
        </DialogTitle>
        <DialogContent sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3, 
          px: { xs: 2, sm: 3 },
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
            InputLabelProps={{ 
              sx: { color: 'rgba(255,255,255,0.7)' } 
            }}
            InputProps={{ 
              sx: { 
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { 
                  borderColor: 'rgba(255,255,255,0.3)' 
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                }
              } 
            }}
            size={isSmallMobile ? "small" : "medium"}
          />
          
          {/* Botão "Inserir Foto" */}
          <Box textAlign="center" sx={{ py: 2 }}>
            <IconButton 
              component="label"
              sx={{ 
                border: '2px dashed rgba(255,255,255,0.5)', 
                borderRadius: '50%', 
                width: { xs: 120, sm: 150 }, 
                height: { xs: 120, sm: 150 },
                display: 'flex',
                flexDirection: 'column',
                color: 'rgba(255,255,255,0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <PhotoCamera sx={{ fontSize: { xs: 32, sm: 40 }, mb: 1 }} />
              <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Inserir Foto
              </Typography>
              <input type="file" hidden accept="image/*" />
            </IconButton>
          </Box>

          {/* Checkbox "Pública?" */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              label={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Coleção Pública
                </Typography>
              }
              control={
                <Checkbox 
                  checked={isPublic} 
                  onChange={(e) => setIsPublic(e.target.checked)}
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-checked': {
                      color: 'white'
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: 24, sm: 28 }
                    }
                  }}
                />
              }
              sx={{ color: 'white' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 2, sm: 3 },
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={handleCloseCreateModal} 
            variant="outlined"
            fullWidth={isSmallMobile}
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitCollection} 
            variant="contained"
            disabled={!newCollectionName}
            fullWidth={isSmallMobile}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              '&:disabled': {
                bgcolor: 'rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.5)'
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