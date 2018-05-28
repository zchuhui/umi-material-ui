import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';

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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height:'100%',
    backgroundColor: theme.palette.background.paper,
    borderRight:'1px solid #ddd'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  link:{
    textDecoration: 'none !important', 
  },
  title: {
    height: 64,
    fontSize:22,
    borderBottom:'1px solid #DDD',
    color:'#333',
    padding:'10px'
  },
  logo:{
    float:'left',
    marginTop: 8,
    marginLeft: 30,
    marginRight:10,
    fontSize:30
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
        <List
          component="nav"
          subheader={<ListSubheader component="div" className={classes.title}> <ViewModuleIcon className={classes.logo}/> Material UI</ListSubheader>}
          className={classes.link}
        >
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText inset primary="home" />
            </ListItem>
          </Link>
          <Link to="/page1" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="Page1" />
            </ListItem>
          </Link>
          <Link to="/page2" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Page2" />
            </ListItem>
          </Link>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/404" className={classes.link}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset primary="404" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);