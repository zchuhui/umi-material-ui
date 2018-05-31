import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import intl from 'react-intl-universal';
import Sidebar from 'react-sidebar';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import deepPurple from '@material-ui/core/colors/deepPurple';

import styles from './index.less'
import MenuPage from './Menu'
import Header from './Header'
 
import zh_CN from '../locales/zh_CN'
import en_US from '../locales/en_US'

const locales = {
  "en-US": en_US,
  "zh-CN": zh_CN
};

const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[500] }, // Purple and green play nicely together.
    secondary: { main: deepPurple[500]  }, // This is just green.A700 as hex.
  },
});


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
      // 菜单切换
      mql: mql,
      sidebarDocked: props.docked,
      open: props.open,
      sidebarTransitions: false,
      // 语言切换
      initDone:false,
      translate: 'en',
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  loadLocales = (lan) => {
    const _this = this;
    intl.init({
      currentLocale: lan, // TODO: determine locale here
      locales,
    })
      .then(() => {
      _this.setState({ initDone: true });
      });
  }

  componentDidMount(){
    this.loadLocales('en-US');
  }


  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  // 菜单自适应检测
  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  render() {

    return (
      this.state.initDone &&
      <MuiThemeProvider theme={theme}>
        <div className={style.root}>
          <IntlProvider
            locale={'en'}
            messages={this.state.translate === 'en' ? en_US : zh_CN}
          > 
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
                <Header
                  title="Title"
                  handleSetSidebarOpen={this.handleSetSidebarOpen.bind(this)}
                  handleTranslate={this.handleTranslate}
                />

                {/* Content */}
                <div className={styles.main}>
                  {
                    this.props.children
                  }
                </div>

              </div>
            </Sidebar>

          </IntlProvider>
        </div>
      </MuiThemeProvider>
    );
  }


  // slider open/hide
  handleSetSidebarOpen = (open) => {
    const isMatch = this.state.mql.matches;

    if (!isMatch) {
      this.setState({
        sidebarTransitions: true,
        sidebarOpen: open === false ? false : true
      });
    } else {
      const docked = this.state.sidebarDocked;
      this.setState({
        sidebarTransitions: true,
        sidebarDocked: !docked
      })
    }
  }

  // switch languzage
  handleTranslate = () => {
    if (this.state.translate !== 'en') {
      this.setState({ translate: 'en' })
    } else {
      this.setState({ translate: 'zh' })
    }

  }
}


Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Layout);