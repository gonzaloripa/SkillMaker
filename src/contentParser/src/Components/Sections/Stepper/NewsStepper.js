import React from 'react'
import { Button, Spin, Alert } from 'antd';
import Stepper from './Stepper'
import axios from 'axios'

export default class NewsStepper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showSteps: false,
      currentStep: 1,
      confirmedContent: {},
      selectedCategory: "",
      identifier:"",
      loading:false,
      done: false,
      contentSiblings:null,
      errorMessage:null,
      navegable:false
    }
  }

  changeIdentifier(e){
    this.setState({
      identifier: e.target.value
    })
  }

  nextStep(){
    this.setState({currentStep: this.state.currentStep + 1})
  }

  nextTwoSteps(){
    this.setState({currentStep: this.state.currentStep + 2})
  }

  previousStep(){
    this.setState({currentStep: this.state.currentStep -1})
  }

  selectCategory(content,categoria){
    this.setState({
      selectedCategory: categoria
    })
    this.confirmSingleContent(content,categoria)
  }

  clearCategory(){
    this.setState({
      selectedCategory: ""
    })
  }

  setNavegable(e){
    console.log(`checked = ${e.target.checked}`);
    this.setState({
      navegable: e.target.checked
    })
  }
  

  confirmContentSiblings(content,contentSiblings){
    const array = [];
    const contents = {
          navegable: this.state.navegable,
          categoria:this.state.selectedCategory,
          identificador: this.state.identifier.charAt(0).toUpperCase() + this.state.identifier.slice(1).toLowerCase()
        }
    console.log("identifier ",this.state.identifier)
    if(contentSiblings.length > 0){
      contentSiblings.map((path,index)=>{
        const obj = {
            url:content.link.urlPagina,
            xpath:path,
            available:true
        }
        array.push(obj)
      })
    }
    contents.siblings = array;
    this.setState({
      contentSiblings: contents   
    }, console.log(JSON.stringify(this.state.confirmedContent)))
  }

  confirmBeforeSend(){
    let previousConfirmedState = this.state.confirmedContent
    previousConfirmedState.identificador = this.state.identifier.charAt(0).toUpperCase() + this.state.identifier.slice(1).toLowerCase()
    previousConfirmedState.categoria = this.state.selectedCategory
    previousConfirmedState.navegable = this.state.navegable
    this.setState({confirmedContent:previousConfirmedState})
  }

  confirmSingleContent(content,categoria){
      const obj = {
          content:{
            url:content.link.urlPagina,
            xpath:content.link.xpath,
            available:true
          },
          navegable:this.state.navegable,
          categoria:categoria,
          identificador: this.state.identifier
      }
    console.log(this.state.identifier)
    console.log(obj)
    this.setState({
      confirmedContent: obj  
    }, console.log(JSON.stringify(this.state.confirmedContent)))
  }

  confirm(){
  
    this.setState({loading:true})
    this.confirmBeforeSend()
    console.log(this.state)
    if(this.state.contentSiblings){
      if(this.state.contentSiblings.siblings.length > 0){
        axios.post('https://alexa-apirest.herokuapp.com/users/addSiblingContents',
          this.state.contentSiblings)
        .then(() => this.setState({
            loading:false,
            done: true
        }))
      }
    }
    else{
        axios.post('https://alexa-apirest.herokuapp.com/users/addContent',
          this.state.confirmedContent)
        .then(() => this.setState({
            loading:false,
            done: true
        }))
        .catch((e) => {
          this.setState({errorMessage:e.response.data})
        })       
      }   
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
        <div style={{
          width:"210px",
          margin:"20px auto",  
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {this.state.loading && 
            <div className="example-stepper">
              <Spin className="diagram-spin" size="large"/>
            </div>        
          }
          <Stepper
            
            currentStep={this.state.currentStep}
            nextStep={() => this.nextStep()}
            nextTwoSteps={() => this.nextTwoSteps()}
            previousStep={() => this.previousStep()}
            selectCategory={(content,value) => this.selectCategory(content,value)}
            confirmContentSiblings={(content,siblings) => this.confirmContentSiblings(content,siblings)}
            selectedCategory={this.state.selectedCategory}
            changeIdentifier={(e) => this.changeIdentifier(e)}
            selectedIdentifier={this.state.identifier}
            clearCategory = {() => this.clearCategory() }
            setNavegable = {(e) => this.setNavegable(e)}
          />
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
            Back
          </Button>
          {this.state.selectedCategory != "" && this.state.identifier != "" &&
            <div>
              {!this.state.done && 
                <Button onClick={() => this.confirm()}type="danger" style={{display:"inline-block", margin: "5px"}}>
                  Confirm
                </Button>
              }
              <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.showAdmin()}>
                Manage contenidos
              </Button>
            </div>
          }
        </div>
      )
    }
  }

}
