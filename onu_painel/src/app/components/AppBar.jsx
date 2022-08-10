import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.currentUser);
  const accessToken = useSelector((state) => state.session.accessToken);
  const loading = useSelector((state) => state.session.loading);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleNavigate(route, event) {
    event?.preventDefault();
    navigate(route);
  }

  function handleLogout(event) {
    event?.preventDefault();
    handleCloseUserMenu();
    navigate('/logout');
  }

  function handleProfile(event) {
    event?.preventDefault();
    handleCloseUserMenu();
    navigate('/profile');
  }

  let sessionLinks;
  if (accessToken) {
    sessionLinks =
      <Box sx={{ flexGrow: 0 }}>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Typography
            marginRight={2}
            marginTop={1}
            textAlign="center"
          >
            {currentUser?.email}
          </Typography>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={(event) => handleProfile(event)}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>

          <MenuItem onClick={(event) => handleLogout(event)}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>;
  } else if (!accessToken && !loading) {
    sessionLinks =
    <>
      <Button
        onClick={(event) => handleNavigate("/signup", event)}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Create Account
      </Button>

      <Button
        onClick={(event) => handleNavigate("/login", event)}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Login
      </Button>
    </>
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            ONU Occurrence Painel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  onClick={(event) => handleNavigate("/", event)}
                  sx={{ color: 'black', display: 'block' }}
                >
                  <Typography textAlign="center">Onu Board</Typography>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  onClick={(event) => handleNavigate("/heroes", event)}
                  sx={{ color: 'black', display: 'block' }}
                >
                  <Typography textAlign="center">Heroes</Typography>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  onClick={(event) => handleNavigate("/threats", event)}
                  sx={{ color: 'black', display: 'block' }}
                >
                  <Typography textAlign="center">Threats</Typography>
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap={false}
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            ONU Occurrence Painel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={(event) => handleNavigate("/", event)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Typography textAlign="center">Onu Board</Typography>
            </Button>

            <Button
              onClick={(event) => handleNavigate("/heroes", event)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Typography textAlign="center">Heroes</Typography>
            </Button>

            <Button
              onClick={(event) => handleNavigate("/threats", event)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Typography textAlign="center">Threats</Typography>
            </Button>
          </Box>

          {sessionLinks}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
