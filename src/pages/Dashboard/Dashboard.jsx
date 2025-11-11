import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  AttachMoney as MoneyIcon,
  Collections as CollectionsIcon,
  Inventory as ItemsIcon,
  TrendingUp as TrendingIcon,
  NewReleases as NewIcon,
} from '@mui/icons-material'
import CollectionCard from '../../components/CollectionCard/CollectionCard'

function Dashboard({ collections, items }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const totalValue = collections.reduce((sum, collection) => sum + collection.value, 0)
  const totalItems = collections.reduce((sum, collection) => sum + collection.itemCount, 0)
  const totalCollections = collections.length

  const stats = [
    {
      icon: <MoneyIcon />,
      label: 'Valor Total',
      value: `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: '#10b981'
    },
    {
      icon: <CollectionsIcon />,
      label: 'Coleções',
      value: totalCollections.toString(),
      color: '#3b82f6'
    },
    {
      icon: <ItemsIcon />,
      label: 'Itens',
      value: totalItems.toString(),
      color: '#f59e0b'
    },
    {
      icon: <TrendingIcon />,
      label: 'Valor Médio',
      value: `R$ ${(totalValue / totalItems || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      color: '#ef4444'
    }
  ]

  const recentItems = items.slice(0, 5)

  return (
    <Box>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 'bold'
          }}
        >
          📊 Dashboard
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
        >
          Visão geral das suas coleções
        </Typography>
      </Box>

      {/* Stats Grid - CORREÇÃO PRINCIPAL */}
      <Grid container spacing={2} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
            <Card sx={{ 
              flex: 1,
              transition: 'transform 0.2s', 
              '&:hover': { transform: 'translateY(-2px)' } 
            }}>
              <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                p: { xs: 2, sm: 2.5 }
              }}>
                <Avatar 
                  sx={{ 
                    bgcolor: stat.color, 
                    width: { xs: 50, sm: 60 }, 
                    height: { xs: 50, sm: 60 } 
                  }}
                >
                  {React.cloneElement(stat.icon, { 
                    sx: { fontSize: { xs: 24, sm: 28 } } 
                  })}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    fontWeight="bold"
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      wordBreak: 'break-word'
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Collections Section */}
        <Grid item xs={12} xl={8}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
              }}
            >
              <CollectionsIcon /> 
              Suas Coleções
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {collections.map((collection) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                lg={4} 
                key={collection.id}
                sx={{ display: 'flex' }}
              >
                <CollectionCard collection={collection} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Items Section */}
        <Grid item xs={12} xl={4}>
          <Card sx={{ position: { xl: 'sticky' }, top: { xl: 100 } }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                <NewIcon /> 
                Itens Recentes
              </Typography>
              
              <List sx={{ p: 0 }}>
                {recentItems.map((item, index) => (
                  <Box key={item.id}>
                    <ListItem 
                      alignItems="flex-start" 
                      sx={{ 
                        px: 0,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' }
                      }}
                    >
                      <ListItemAvatar sx={{ 
                        minWidth: { xs: 'auto', sm: 56 },
                        mb: { xs: 1, sm: 0 }
                      }}>
                        <Avatar 
                          variant="rounded" 
                          src={item.image} 
                          alt={item.name}
                          sx={{ 
                            width: { xs: 48, sm: 56 }, 
                            height: { xs: 48, sm: 56 } 
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ ml: { xs: 0, sm: 2 } }}
                        primary={
                          <Typography 
                            variant="subtitle2" 
                            fontWeight="bold"
                            sx={{ 
                              fontSize: { xs: '0.875rem', sm: '0.9rem' },
                              mb: 0.5
                            }}
                          >
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography 
                              variant="body2" 
                              color="success.main" 
                              fontWeight="bold"
                              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                            >
                              R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </Typography>
                            <Chip 
                              label={item.condition} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{ 
                                mt: 0.5, 
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 20, sm: 24 }
                              }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentItems.length - 1 && (
                      <Divider 
                        variant="inset" 
                        component="li" 
                        sx={{ 
                          ml: { xs: 0, sm: 9 },
                          my: 1 
                        }}
                      />
                    )}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard