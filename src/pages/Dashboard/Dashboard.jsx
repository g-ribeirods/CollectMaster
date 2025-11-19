import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Container,
  Card, CardActionArea, CardContent, CardActions, CardMedia, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, FormControlLabel, Checkbox, Slide, useTheme, useMediaQuery, Grid
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  PhotoCamera,
  Collections as CollectionsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon
} from '@mui/icons-material';
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount || 0), 0);
  const totalValue = collections.reduce((sum, col) => sum + (col.value || 0), 0);

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
            {/* 1. Logo CollectMaster */}
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

            {/* 2. GRANDE ESPAÇO VAZIO */}
            <Box sx={{ flex: 1 }} />

            {/* 3. Botão Suas Coleções */}
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

            {/* 4. Botão Social */}
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
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              Social
            </Button>

            {/* 5. Avatar do Usuário (clicável) */}
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

            {/* 6. Ícone de Busca */}
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
          <Grid 
            container 
            spacing={3} 
            sx={{ 
              mb: 4,
              '& > .MuiGrid-item': {
                display: 'flex',
              }
            }}
          >
            <Grid item xs={6} sm={3} sx={{ display: 'flex' }}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '1px solid #D4AF37',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                width: '100%',
                height: '140px',
                minHeight: '140px',
                maxHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <CollectionsIcon sx={{ fontSize: 32, color: '#D4AF37' }} />
                </Box>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#F5F5DC',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    lineHeight: 1.2,
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%'
                  }}
                >
                  {collections.length}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(245, 245, 220, 0.8)',
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}
                >
                  Coleções
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ display: 'flex' }}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '1px solid #D4AF37',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                width: '100%',
                height: '140px',
                minHeight: '140px',
                maxHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, fontSize: 32 }}>
                  📦
                </Box>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#F5F5DC',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    lineHeight: 1.2,
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%'
                  }}
                >
                  {totalItems}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(245, 245, 220, 0.8)',
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}
                >
                  Itens
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ display: 'flex' }}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '1px solid #D4AF37',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                width: '100%',
                height: '140px',
                minHeight: '140px',
                maxHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, fontSize: 32 }}>
                  💰
                </Box>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#D4AF37',
                    fontSize: { xs: '1.1rem', sm: '1.4rem' },
                    lineHeight: 1.2,
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%'
                  }}
                >
                  R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(245, 245, 220, 0.8)',
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}
                >
                  Valor Total
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ display: 'flex' }}>
              <Card sx={{ 
                bgcolor: '#2F4F4F', 
                color: '#F5F5DC',
                border: '1px solid #D4AF37',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                width: '100%',
                height: '140px',
                minHeight: '140px',
                maxHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)', 
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#e5c55a',
                }
              }}>
                <Box sx={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, fontSize: 32 }}>
                  🌐
                </Box>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  sx={{ 
                    color: '#F5F5DC',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    lineHeight: 1.2,
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%'
                  }}
                >
                  {collections.filter(c => c.isPublic).length}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(245, 245, 220, 0.8)',
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}
                >
                  Públicas
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Grid de Coleções - Inclui Card "Criar" e Coleções Existentes */}
        {collections.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
              justifyContent: 'center',
            }}
          >
            {/* Card de Criar Coleção - Mesmo estilo dos outros cards */}
            <Card 
              sx={{ 
                width: '100%',
                height: '480px',
                minHeight: '480px',
                maxHeight: '480px',
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: '#F5F5DC',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                boxSizing: 'border-box',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
                  borderColor: '#D4AF37',
                }
              }}
            >
              {/* Área da Imagem - Placeholder */}
              <CardActionArea 
                onClick={handleOpenCreateModal}
                sx={{ height: 200 }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AddIcon sx={{ fontSize: 60, color: '#D4AF37', opacity: 0.7 }} />
                </CardMedia>
              </CardActionArea>

              <CardContent sx={{ 
                flexGrow: 1, 
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                textAlign: 'center',
                width: '100%',
              }}>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    fontSize: '1.25rem',
                    lineHeight: 1.3,
                    fontWeight: 'bold',
                    color: '#2F4F4F',
                    minHeight: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Criar Coleção
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Chip 
                    label="Nova" 
                    variant="outlined"
                    size="medium"
                    sx={{ 
                      fontSize: '0.85rem',
                      height: 32,
                      borderColor: '#D4AF37',
                      color: '#2F4F4F',
                      bgcolor: 'rgba(212, 175, 55, 0.1)',
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  sx={{
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    flexGrow: 1,
                    color: 'rgba(47, 79, 79, 0.8)',
                    minHeight: '2.7rem',
                  }}
                >
                  Adicione uma nova coleção
                </Typography>

                {/* Stats - Mesmo layout dos outros cards */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  py: 1.5, 
                  mt: 'auto',
                  borderTop: 1, 
                  borderBottom: 1, 
                  borderColor: 'rgba(47, 79, 79, 0.2)',
                  gap: 1,
                  width: '100%'
                }}>
                  <Box textAlign="center" sx={{ flex: 1 }}>
                    <Typography 
                      variant="caption" 
                      display="block"
                      sx={{ 
                        fontSize: '0.75rem',
                        color: 'rgba(47, 79, 79, 0.7)',
                        mb: 0.5,
                      }}
                    >
                      Itens
                    </Typography>
                    <Typography 
                      variant="h6" 
                      fontWeight="bold" 
                      sx={{ 
                        fontSize: '1.1rem',
                        color: '#2F4F4F',
                      }}
                    >
                      -
                    </Typography>
                  </Box>
                  <Box textAlign="center" sx={{ flex: 1 }}>
                    <Typography 
                      variant="caption" 
                      display="block"
                      sx={{ 
                        fontSize: '0.75rem',
                        color: 'rgba(47, 79, 79, 0.7)',
                        mb: 0.5,
                      }}
                    >
                      Valor
                    </Typography>
                    <Typography 
                      variant="h6" 
                      fontWeight="bold" 
                      sx={{ 
                        fontSize: '1.1rem',
                        color: '#D4AF37',
                      }}
                    >
                      -
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              {/* CardActions - Mesmo estilo */}
              <CardActions sx={{ 
                p: 2,
                gap: 1,
                bgcolor: 'rgba(47, 79, 79, 0.05)',
                width: '100%',
              }}>
                <Button 
                  variant="contained" 
                  size="small"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateModal}
                  sx={{ 
                    bgcolor: '#D4AF37',
                    color: '#2F4F4F',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    '&:hover': {
                      bgcolor: '#e5c55a',
                    }
                  }}
                >
                  Criar
                </Button>
              </CardActions>
            </Card>

            {/* Coleções existentes */}
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </Box>
        )}

        {/* Área Inferior - Estado Vazio (apenas quando não há coleções) */}
        {collections.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 10,
            px: 3,
            borderRadius: 3,
            mt: 3,
            border: '2px dashed #D4AF37',
            bgcolor: 'rgba(255, 251, 217, 0.1)',
            transition: 'all 0.3s ease',
          }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.7,
              }}
            >
              <CollectionsIcon sx={{ fontSize: 80, color: '#D4AF37' }} />
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#F5F5DC',
                fontWeight: 'bold',
                mb: 1
              }}
              gutterBottom
            >
              Nenhuma coleção ainda
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(245, 245, 220, 0.8)',
                mb: 4,
                maxWidth: '400px',
                mx: 'auto'
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
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
                '&:hover': {
                  bgcolor: '#e5c55a',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(212, 175, 55, 0.5)',
                },
                transition: 'all 0.3s ease',
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