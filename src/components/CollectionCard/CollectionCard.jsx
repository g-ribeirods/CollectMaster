import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'

function CollectionCard({ collection }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card sx={{ 
      width: '100%',
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
      }
    }}>
      <CardMedia
        component="img"
        image={collection.image}
        alt={collection.name}
        sx={{ 
          height: { xs: 140, sm: 160, md: 180 },
          objectFit: 'cover'
        }}
      />
      
      <CardContent sx={{ 
        flexGrow: 1, 
        p: { xs: 1.5, sm: 2 },
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            lineHeight: 1.3,
            fontWeight: 600
          }}
        >
          {collection.name}
        </Typography>
        
        <Box>
          <Chip 
            label={collection.category} 
            color="secondary" 
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              height: { xs: 24, sm: 32 }
            }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            lineHeight: 1.4,
            flexGrow: 1
          }}
        >
          {collection.description}
        </Typography>

        {/* Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          py: 1.5, 
          mt: 'auto',
          borderTop: 1, 
          borderBottom: 1, 
          borderColor: 'divider',
          gap: 1
        }}>
          <Box textAlign="center" sx={{ flex: 1 }}>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              display="block"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
            >
              Itens
            </Typography>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
              }}
            >
              {collection.itemCount}
            </Typography>
          </Box>
          <Box textAlign="center" sx={{ flex: 1 }}>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              display="block"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
            >
              Valor
            </Typography>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              color="success.main"
              sx={{ 
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
              }}
            >
              R$ {collection.value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ 
        p: { xs: 1, sm: 1.5, md: 2 },
        gap: 1,
        flexWrap: 'wrap'
      }}>
        <Button 
          startIcon={<ViewIcon />} 
          variant="contained" 
          size="small"
          fullWidth={isMobile}
          sx={{ 
            minWidth: isMobile ? '100%' : 'auto',
            fontSize: { xs: '0.75rem', sm: '0.8rem' }
          }}
        >
          Ver Detalhes
        </Button>
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          width: isMobile ? '100%' : 'auto'
        }}>
          <Button 
            startIcon={<EditIcon />} 
            variant="outlined" 
            size="small"
            fullWidth={isMobile}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
          >
            Editar
          </Button>
          <Button 
            startIcon={<DeleteIcon />} 
            variant="outlined" 
            color="error" 
            size="small"
            fullWidth={isMobile}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
          >
            Excluir
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default CollectionCard