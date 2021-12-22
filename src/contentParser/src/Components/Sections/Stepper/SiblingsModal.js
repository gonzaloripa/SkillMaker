import React from 'react'
import {Modal, Button, Select, Input} from 'antd'
import axios from 'axios'
import Formulario from './Formulario'

export default class SiblingsModal extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      criterios:["Ubicacion","Tipo de contenido"],
      criterioItem:""
    }
  }


  showModal(){
    this.setState({
      visible: true,
    });
  }

  handleOk(e){
    console.log(e);
    this.setState({
      visible: false,      
    });

    this.props.confirmContent()
  }

  handleCancel(e){
    console.log(e);
    this.setState({
      visible: false,
      criterioItem:""
    });
    this.props.clearCategory()
  }

  handleCriterio(value){
    this.setState({
      criterioItem:value
    })
    this.props.returnSiblings(value)
  }

  render() {
    const {Option} = Select
    return (
      <div style={{
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex'
      }}> 
          <Button 
            type="primary" 
            onClick={() => this.showModal()} 
            style={{ width: 120, 
              display: "block",     
              marginBottom: "10px"
            }}>
              Select
          </Button>
        
          <Modal
            title="Content"
            visible={this.state.visible}
            onOk={(e) => this.handleOk(e)}
            onCancel={(e) => this.handleCancel(e)}
          >
          <p>Choose selection criteria:</p>
          <Select value={this.state.criterioItem? this.state.criterioItem : undefined} placeholder="Criterio" 
            onChange={(e) => this.handleCriterio(e)} style={{ width: 140, display: "inline-block", margin: "0 auto" }}>
              {this.state.criterios.map( (criterio, index) => {
                return(
                  <Option 
                    key={index}   
                    value={criterio}>
                      {criterio}
                  </Option>
                )
              })}
            </Select>

          <Formulario
            selectCategory={(value) => this.props.selectCategory(value)}
            categories={this.props.categories}
            selectedCategory = {this.props.selectedCategory}
            changeIdentifier = {(e) => this.props.changeIdentifier(e)}
            setNavegable = {(e) => this.props.setNavegable(e)}
          />        
        </Modal>
      </div>
    );
  }

}
