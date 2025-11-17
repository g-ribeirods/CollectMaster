import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Container,
  Card, CardActionArea, CardContent,
  // --- Novos imports para o Modal ---
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, FormControlLabel, Checkbox, Slide
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, PhotoCamera } from '@mui/icons-material';

import { useDashboard } from '../../hooks/useDashboard';
// 1. Importe o CollectionCard para mostrar as coleções criadas
import CollectionCard from '../../components/CollectionCard/CollectionCard';

// 2. Transição do Modal (opcional, mas elegante)
const ModalTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 3. O componente visual "burro"
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
}) => (
  <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'grey.100' }}>
    {/* ... (Seu AppBar e Toolbar continuam iguais) ... */}
    <AppBar 
      position="static" 
      elevation={1} 
      sx={{ bgcolor: '#343a40' /* Um cinza escuro */ }}
    >
      <Toolbar>
         <IconButton edge="start" color="inherit" sx={{ mr: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {user?.name ? user.name[0].toUpperCase() : '?'}
          </Avatar>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ mr: 3, fontWeight: 'bold', borderBottom: '2px solid white' }}>
          Suas coleções
        </Typography>
        <Typography variant="h6" component="div" sx={{ mr: 3, color: 'grey.400', cursor: 'pointer' }}>
          Amigos
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    {/* Conteúdo Principal */}
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Suas coleções
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 3 }}>
        
        {/* Card de "Criar coleção" - Agora chama handleOpenCreateModal */}
        <Card 
          sx={{ 
            border: '2px dashed', borderColor: 'grey.400', bgcolor: 'transparent',
            boxShadow: 'none', minHeight: 360, // Altura mínima
          }}
        >
          <CardActionArea 
            onClick={handleOpenCreateModal} // ATUALIZADO
            sx={{ 
              height: '100%', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', color: 'grey.700'
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6" fontWeight="600">
                Criar coleção
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* 4. Renderiza as coleções reais */}
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </Box>
    </Container>

    {/* 5. O MODAL (Dialog) para criar coleção */}
    <Dialog
      open={openCreateModal}
      onClose={handleCloseCreateModal}
      TransitionComponent={ModalTransition}
      PaperProps={{
        sx: {
          bgcolor: '#343a40', // Fundo escuro como na imagem
          color: 'white',
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Nova Coleção
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 300 }}>
        {/* Campo "Nome" */}
        <TextField
          autoFocus
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          InputLabelProps={{ sx: { color: 'grey.400' } }}
          InputProps={{ sx: { color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' } } }}
        />
        
        {/* Botão "Inserir Foto" */}
        <Box textAlign="center">
          <IconButton 
            component="label" // Permite clique para upload de arquivo
            sx={{ 
              border: '2px dashed grey', 
              borderRadius: '50%', 
              width: 150, 
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              color: 'grey.400'
            }}
          >
            <PhotoCamera sx={{ fontSize: 40 }} />
            <Typography variant="caption">inserir foto</Typography>
            <input type="file" hidden />
          </IconButton>
        </Box>

        {/* Checkbox "Pública?" */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <FormControlLabel
            label="Pública"
            control={<Checkbox 
              checked={isPublic} 
              onChange={(e) => setIsPublic(e.target.checked)}
              sx={{ color: 'primary.light' }}
            />}
          />
        </Box>

      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleCloseCreateModal} sx={{ color: 'grey.400' }}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmitCollection} 
          variant="contained"
          disabled={!newCollectionName} // Desabilita se não tiver nome
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
);

// 6. O componente "Pai" (Container) - Nenhuma mudança aqui
const Dashboard = () => {
  const logic = useDashboard();
  
  return <DashboardView {...logic} />;
};

export default Dashboard;