import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SocialUserCard from './SocialUserCard';
import { getAllUsers } from '../../../services/userService';

const SocialUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      // Filtrar o usuário atual (opcional, se necessário)
      setUsers(allUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Carregando usuários...
        </Typography>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 3,
          borderRadius: 3,
          border: '2px dashed #D4AF37',
          bgcolor: 'rgba(255, 251, 217, 0.1)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#F5F5DC',
            fontWeight: 'bold',
            mb: 1,
          }}
          gutterBottom
        >
          Nenhum usuário encontrado
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(245, 245, 220, 0.8)',
          }}
        >
          Não há outros usuários na plataforma ainda.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: '24px',
        width: '100%',
      }}
    >
      {users.map((user) => (
        <SocialUserCard key={user.id} user={user} />
      ))}
    </Box>
  );
};

export default SocialUserList;

