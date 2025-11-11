import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Collections as CollectionsIcon,
  Add as AddIcon,
  Search as SearchIcon,
  BarChart as ChartIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Share as ShareIcon,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const features = [
    {
      icon: <CollectionsIcon sx={{ fontSize: 40 }} />,
      title: 'Organize suas Coleções',
      description: 'Categorize e organize itens de forma intuitiva com metadados personalizáveis.',
      color: '#3b82f6'
    },
    {
      icon: <ChartIcon sx={{ fontSize: 40 }} />,
      title: 'Acompanhe Valores',
      description: 'Monitore o valor de mercado e histórico de preços dos seus itens.',
      color: '#10b981'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Busca Avançada',
      description: 'Encontre rapidamente qualquer item com nosso sistema de busca inteligente.',
      color: '#f59e0b'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Backup Seguro',
      description: 'Seus dados protegidos com criptografia e backup automático na nuvem.',
      color: '#ef4444'
    },
    {
      icon: <ShareIcon sx={{ fontSize: 40 }} />,
      title: 'Compartilhamento',
      description: 'Compartilhe suas coleções com outros entusiastas de forma controlada.',
      color: '#8b5cf6'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: 'Comunidade',
      description: 'Conecte-se com outros colecionadores e troque experiências.',
      color: '#ec4899'
    }
  ]

  const collectionTypes = [
    {
      title: 'Action Figures',
      items: '1.2K coleções',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Moedas Raras',
      items: '856 coleções',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Vinil e CDs',
      items: '2.3K coleções',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'transparent',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ py: 2 }}>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            🏆 CollectMaster
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit">Recursos</Button>
            <Button color="inherit">Preços</Button>
            <Button color="inherit">Sobre</Button>
            <Button color="inherit">Contato</Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <Button 
              variant="outlined" 
              color="inherit"
              // 2. Atualizar o botão Entrar (para uma futura rota /login)
              component={RouterLink}
              to="/login"
              sx={{ 
                // ... (estilos)
              }}
            >
              Entrar
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              // 3. Atualizar o botão Cadastrar
              component={RouterLink}
              to="/register"
              sx={{ 
                // ... (estilos)
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Organize suas coleções como um{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  verdadeiro expert
                </Box>
              </Typography>
              
              <Typography
                variant="h5"
                component="p"
                gutterBottom
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                A plataforma definitiva para colecionadores organizarem, valorarem e compartilharem suas coleções mais preciosas.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Começar Agora
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="inherit"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Ver Demonstração
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 4, mt: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    10K+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Colecionadores
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    50K+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Coleções
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    1M+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Itens Catalogados
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    borderRadius: 4,
                  },
                }}
              >
                <Card
                  elevation={8}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        height: 300,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 48,
                        }}
                      >
                        🏆
                      </Box>
                      <Typography variant="h5" fontWeight="bold" textAlign="center">
                        Sua Coleção em um só lugar
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8}>
          <Chip 
            label="RECURSOS" 
            color="primary" 
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography variant="h2" component="h2" gutterBottom>
            Tudo que você precisa para sua coleção
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Ferramentas poderosas desenvolvidas especificamente para colecionadores
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Collection Types Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Chip 
              label="CATEGORIAS" 
              color="primary" 
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography variant="h2" component="h2" gutterBottom>
              Tipos de Coleção Populares
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Descubra como outros colecionadores estão usando o CollectMaster
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {collectionTypes.map((collection, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: 280,
                    background: collection.gradient,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 4,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                      {collection.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                      {collection.items}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        alignSelf: 'flex-start',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      Explorar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Pronto para organizar sua coleção?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Junte-se a milhares de colecionadores que já transformaram sua paixão em organização
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 8,
            },
            transition: 'all 0.3s ease',
          }}
        >
          Começar Gratuitamente
        </Button>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="div" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🏆 CollectMaster
              </Typography>
              <Typography variant="body1" color="grey.400" sx={{ mb: 2 }}>
                A plataforma definitiva para colecionadores organizarem e valorarem suas coleções.
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>Produto</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Recursos</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Preços</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Casos de Uso</Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>Empresa</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Sobre</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Blog</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Carreiras</Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="h6" gutterBottom>Suporte</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Ajuda</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>Contato</Typography>
              <Typography variant="body2" color="grey.400" sx={{ display: 'block', mb: 1 }}>FAQ</Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="grey.400">
              © 2024 CollectMaster. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home