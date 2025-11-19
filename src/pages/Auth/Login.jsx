import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  ArrowBack,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// 1. Importe o novo Hook de LÓGICA
import { useLoginForm } from '../../hooks/useLoginForm';

// 2. Componente "burro" (apenas VISUAL)
const LoginView = ({
  formData,
  errors,
  showPassword,
  handleChange,
  handleSubmit,
  setShowPassword,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
      }}
    >
      <Container maxWidth="xs"> {/* Mais estreito que o de cadastro */}
        {/* Botão Voltar */}
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: { xs: 16, sm: 24 },
            left: { xs: 16, sm: 24 },
            borderColor: 'rgba(255,255,255,0.3)',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Voltar
        </Button>

        <Card elevation={8} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              🏆 CollectMaster
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom fontWeight="600">
              Bem-vindo de volta!
            </Typography>
          </Box>

          {/* Alert de erro */}
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.submit}
            </Alert>
          )}

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email} // (Pode adicionar validação no hook se quiser)
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="seu@email.com"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Sua senha"
                />
              </Grid>
            </Grid>
            
            <Link
                href="#"
                variant="body2"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mt: 1,
                  mb: 2,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Esqueceu a senha?
              </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '1.1rem',
                fontWeight: '600',
              }}
            >
              Entrar
            </Button>
          </Box>

          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                ou
              </Typography>
            </Divider>
          </Box>

          {/* Botão Google (exemplo) */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ py: 1.5, borderColor: 'grey.300', color: 'text.primary' }}
          >
            Continuar com Google
          </Button>

          {/* Link para Cadastro */}
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="text.secondary">
              Não tem uma conta?{' '}
              <Link
                component={RouterLink}
                to="/register" // Link para a página de cadastro
                sx={{
                  fontWeight: '600',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  </Box>
  );
};

// 3. Componente "Pai" (Container) que junta Lógica e Visual
const Login = () => {
  const logic = useLoginForm();
  
  return <LoginView {...logic} />;
};

export default Login;