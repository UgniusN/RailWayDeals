import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TrainIcon from '@material-ui/icons/Train';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import './Application.css';
import AppsIcon from '@material-ui/icons/Apps';
import ContolPanel from '../../pages/ControlPanel/ControlPanel';
import Profile from '../../pages/Profile/Profile'
import Login from '../../pages/Login/Login'
import Mytravels from '../../pages/MyTravels/MyTravels'
import {setCredentials} from "../../Api";
import {UserContext} from "../../App";
import {useContext} from "react";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EditTravel from '../../pages/ControlPanel/EditTravel/EditTravel'
import TravelTicket from '../../pages/TravelTicket/TravelTicket'
import { useTranslation } from 'react-i18next';


import TravelList from '../../pages/Travels/TravelList'
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Register from '../../pages/Register/Register';
import OrderConfirmation from '../../pages/OrderConfirmation/OrderConfirmation';
import Home from '../../pages/Home/Home'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const {logout, loggedIn} = useContext(UserContext)

  const{user} = useContext(UserContext)

  const logoutClick = (e) => {
    e.preventDefault()
    setCredentials(null)
    logout()
}

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {i18n} = useTranslation();

  const changeLanguage = lang => e => {
      e.preventDefault();
      i18n.changeLanguage(lang);
  }

  const {t} = useTranslation("navigation")
  

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
       style={{
         backgroundColor:"#272C34"}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Railway
          </Typography>
          <div>
          <a href="#" onClick={changeLanguage('lt')} className="lang">LT</a>
                        &nbsp;
                        <a href="#" onClick={changeLanguage('en')} className="lang">EN</a>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Link to="/" className={classes.Link}>
        <ListItem button key='Home'>
            <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary={t("home")} />
            </ListItem>
            </Link>
            <Link to="/travels" className={classes.Link}>
            <ListItem className={classes.link} button key='Travels'>
            <ListItemIcon><TrainIcon/></ListItemIcon>
              <ListItemText primary={t("travels")} />
            </ListItem>
            </Link>
        </List>
        <Divider />
        <List>
        {
            loggedIn() ?
            <Link to="/mytravels" className={classes.Link}>
              <ListItem  button key='Mytravels'>
                <ListItemIcon>
                  <ConfirmationNumberIcon/>
                </ListItemIcon>
                <ListItemText primary={t("mytravels")} className="text-link"/>
              </ListItem>
            </Link> : null
        }


            {
            loggedIn() && user.roles.includes("ADMIN") ?
            <Link to="/controlpanel" className={classes.Link}>
              <ListItem className={classes.link} button key='Log Out'>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={t("controlpanel")}/>
              </ListItem>
            </Link> : null
            }

            {!loggedIn() ? 
            <Link to="/login" className={classes.Link}>
              <ListItem className={classes.link} button key='Log in'>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary={t("login")}/>
              </ListItem>
            </Link> : 
              <Link className={classes.Link} onClick={logoutClick}>
                <ListItem className={classes.link} button key='Log Out'>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("logout")}/>
                </ListItem>
              </Link>}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.root}>
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <PrivateRoute path="/controlpanel" role="ADMIN">
              <ContolPanel />
            </PrivateRoute>

            <PrivateRoute exact path="/profile" role="ADMIN">
              <Profile />
            </PrivateRoute>

            <Route path="/login" component={Login}>
              <Login />
            </Route>

            <Route exact path="/travels">
              <TravelList />
            </Route>

            <PrivateRoute exact path="/mytravels">
              <Mytravels />
            </PrivateRoute>
            
            <Route path="/register">
              <Register />
            </Route>

            <PrivateRoute exact path="/travels/:id">
              <OrderConfirmation/>
            </PrivateRoute>

            <PrivateRoute exact path="/mytravels/:id">
              <TravelTicket/>
            </PrivateRoute>
        </Switch>
        
      </div>
      </main>
    </div>
    </Router>
    );
}