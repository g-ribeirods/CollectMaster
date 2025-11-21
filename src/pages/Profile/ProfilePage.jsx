import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Container,
  Card, CardContent, Button, Grid, TextField, Switch, FormControlLabel,
  List, ListItem, ListItemText, Divider, Chip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Collections as CollectionsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Brightness4 as Brightness4Icon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, collections } = useDashboard();
  const hideSearch = location.pathname !== '/social';
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount || 0), 0);
  const mostRecentCollection = collections.length > 0 ? collections[collections.length - 1] : null;
  const accountCreationDate = user?.createdAt || new Date().toLocaleDateString('pt-BR');

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
                '&:hover': {
                  borderColor: '#D4AF37',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
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

            {/* Ícone de Busca */}
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
        {/* Título e Subtítulo */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
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
            Meu Perfil
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(245, 245, 220, 0.8)',
            }}
          >
            Gerencie suas informações pessoais e preferências
          </Typography>
        </Box>

        {/* Row com 3 Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Card 1: Informações Pessoais */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              bgcolor: '#2F4F4F',
              border: '2px solid #D4AF37',
              borderRadius: 2,
              p: 3,
              height: '100%'
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 120, 
                  height: 120,
                  bgcolor: '#D4AF37',
                  color: '#2F4F4F',
                  fontWeight: 'bold',
                  fontSize: '3rem',
                  mb: 2,
                  border: '4px solid #D4AF37',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                }}>
                  {user?.name ? user.name[0].toUpperCase() : '?'}
                </Avatar>
                <Typography variant="h5" sx={{ color: '#F5F5DC', mb: 0.5, fontWeight: 'bold' }}>
                  {formData.name || user?.name || 'Usuário'}
                </Typography>
                <Chip 
                  label="Colecionador" 
                  sx={{ 
                    bgcolor: '#D4AF37',
                    color: '#2F4F4F',
                    fontWeight: 'bold',
                    fontSize: '0.75rem'
                  }}
                  size="small"
                />
                <Button
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  sx={{
                    mt: 2,
                    color: '#D4AF37',
                    borderColor: '#D4AF37',
                    '&:hover': {
                      borderColor: '#e5c55a',
                      bgcolor: 'rgba(212, 175, 55, 0.1)',
                    }
                  }}
                  size="small"
                >
                  Alterar Foto
                </Button>
              </Box>

              <Divider sx={{ borderColor: '#D4AF37', mb: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#F5F5DC',
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
                      color: '#2F4F4F',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                    },
                  }}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#F5F5DC',
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
                      color: '#2F4F4F',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                    },
                  }}
                />
                <TextField
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#F5F5DC',
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
                      color: '#2F4F4F',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                    },
                  }}
                />
                <TextField
                  label="Bio"
                  value={formData.bio}
                  onChange={handleInputChange('bio')}
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 120 }}
                  helperText={`${formData.bio.length}/120 caracteres`}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#F5F5DC',
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
                      color: '#2F4F4F',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(245, 245, 220, 0.6)',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  fullWidth
                  sx={{
                    bgcolor: '#D4AF37',
                    color: '#2F4F4F',
                    fontWeight: 'bold',
                    mt: 1,
                    '&:hover': {
                      bgcolor: '#e5c55a',
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Card 2: Estatísticas */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              bgcolor: '#2F4F4F',
              border: '2px solid #D4AF37',
              borderRadius: 2,
              p: 3,
              height: '100%'
            }}>
              <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 3, fontWeight: 'bold' }}>
                Estatísticas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
                    {collections.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                    Coleções
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
                    {totalItems}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                    Itens
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.6)', mb: 0.5 }}>
                    Coleção mais recente
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#F5F5DC', fontWeight: 500 }}>
                    {mostRecentCollection?.name || 'Nenhuma coleção ainda'}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.6)', mb: 0.5 }}>
                    Item mais valioso
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#F5F5DC', fontWeight: 500 }}>
                    Em breve
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.6)', mb: 0.5 }}>
                    Conta criada em
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#F5F5DC', fontWeight: 500 }}>
                    {accountCreationDate}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Card 3: Configurações Básicas */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              bgcolor: '#2F4F4F',
              border: '2px solid #D4AF37',
              borderRadius: 2,
              p: 3,
              height: '100%'
            }}>
              <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 3, fontWeight: 'bold' }}>
                Configurações
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#D4AF37',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#D4AF37',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Brightness4Icon sx={{ color: '#D4AF37', fontSize: 20 }} />
                      <Typography sx={{ color: '#F5F5DC' }}>Modo Escuro</Typography>
                    </Box>
                  }
                />
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  fullWidth
                  sx={{
                    color: '#D4AF37',
                    borderColor: '#D4AF37',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      borderColor: '#e5c55a',
                      bgcolor: 'rgba(212, 175, 55, 0.1)',
                    }
                  }}
                >
                  Alterar Senha
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SecurityIcon />}
                  fullWidth
                  sx={{
                    color: '#D4AF37',
                    borderColor: '#D4AF37',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      borderColor: '#e5c55a',
                      bgcolor: 'rgba(212, 175, 55, 0.1)',
                    }
                  }}
                >
                  Preferências de Privacidade
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<NotificationsIcon />}
                  fullWidth
                  sx={{
                    color: '#D4AF37',
                    borderColor: '#D4AF37',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      borderColor: '#e5c55a',
                      bgcolor: 'rgba(212, 175, 55, 0.1)',
                    }
                  }}
                >
                  Notificações
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Card 4: Atividade Recente */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ 
              bgcolor: '#2F4F4F',
              border: '2px solid #D4AF37',
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 3, fontWeight: 'bold' }}>
                Atividade Recente
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemText
                    primary="Você criou a coleção X"
                    secondary="Há 2 dias"
                    primaryTypographyProps={{ color: '#F5F5DC' }}
                    secondaryTypographyProps={{ color: 'rgba(245, 245, 220, 0.6)' }}
                  />
                </ListItem>
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemText
                    primary="Você adicionou um novo item"
                    secondary="Há 5 dias"
                    primaryTypographyProps={{ color: '#F5F5DC' }}
                    secondaryTypographyProps={{ color: 'rgba(245, 245, 220, 0.6)' }}
                  />
                </ListItem>
                <Divider sx={{ borderColor: '#D4AF37' }} />
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemText
                    primary="Você atualizou seu perfil"
                    secondary="Há 1 semana"
                    primaryTypographyProps={{ color: '#F5F5DC' }}
                    secondaryTypographyProps={{ color: 'rgba(245, 245, 220, 0.6)' }}
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;

