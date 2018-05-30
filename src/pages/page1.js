
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import intl from 'react-intl-universal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import en_US from '../locales/en_US';
import zh_CN from '../locales/zh_CN';

const locales = {
  "en-US": en_US,
  "zh-CN": zh_CN
};

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class Page1 extends React.Component {

  state = {
    initDone: false,
    translate: 'English',
  }

  componentDidMount() {
    this.loadLocales('en-US');
  }


  render() {
    const { classes } = this.props;

    return (<div>
      <h2>使用 <b>react-intl-universal</b> 实现国际化</h2>
      <br />

      <Select
        value={this.state.translate}
        onChange={this.handleTranslate}
        inputProps={{
          name: 'translate',
          id: 'translate-simple',
        }}
      >
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="中文">中文</MenuItem>
      </Select>
      <br /><br />

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          intl.get
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              {intl.get('hello')}
            </div>
          }
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          intl.getHTML
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              {intl.getHTML('TIP')}
            </div>
          }
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          defaultMessage
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              <div>
                {intl.get('not-exist-key').defaultMessage('default message')}
              </div>
              
              <div>
                {/* or */}
                {intl.get('not-exist-key').d('default message')}
              </div>

              <div>
                {/* or */}
                {intl.getHTML('not-exist-key').d(<div>hello</div>)}
              </div>
            </div>
          }
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Message With Variables
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              {intl.get('name', { name: 'Tony', where: 'Alibaba' })}
            </div>
          }
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          货币
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              {intl.get('SALE_PRICE', { price: 123456.78,number:10 }) }
            </div>
          }
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          日期
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              {intl.get('SALE_START', { start: new Date() })}
              <div>
                {intl.get('SALE_END', { end: new Date() })}
              </div>
            </div>
          }
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          时间
        </Typography>
        <Typography component="div">
          {
            this.state.initDone &&
            <div>
              {intl.get('COUPON', { expires: new Date() })}
            </div>
          }
        </Typography>
      </Paper>
      

    </div>)
  }

  loadLocales = (lan) => {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl.init({
      currentLocale: lan, // TODO: determine locale here
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }

  handleTranslate = (event) => {
    const language = event.target.value;
    this.setState({
      [event.target.name]: language,
    });

    if (language !== "中文") {
      this.loadLocales('en-US')
    } else {
      this.loadLocales('zh-CN')
    }



  }
}

export default withStyles(styles) (Page1);