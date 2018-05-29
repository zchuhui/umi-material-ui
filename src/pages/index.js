import React from 'react';
import { FormattedMessage } from 'react-intl';


class Index extends React.Component {
  state = {
    name: 'Gary'
  }

  render() {
    return (
      <div>
        <FormattedMessage
          id='superHello'
          tagName='div'
          description='say hello to Howard.'
          defaultMessage='Hello, {someone}'
          values={{ 'someone': this.state.name }}
        />
      </div>)
  }
}

export default Index;