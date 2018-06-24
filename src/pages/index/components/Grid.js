import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

import ChartPolyline from './Chart-polyline'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 50,
    color:'#333'
  },
  paper: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    height: 120,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperHead: {
    position: 'absolute',
    left: 10,
    top: -30,
    width: 100,
    height: 60,
    lineHeight: 3,
    fontSize: 20,
    color: '#fff',
    background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
    textAlign: 'center',
    boxShadow: '0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)'
  },
  paperContent: {
    height: 50,
    marginTop: 30,
    textAlign:'right',
    padding:'10px 30px',

  },
  title:{
    fontSize:30,
  },
  unit:{

  },
  paperFooter:{
    height:30,
    borderTop:'1px solid #eee',
    textAlign:'left',
    fontSize:14,
    lineHeight:2,
    textIndent:5,

  }

})

@withStyles(styles)
class GridPage extends React.Component {
  render() {
    const { classes, overview } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {
            overview && overview.map((item, index) => (
              <Grid item xs={6} sm={3} key={index} >
                <Paper className={classes.paper}>
                  <Paper className={classes.paperHead}>{item.name}</Paper>
                  <div className={classes.paperContent}>
                    <b className={classes.title}>{item.value} </b>
                    <span className={classes.unit}>{item.unit}</span>
                  </div>
                  <div className={classes.paperFooter}>
                    {item.introduction}
                  </div>
                </Paper>
              </Grid>
            ))
          }

          {/* <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <ChartPolyline />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>

        </Grid>
      </div>
    )
  }
}


export default GridPage;
