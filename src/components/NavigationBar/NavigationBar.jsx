/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Avatar,
  Drawer,
  Button,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import useStyles from './styles';

function NavigationBar() {
  // useStyles() returns an object with the styles for mui
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const isAuthenticated = true;
  const isMobileDev = useMediaQuery('(max-width:600px)');

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {/* Only show MobileNavMenu if it max-width:600 */}
          {isMobileDev && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          {/* Darkmode/LightMode */}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobileDev && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {}}
                component={Link}
                to="/profile/:id"
                className={classes.linkButton}
              >
                {!isMobileDev && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile Picture"
                  src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                />
              </Button>
            )}
          </div>
          {isMobileDev && 'Search...'}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobileDev ? (
            <Drawer
              variant="temporary"
              anchor="right"
              classes={{ paper: classes.drawerPaper }}
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default NavigationBar;
