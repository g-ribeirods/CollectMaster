import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Collections as CollectionsIcon,
  Inventory as ItemsIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useState } from 'react'

function Header({ currentPage, onPageChange }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { key: 'collections', label: 'Coleções', icon: <CollectionsIcon /> },
    { key: 'items', label: 'Itens', icon: <ItemsIcon /> },
  ]

  const NavigationContent = () => (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
      {menuItems.map((item) => (
        <Button
          key={item.key}
          startIcon={!isMobile && item.icon}
          onClick={() => {
            onPageChange(item.key)
            setDrawerOpen(false)
          }}
          sx={{
            color: isMobile ? 'text.primary' : 'white',
            bgcolor: currentPage === item.key 
              ? (isMobile ? 'primary.light' : 'rgba(255,255,255,0.2)') 
              : 'transparent',
            '&:hover': {
              bgcolor: isMobile ? 'primary.light' : 'rgba(255,255,255,0.1)',
            },
            justifyContent: isMobile ? 'flex-start' : 'center',
          }}
          fullWidth={isMobile}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  )

  return (
    <>
      <AppBar 
        position="static" 
        elevation={2}
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          mb: { xs: 2, md: 4 }
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
          py: { xs: 2, sm: 1 }
        }}>
          {/* Logo and Menu Button */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'space-between', sm: 'flex-start' }
          }}>
            {isMobile && (
              <IconButton 
                color="inherit" 
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                🏆 Collect Master
              </Typography>
              {!isMobile && (
                <Chip 
                  label="Gerencie suas coleções" 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                  size="small"
                />
              )}
            </Box>
          </Box>

          {/* Navigation - Desktop */}
          {!isMobile && <NavigationContent />}

          {/* User Info */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}>
            <Avatar sx={{ 
              width: { xs: 32, sm: 40 }, 
              height: { xs: 32, sm: 40 }, 
              bgcolor: 'rgba(255,255,255,0.2)' 
            }}>
              <PersonIcon fontSize={isMobile ? "small" : "medium"} />
            </Avatar>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Colecionador
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            🏆 Collect Master
          </Typography>
          <NavigationContent />
        </Box>
      </Drawer>
    </>
  )
}

export default Header