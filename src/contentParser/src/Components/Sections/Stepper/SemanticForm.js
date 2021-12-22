import React from 'react'
import {Button, Select, Input, Checkbox, List} from 'antd'

const data = [
  'Title',
  'Calification',
  'Content'
];

export default class SemanticForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hideSelect:false,
      selectedItem:""
    }
  }

  hideSelect(e){
    if(e.target.value != ""){
      this.setState({
        hideSelect:true
      })
    }else{
      this.setState({
        selectedItem:"",
        hideSelect:false
      })
    }
    this.props.selectType(e.target.value)
  }

  selectType(value){
    console.log(value)
    this.setState({
      selectedItem:value
    })
    this.props.selectType(value)
  }

  render(){
    const {Option} = Select
    return(
      <div style={{margin:"10px 0px 10px 0px"}}>
        
        <div style={{marginBottom:'10px'}}>
          <h3>Define a type of content:</h3>
           <Input placeholder="New type" 
                onChange={(e) => this.hideSelect(e)} 
                style={{display:"inline-block"}}/>           
           
           <div style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "220px"
            }}>
             <List
                header={<h3 style={{marginBottom:0}}>Defined properties</h3>}
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
             />
           </div>
          {/*this.props.types.length > 0 &&
            <div>
              <p>Defined properties:</p>
              <Select value={this.state.selectedItem? this.state.selectedItem : undefined}  placeholder="Categoria" 
                  onChange={(e) =>this.selectType(e)} style={{ width: 120, display: "inline-block", margin: "0 auto" }}>
                  
                  {this.props.types.map( (type, index) => {
                    return(
                      <Option 
                        key={index} 
                        selected={(this.props.selectedType == type).toString()} 
                        value={type.toString()}>
                          {type.toString()}
                      </Option>
                      )
                    })
                  }
              </Select>
            </div>
          */}            
        </div>
      </div>
    )
  }
}