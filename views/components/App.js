import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col,FormGroup,Checkbox, Button } from 'react-bootstrap';
import $ from 'jquery'

const REST_API_URL = "/register";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      registerUser: {
        fname:'',
        lname:'',
        email:'',
        password:'',
        contact:'',
        acquisition_medium:''
      },
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addRecord = this.addRecord.bind(this);
  }
  getInitialState() {
    return {
      registerUser: {},
    };
  }

  addRecord() {
    console.log("add record");
      if(!this.state.registerUser.confirm){
        alert("Please agree on terms to continue.");
      }
      else {
        $.ajax({
          url: REST_API_URL,
          dataType: 'json',
          type: 'POST',
          data : {
          	"fname": this.state.registerUser.fname,
            "lname": this.state.registerUser.lname,
            "email": this.state.registerUser.email,
            "contact": this.state.registerUser.contact,
            "acquisition_medium": this.state.registerUser.acquisition_medium,
            "password": this.state.registerUser.password
          },
          success: function(data) {
            if (data){
              console.log(data);
              console.log("A record has been added succesfully");
            }else{
              console.log("Recordcould not be added.");
            }

          },
          error: function(xhr, status, err) {
            console.error(REST_API_URL, status, err.toString());
          }
        });
      }
  }


  handleUpdate(event) {
    var registerUser = this.state.registerUser;
    const parameter = event.target.id;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if(!registerUser)  registerUser = {};
    if(parameter === "confirm") {
      registerUser[parameter] = value;
    }
    else {
      registerUser[parameter] = value.trim();
    }
    this.setState({ registerUser: registerUser });
  }


  render() {
    return (
      <div className="App">
            <Col md={12} className="spacing">
              <input type="text" id="fname" required placeholder="First Name" onChange={this.handleUpdate} value = {this.state.fname}/>
              <input type="text" id="lname" placeholder="Last Name" onChange={this.handleUpdate} value = {this.state.lname} style={{marginLeft: 10}}/>
            </Col>
            <Col md={12} className="spacing">
              <input id="email" type="email" required placeholder="Email Id" onChange={this.handleUpdate} value= {this.state.email} />
            </Col>
            <Col md={12} className="spacing">
              <input id="password" type="text" required placeholder="Password" onChange={this.handleUpdate} value= {this.state.password} />
            </Col>
            <Col md={12} className="spacing">
              <input id="cnf_password" type="text" required placeholder="Confirm Password" onChange={this.handleUpdate} value={this.state.cnf_password} />
            </Col>
            <Col md={12} className="spacing">
              <input id="contact" type="text" required placeholder="Contact Number" onChange={this.handleUpdate} value={this.state.contact} />
            </Col>
            <Col md={12} className="spacing">
              <input id="acquisition_medium" required type="text" placeholder="How did you come to know?" onChange={this.handleUpdate} value={this.state.acquisition_medium} />
            </Col>
            <FormGroup>
             <Checkbox inline className="spacing" id="confirm" onChange={this.handleUpdate} value={this.state.confirm}>I agree to the terms and conditions of Reinvent.AI</Checkbox>{' '}
            </FormGroup>
            <Button type="submit" className="spacing" onClick={this.addRecord}>Submit</Button>
      </div>
    );
  }
}

export default App;
