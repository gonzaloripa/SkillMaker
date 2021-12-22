import React from 'react';
import { Button, Spin, Alert } from 'antd';
import Stepper from './Stepper';
import axios from 'axios';
import SemanticForm from './SemanticForm';
import PropertiesScreen from './PropertiesScreen';

export default class SemanticScreen extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      types:[],
      confirmedContent: {},
      selectedType: "",
      identifier:"",
      loading:false,
      done: false,
      errorMessage:null,
      navegable:false,
      showPropertiesScreen:false,
    }
  }

  showPropertiesScreen = () => {
    this.setState({showPropertiesScreen:true})
  }

  render(){
    if (this.state.errorMessage || this.state.done) {
      return(
        <div>
          <div>
            {this.state.errorMessage ? 
                <Alert
                  message="Error"
                  description= {this.state.errorMessage}
                  type="error"
                  showIcon
                />
            : <Alert
                    message="Success"
                    description="The content was successfully added"
                    type="success"
                    showIcon
                  /> 
            }
          </div>
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.showAdmin()}>
            Manage contents
          </Button>
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
            Back
          </Button>          
        </div>
      )
    }
    else{
      return(
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
          <div style={{
            width:"200px",
            height:"430px",
            margin:"20px",  
            display: 'flex',
            flexDirection: 'column'
          }}>
            {this.state.loading && 
              <div className="example-stepper">
                <Spin className="diagram-spin" size="large"/>
              </div>        
            }
            {!this.state.showPropertiesScreen ?
              <SemanticForm
                selectType={(value) => this.selectType(value)}
                types={this.state.types}
                selectedtype = {this.props.selectedType}
                changeIdentifier = {(e) => this.props.changeIdentifier(e)}
                setNavegable = {(e) => this.props.setNavegable(e)}
              />
              :
              <PropertiesScreen
                selectType={(value) => this.selectType(value)}
                types={this.state.types}
                selectedtype = {this.props.selectedType}
                changeIdentifier = {(e) => this.props.changeIdentifier(e)}
                setNavegable = {(e) => this.props.setNavegable(e)}
              />
            }

            <div style={{
              display:'flex',
              height:'400px', 
              flexDirection:'column',
              justifyContent:'flex-end',
            }} >
              { !this.state.showPropertiesScreen &&
                <Button onClick={() => this.showPropertiesScreen()} style={{display:"inline-block", margin: "5px"}}>
                  Add a new property
                </Button>
              }

              <Button onClick={() => this.confirm()} type="primary" style={{display:"inline-block", margin: "5px"}}>
                {!this.state.showPropertiesScreen ?
                  "Confirm type of content"
                  :
                  "Confirm"
                }
              </Button>

              <Button type="danger" style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
                Back
              </Button>
            </div>
          </div>
        </div>
      )
    }
  }

}
