import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Translate from '@material-ui/icons/Translate';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
  input: {
    margin: theme.spacing.unit,
    color: 'red',
  }
});


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null,
    }

  }

  render() {
    const { 
      title,
      handleSetSidebarOpen, 
      handleTranslate
    } = this.props;
    
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={style.root}>
        {/* Header */}
        <header>
          <AppBar position="static" color='primary'>
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu" onClick={handleSetSidebarOpen}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" style={{ flex: 1 }}>{title}</Typography>

              <div>
                <IconButton
                  aria-owns={null}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleTranslate}
                >
                  <Translate />
                </IconButton>
              </div>

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
      </div>
    );
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


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Header);