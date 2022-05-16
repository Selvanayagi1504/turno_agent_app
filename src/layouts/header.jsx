import * as React from 'react';
import { useState } from 'react'
import Logo from "../assets/images/TurnO.png"
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { sideMenuList } from '../constants/DrawerRouteUtils';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListIcon from '@mui/icons-material/List';
import Avatar from '@mui/material/Avatar';
import {APP_THEME_COLOR} from "../assets/themes/themes"
import  '../assets/css/drawer.css'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function DrawerComponent() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState();

  const navigate = useNavigate()

  React.useEffect(()=>{
    var cookieArr = document.cookie.split(";");
    var data = "", name = "";
    for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if("token" === cookiePair[0].trim()) {
        data = decodeURIComponent(cookiePair[1]);
      }
      if("name" === cookiePair[0].trim()) {
        name = decodeURIComponent(cookiePair[1]);
      }
    }
    if(data.length <= 0){
      navigate('/login');
    }
    if(name.length > 0){
      setName(name)
    }
  },[navigate])

  return (
    // <Box sx={{ display: 'flex' }}>
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon style={{color: APP_THEME_COLOR  }} />
          </IconButton>
          <Avatar sx={{ width: 100 }} src={Logo} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <h2 className="name">{name}</h2>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideMenuList.map((menu, index) => (
            <ListItemButton
              key={menu.name}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              to={menu.path}
              component={Link}
              onClick={handleDrawerClose}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index === 0 && <AddTaskIcon />}
                {index === 1 && <ListIcon />}
              </ListItemIcon>
              <ListItemText primary={menu.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {['Signout'].map((text) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={()=>{
                document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'name=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                navigate('/login')
              }}
            >
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      {/* {
        window.innerWidth < 768
        ?
          <>
            {
              !open &&
              <main>
                <div className="app-bar-margin-top">
                  <Routes>
                      <Route exact path="check-eligibility" element={<CreateLeads />} />
                      <Route  path="customers-list" element={<Leads />} />
                      <Route  path="/customers-list/lead-details" element={<LeadDetails />} />
                  </Routes>
                </div>
              </main>
            }
          </>
        :
          <main>
            <div className="app-bar-margin-top">
              <Routes>
                  <Route exact path="check-eligibility" element={<CreateLeads />} />
                  <Route  path="customers-list" element={<Leads />} />
                  <Route  path="/customers-list/lead-details" element={<LeadDetails />} />
              </Routes>
            </div>
          </main> 
      } */}
    </>
  );
}
