import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'react-sidebar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Input from '@material-ui/core/Input';

import styles from './index.less'
import MenuPage from './Menu'

// root styles
const style = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  input:{
    margin: theme.spacing.unit,
    color:'red',
  }
});

// sidebar styles
const sidebarStyles = {
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  }
}

// 判断窗口是否大于800px
const mql = window.matchMedia(`(min-width: 800px)`);


class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null,

      mql: mql,
      sidebarDocked: props.docked,
      open: props.open,
      sidebarTransitions: false,
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }


  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  render() {

    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    

    return (
      <div className={style.root}>
        <Sidebar
          sidebar={<MenuPage />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.handleSetSidebarOpen}
          transitions={this.state.sidebarTransitions}
          styles={sidebarStyles}
        >

          <div className={styles.layoutContainer}>

            {/* Header */}
            <header className={styles.header}>
              <AppBar position="static" color='primary'>
                <Toolbar>
                  <IconButton color="inherit" aria-label="Menu" onClick={this.handleSetSidebarOpen.bind(this)}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" style={{ flex: 1 }}>Title</Typography>
                  {/* <Input
                    className={styles.inputSearch}
                    placeholder="Search"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  /> */}
                  {auth && (
                    <div>
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      </Menu>
                    </div>
                  )}

                </Toolbar>
              </AppBar>
            </header>

            {/* Content */}
            <div className={styles.main}>
              {
                this.props.children
              }
            </div>

          </div>
        </Sidebar>

      </div>
    );
  }


  // slider open/hide
  handleSetSidebarOpen = (open) => {
    const isMatch = this.state.mql.matches;
    
    if (!isMatch) {
      this.setState({ 
        sidebarTransitions: true,
        sidebarOpen: open==false?false:true 
      });
    }else{
      const docked = this.state.sidebarDocked;
      this.setState({
        sidebarTransitions: true,
        sidebarDocked: !docked
      })
    }
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

export default withStyles(style)(Layout);