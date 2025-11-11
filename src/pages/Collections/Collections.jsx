import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import CollectionCard from '../../components/CollectionCard/CollectionCard'

function Collections({ collections, setCollections }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [openDialog, setOpenDialog] = useState(false)
  const [newCollection, setNewCollection] = useState({
    name: '',
    category: '',
    description: '',
    value: 0
  })

  const categories = [
    'Brinquedos',
    'Numismática',
    'Música',
    'Arte',
    'Livros',
    'Selos',
    'Cartões',
    'Outros'
  ]

  const handleAddCollection = () => {
    const collection = {
      id: collections.length + 1,
      ...newCollection,
      itemCount: 0,
      image: `https://via.placeholder.com/300x200/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${encodeURIComponent(newCollection.name)}`,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setCollections([...collections, collection])
    setOpenDialog(false)
    setNewCollection({ name: '', category: '', description: '', value: 0 })
  }

  return (
    <Box sx={{ px: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 4 
      }}>
        <Box>
          <Typography variant={isMobile ? "h3" : "h1"} gutterBottom>
            📚 Coleções
          </Typography>
          <Typography variant={isMobile ? "body1" : "h6"} color="text.secondary">
            Gerencie todas as suas coleções
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          size={isMobile ? "medium" : "large"}
          fullWidth={isSmallMobile}
        >
          Nova Coleção
        </Button>
      </Box>

      {/* Collections Grid */}
      <Grid container spacing={2}>
        {collections.map((collection) => (
          <Grid item xs={12} sm={6} lg={4} key={collection.id}>
            <CollectionCard collection={collection} />
          </Grid>
        ))}
      </Grid>

      {/* Add Collection Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isSmallMobile}
      >
        <DialogTitle>Adicionar Nova Coleção</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nome da Coleção"
              value={newCollection.name}
              onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
              fullWidth
              size={isSmallMobile ? "small" : "medium"}
            />
            <TextField
              select
              label="Categoria"
              value={newCollection.category}
              onChange={(e) => setNewCollection({ ...newCollection, category: e.target.value })}
              fullWidth
              size={isSmallMobile ? "small" : "medium"}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Descrição"
              value={newCollection.description}
              onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
              multiline
              rows={isSmallMobile ? 2 : 3}
              fullWidth
              size={isSmallMobile ? "small" : "medium"}
            />
            <TextField
              label="Valor Inicial"
              type="number"
              value={newCollection.value}
              onChange={(e) => setNewCollection({ ...newCollection, value: parseFloat(e.target.value) || 0 })}
              fullWidth
              size={isSmallMobile ? "small" : "medium"}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpenDialog(false)} 
            size={isSmallMobile ? "small" : "medium"}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleAddCollection} 
            variant="contained"
            disabled={!newCollection.name || !newCollection.category}
            size={isSmallMobile ? "small" : "medium"}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Collections