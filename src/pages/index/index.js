import React from 'react';
import { connect } from 'dva';
import GridPage from './components/Grid';

class Index extends React.Component {

  render() {
    const { index } = this.props
    const { overview } = index
    console.log('overview',overview);
    

    const indexProps = {
      overview,
    }
     
    return (<GridPage {...indexProps}/>)
  }
}

export default connect((index) => (index))(Index);

