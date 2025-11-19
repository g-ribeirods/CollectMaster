import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions,
} from '@mui/material'
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'

function CollectionCard({ collection }) {

  return (
    <Card sx={{ 
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
    }}>
      <CardMedia
        component="img"
        image={collection.image || `https://via.placeholder.com/300x200/2F4F4F/F5F5DC?text=Sem+Foto`}
        alt={collection.name}
        sx={{ 
          height: 200,
          objectFit: 'cover'
        }}
      />
      
      <CardContent sx={{ 
        flexGrow: 1, 
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        textAlign: 'center',
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
          {collection.name}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip 
            label={collection.category || 'Sem Categoria'} 
            variant="outlined"
            size="medium"
            sx={{ 
              fontSize: '0.85rem',
              height: 32,
              borderColor: '#D4AF37',
              color: collection.category ? '#2F4F4F' : 'rgba(47, 79, 79, 0.6)',
              bgcolor: collection.category ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
            }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            flexGrow: 1,
            color: 'rgba(47, 79, 79, 0.8)',
            minHeight: '2.7rem',
          }}
        >
          {collection.description || 'Sem descrição'}
        </Typography>

        {/* Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          py: 1.5, 
          mt: 'auto',
          borderTop: 1, 
          borderBottom: 1, 
          borderColor: 'rgba(47, 79, 79, 0.2)',
          gap: 1
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
              {collection.itemCount ?? 0}
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
              {collection.value && collection.value > 0 
                ? `R$ ${collection.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : 'R$ 0,00'
              }
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ 
        p: 2,
        gap: 1,
        bgcolor: 'rgba(47, 79, 79, 0.05)',
      }}>
        <Button 
          startIcon={<ViewIcon />} 
          variant="contained" 
          size="small"
          fullWidth
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
          Ver Detalhes
        </Button>
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          width: '100%'
        }}>
          <Button 
            startIcon={<EditIcon />} 
            variant="outlined" 
            size="small"
            fullWidth
            sx={{ 
              fontSize: '0.85rem',
              borderColor: '#2F4F4F',
              color: '#2F4F4F',
              '&:hover': {
                borderColor: '#D4AF37',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
              }
            }}
          >
            Editar
          </Button>
          <Button 
            startIcon={<DeleteIcon />} 
            variant="outlined" 
            size="small"
            fullWidth
            sx={{ 
              fontSize: '0.85rem',
              borderColor: '#d32f2f',
              color: '#d32f2f',
              '&:hover': {
                borderColor: '#c62828',
                bgcolor: 'rgba(211, 47, 47, 0.1)',
              }
            }}
          >
            Excluir
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default CollectionCard