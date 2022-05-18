import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
//import emailjs from '@emailjs/browser';
import emailjs from "emailjs-com";


import { form } from "react/lib/ReactDOMFactories";

export default class Form extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailAdressError: "",
    phoneNumber: "",
    phoneNumberError: "",
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  emailValidation = () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regex.test(this.state.email) === false){
        return false;
    }
    return true;
}



  validate = () => {
    let isError = false;
    var letters = /^[A-Za-z]+$/;
    var numbers = /^\d{10}$/;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      emailAdressError: "",
      phoneNumberError: "",
    };
    if(!this.state.firstName){
      isError = true;
      errors.firstNameError = 'Please fill first name field'
    }
    else if(this.state.firstName.length < 2){
        isError = true;
        errors.firstNameError = 'First name needs to be atleast 2 characters'
    }
    else if(!this.state.firstName.match(letters)){
      isError = true;
      errors.firstNameError = 'First name should contain only alphabet letters'
    }

    if(!this.state.firstName){
      isError = true;
      errors.lastNameError = 'Please fill last name field'
    }
    else if(this.state.lastName.length < 2){
      isError = true;
      errors.lastNameError = 'Last name needs to be atleast 2 characters'
    }
    else if(!this.state.firstName.match(letters)){
      isError = true;
      errors.lastNameError = 'Last name should contain only alphabet letters'
    }

    if(!this.state.email){
      isError = true;
      errors.emailAdressError = 'Please fill an email';
    }
    else if(!this.emailValidation()){
      isError = true;
      errors.emailAdressError = 'Please enter valid email';
    }

    if(!this.state.phoneNumber){
      isError = true;
      errors.phoneNumberError = 'Please enter phone nubmer';
    }
    else if(!this.state.phoneNumber.match(numbers)){
      isError = true;
      errors.phoneNumberError = 'Phone number should contain only 10 numbers'
    }

     this.setState(errors)

    return isError;
  }

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    const err = this.validate();
    if(!err){
      emailjs.send('service_r40iozc', 'template_aeu6rbg', this.state, 'XbAejuWeLghtlUwza')
      .then(response => {
        console.log('SUCCESSS');
         //<Alert severity="success">This is a success alert — check it out!</Alert>
         
      });

    this.setState({
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailAdressError: "", 
      phoneNumber: "",
      phoneNumberError: ""
    });
    this.props.onChange({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: ""
    });
    <div className="success" style={{ color: "green" }}>Form submitted successfully</div>
  }
  };


  render() {
    return (
      
      <form >
        <h1 style={{ fontSize: "40px" }}> Jones form </h1>
        
        <TextField
          name="firstName"
          hintText="First name"
          floatingLabelText="First name"
          value={this.state.firstName}
          onChange={e => this.change(e)}
          errorText={this.state.firstNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
          value={this.state.lastName}
          onChange={e => this.change(e)}
          errorText={this.state.lastNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="email"
          hintText="Email"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={e => this.change(e)}
          errorText={this.state.emailAdressError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="phoneNumber"
          hintText="Phone number"
          floatingLabelText="Phone number"
          value={this.state.phoneNumber}
          onChange={e => this.change(e)}
          errorText={this.state.phoneNumberError}
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)}  primary />
      </form>
    );
  }



}



