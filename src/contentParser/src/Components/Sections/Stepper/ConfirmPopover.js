import React from 'react'
import {Popconfirm} from 'antd'

export default class ConfirmPopover extends React.Component {

render(){
  return(
    <div>
      <Popconfirm
        arrow={false}
        title={this.props.title}
        visible={this.props.statusVisible == "Waiting confirm"}
        onConfirm={() => this.props.confirm()}
        onCancel={() => this.props.cancel()}>
      </Popconfirm>
    </div>
  )
}


}
