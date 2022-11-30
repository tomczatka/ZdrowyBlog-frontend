import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next'
import { IconButton, Menu, MenuItem, ThemeProvider } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MainTheme from '../themes/MainTheme'
import styles from './styles.module.scss'

export default function Header() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={MainTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Typography variant="h6" sx={{ ":hover":{cursor:'pointer', fontFamily: "Poppins"}, position: 'relative', top: '8px'}} onClick={() => {router.push('/HomePage')}}>
                ZdrowyBlog
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem className={styles.menuItem}
                onClick={() => {
                  router.push('/UserPostsPage')
                }}>
                  Moje posty
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  router.push('/AddPostPage')
                }}>
                  Dodaj nowy post
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  router.push('/Auth/LoginPage'), 
                  deleteCookie('jwt'),
                  deleteCookie('userId')
                }}>
                  Wyloguj się
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}