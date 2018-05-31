import React from 'react';
import { FormattedMessage } from 'react-intl';
import intl from 'react-intl-universal';

class Index extends React.Component {
  state = {
    name: 'Gary'
  }

  render() {
    return (
      <div>{/* 
        <FormattedMessage
          id='superHello'
          tagName='div'
          description='say hello to Howard.'
          defaultMessage='Hello, {someone}'
          values={{ 'someone': this.state.name }}
        /> 
        6 */}
        {
          intl.get('hello')
        }
      </div>)
  }
}

export default Index;