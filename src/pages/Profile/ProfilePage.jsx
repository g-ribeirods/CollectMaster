import React, { useState, useEffect } from 'react';
import {
  Typography, Avatar, Box, Container,
  Card, Button, TextField,
  List, ListItem, ListItemText, Divider, Chip
} from '@mui/material';
import { 
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { useDashboard } from '../../hooks/useDashboard';
import Header from '../../components/Header/Header';

const ProfilePage = () => {
  const { user, collections } = useDashboard();
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

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount || 0), 0);
  const mostRecentCollection = collections.length > 0 ? collections[collections.length - 1] : null;
  const accountCreationDate = user?.createdAt || new Date().toLocaleDateString('pt-BR');

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      <Header />

      {/* Conteúdo Principal - Container centralizado para desktop */}
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: 4,
          py: 5,
        }}
      >
        {/* Título e Subtítulo */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
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

        {/* Grid Principal: 3 colunas na mesma linha */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
          }}
        >
          {/* Card 1: Informações Pessoais */}
          <Card sx={{ 
            bgcolor: '#2F4F4F',
            border: '2px solid #D4AF37',
            borderRadius: 2,
            p: 3,
            height: '100%',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
              Informações Pessoais
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80,
                bgcolor: '#D4AF37',
                color: '#2F4F4F',
                fontWeight: 'bold',
                fontSize: '2rem',
                mb: 1.5,
                border: '2px solid #D4AF37',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
              }}>
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
              <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 0.5, fontWeight: 'bold', textAlign: 'left' }}>
                {formData.name || user?.name || 'Usuário'}
              </Typography>
              <Chip 
                label="Colecionador" 
                sx={{ 
                  bgcolor: '#D4AF37',
                  color: '#2F4F4F',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  mb: 1.5
                }}
                size="small"
              />
              <Button
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                sx={{
                  color: '#D4AF37',
                  borderColor: '#D4AF37',
                  fontSize: '0.75rem',
                  py: 0.5,
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

            <Divider sx={{ borderColor: '#D4AF37', mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  label="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  fullWidth
                  size="small"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: false,
                  }}
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
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      transition: 'all 0.2s',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                      transform: 'translate(14px, -9px) scale(0.75)',
                      top: '0',
                    },
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                      top: '0',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '8.5px 14px',
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
                  variant="outlined"
                  InputLabelProps={{
                    shrink: false,
                  }}
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
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      transition: 'all 0.2s',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                      transform: 'translate(14px, -9px) scale(0.75)',
                      top: '0',
                    },
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                      top: '0',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '8.5px 14px',
                    },
                  }}
                />
                <TextField
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  fullWidth
                  size="small"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: false,
                  }}
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
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      transition: 'all 0.2s',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                      transform: 'translate(14px, -9px) scale(0.75)',
                      top: '0',
                    },
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                      top: '0',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '8.5px 14px',
                    },
                  }}
                />
                <TextField
                  label="Bio"
                  value={formData.bio}
                  onChange={handleInputChange('bio')}
                  multiline
                  rows={2}
                  inputProps={{ maxLength: 120 }}
                  helperText={`${formData.bio.length}/120 caracteres`}
                  fullWidth
                  size="small"
                  variant="outlined"
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
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)',
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(245, 245, 220, 0.6)',
                      fontSize: '0.7rem',
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
                    mt: 0.5,
                    py: 1,
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

          {/* Card 2: Estatísticas */}
          <Card sx={{ 
            bgcolor: '#2F4F4F',
            border: '2px solid #D4AF37',
            borderRadius: 2,
            p: 3,
            height: '100%',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
              Estatísticas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          {/* Card 3: Atividade Recente */}
          <Card sx={{ 
            bgcolor: '#2F4F4F',
            border: '2px solid #D4AF37',
            borderRadius: 2,
            p: 3,
            height: '100%',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
              Atividade Recente
            </Typography>
            <List sx={{ p: 0, flexGrow: 1 }}>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemText
                  primary="Você criou a coleção X"
                  secondary="Há 2 dias"
                  primaryTypographyProps={{ color: '#F5F5DC', fontSize: '0.95rem' }}
                  secondaryTypographyProps={{ color: 'rgba(245, 245, 220, 0.6)', fontSize: '0.85rem' }}
                />
              </ListItem>
              <Divider sx={{ borderColor: '#D4AF37' }} />
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemText
                  primary="Você adicionou um novo item"
                  secondary="Há 5 dias"
                  primaryTypographyProps={{ color: '#F5F5DC', fontSize: '0.95rem' }}
                  secondaryTypographyProps={{ color: 'rgba(245, 245, 220, 0.6)', fontSize: '0.85rem' }}
                />
              </ListItem>
              <Divider sx={{ borderColor: '#D4AF37' }} />
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemText
                  primary="Você atualizou seu perfil"
                  secondary="Há 1 semana"
                  primaryTypographyProps={{ color: '#F5F5DC', fontSize: '0.95rem' }}
                  secondaryTypographyProps={{ color: 'rgba(245, 245, 220, 0.6)', fontSize: '0.85rem' }}
                />
              </ListItem>
            </List>
            </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

