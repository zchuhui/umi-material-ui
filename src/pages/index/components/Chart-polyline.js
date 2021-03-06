import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import G2 from '@antv/g2'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const data = [{
  year: '1991',
  value: 3
}, {
  year: '1992',
  value: 4
}, {
  year: '1993',
  value: 3.5
}, {
  year: '1994',
  value: 5
}, {
  year: '1995',
  value: 4.9
}, {
  year: '1996',
  value: 6
}, {
  year: '1997',
  value: 7
}, {
  year: '1998',
  value: 9
}, {
  year: '1999',
  value: 13
}];


class ChartPolyline extends React.Component {

  componentDidMount(){
    this.chartRender(data);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div id="mountNode"></div>
      </div>
    )
  }


  chartRender=(data)=>{
    

    let chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 140,
      padding:10,

    });
    
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });

    chart.axis(false)

    
    chart.render();
  }


}

ChartPolyline.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartPolyline);