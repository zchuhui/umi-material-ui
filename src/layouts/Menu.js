import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { FormattedMessage } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import HomeIcon from '@material-ui/icons/Home';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';



const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link: {
    textDecoration: 'none !important',
  },
  title: {
    height: 64,
    fontSize: 22,
    borderBottom: '1px solid #DDD',
    color: '#333',
    padding: '10px'
  },
  logo: {
    float: 'left',
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 30
  },
  icon: {
    fontSize: 20,
    color: '#999'
  }
});

class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (

      <div className={classes.root}>
        {/* <MuiThemeProvider theme={theme}> */}
        <List
          component="nav"
          subheader={
            <ListSubheader component="div" className={classes.title}>
              <ViewModuleIcon className={classes.logo} /> Material UI
              </ListSubheader>
          }
          className={classes.link}
        >
          <Link to="/" className={classes.link} color="primary">
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText inset
                primary={
                  <FormattedMessage
                    id='menus.home'
                    defaultMessage='home'
                  />
                }
              />
            </ListItem>
          </Link>
          <Link to="/users" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset
                primary={
                  <FormattedMessage
                    id='menus.users'
                    defaultMessage='Users'
                  />
                }
              />
            </ListItem>
          </Link>
          <Link to="/universal" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset
                primary={
                  <FormattedMessage
                    id='menus.universal'
                  />
                }
              />
            </ListItem>
          </Link>
          <Link to="/page1" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset
                primary={
                  <FormattedMessage
                    id='menus.page1'
                    defaultMessage='Page1'
                  />
                }
              />
            </ListItem>
          </Link>
          <Link to="/page2" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset
                primary={
                  <FormattedMessage
                    id='menus.page2'
                    defaultMessage='Page2'
                  />
                }
              />
            </ListItem>
          </Link>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon className={classes.icon}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset
              primary={
                <FormattedMessage
                  id='menus.inbox'
                  defaultMessage='InBox'
                />
              }
            />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/404" className={classes.link}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon className={classes.icon}>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset primary="404" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
        {/* </MuiThemeProvider> */}
      </div>

    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);