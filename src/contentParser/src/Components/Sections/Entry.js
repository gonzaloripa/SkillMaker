import React, { Component } from 'react';
import logo from '../../logo.svg';
import {Button, Input, Alert} from 'antd'
import axios from 'axios'

export default class Entry extends Component {

  constructor(props){
    super(props);
    this.state={
      array:[],
      value:1,
      str:"",
      action:"",
      selected:"",
      username:"",
      logueado:false,
      errorLogin:false
    }
  }

  onMessageReceive(e){
    if (typeof e.data === "string"){
      this.setState({str:e.data})
    }
    else{
      this.setState({array:e.data})
    }
  }

  onSelectAction(event){
    var e = document.getElementById("selectAction");
    var valor = e.options[e.selectedIndex].value;

    if(valor==="notice"){
      this.setState({selected:"selectNotice"});
      alert("Ahora arrastre el titulo de una noticia");
    }else{
      this.setState({selected:"selectSection"});
      alert("Ahora arrastre el titulo de una noticia para obtener las hermanas");
    }

    this.setState({action:valor});
    window.parent.postMessage(valor, "*");
  }

  myFunction(event){
    var e = document.getElementById("select");
    this.setState({value:e.options[e.selectedIndex].value});
  }
  componentDidMount(){
    axios.get("https://alexa-apirest.herokuapp.com/users/getSessionName")
    .then((response) =>{
      console.log("Didmount ",response.data);
      if(response.data!= ""){
        this.setState({
          username: response.data,
          logueado: (response.data != "")
        })
      }
    });
    window.parent.postMessage({"mge":"hideMask"}, "*")
    window.addEventListener('message', (e) => this.onMessageReceive(e));
  }

  cerrarSesion(){
    axios.get("https://alexa-apirest.herokuapp.com/users/closeSession")
    .then((response) =>{
      console.log(response.data);
      this.setState({
        username: "",
        logueado:false
      });
    });

  }

  changeUser = (e) => {
    console.log("Username ",e.target.value)
    this.setState({
      username:e.target.value
    })
  }

  registro(){
    axios.post("https://alexa-apirest.herokuapp.com/users/newUser",{name:this.state.username})
    .then((response) =>{
      console.log(response);
      this.setState({
        logueado:true
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  login(){
    axios.get("https://alexa-apirest.herokuapp.com/users/getUser/" + this.state.username)
    .then((response) =>{
      console.log("Login response ",response);
      this.setState({
        logueado:true,
        errorLogin:false
      })
    }).catch((e) => {
      this.setState({
        errorLogin:true
      })
      console.log(e)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{color:"white"}}>SkillMaker</h1>
        </header>
        
        { (this.state.username != "" && this.state.logueado == true ) &&
        <div className='ButtonsWrapper' >

          <Alert
                message={"Welcome "+this.state.username}
                type="success"
          />
          <Button style={{marginTop:30}} className='buttons' onClick={() => this.props.changeSection("stepper")}>
            Create default content
          </Button>

          <Button className='buttons' onClick={() => this.props.changeSection("semantic")}>
            Create semantic content
          </Button>

          <Button className='buttons' onClick={() => this.props.showAdmin()}>
            Open contents admin
          </Button>

          <Button style={{marginTop:70}}
            ghost
            type="danger"           
            className='buttons'
            onClick={() => this.cerrarSesion()}>
              Log out
          </Button>

        </div>
        }

        { (this.state.logueado == false) &&
          <div>
            {(this.state.logueado == false && this.state.errorLogin == true) &&
            <Alert
                message={"No existe ningun usuario con ese nombre"}
                type="error"
            />
            }

            <Input placeholder="Ingresar nombre de usuario" 
                  onChange={(e) => this.changeUser(e)} 
                  style={{display:"inline-block", width: "150px", margin: "10px"}}/>

            <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.login()}>
              Login
            </Button>

          </div>
        }
      </div>
    );
  }
}
