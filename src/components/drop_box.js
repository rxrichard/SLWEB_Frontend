import React from 'react'

import { Box, Message } from './drop_box_styles'

export default class Dropbox extends React.Component {


    closeComponent() {
      window.location.assign('/')
    }

    async componentDidMount(){
        await setTimeout(() => {this.closeComponent()}, 3000);
    }

  render() {
    return (
      <Box color={this.props.color}>
        <Message>{this.props.message}</Message>
      </Box>
    )
  }
}
