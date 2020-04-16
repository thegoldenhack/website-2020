import { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Route } from "react-router-dom";
import LoginPage from "../LoginPage";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
};

const UserPool = new CognitoUserPool(poolData);



class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      confirmpassword: undefined,
      termsandconditions: undefined
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var attributeList = [];
    var dataEmail = {
      Name: 'email',
      Value: this.state.email
    };
    var dataPersonalName = {
      Name: 'name',
      Value: this.state.firstname
    };
    var dataFamilyName = {
      Name: 'family_name',
      Value: this.state.lastname
    };
    attributeList.push(dataEmail);
    attributeList.push(dataPersonalName);
    attributeList.push(dataFamilyName);

    UserPool.signUp(this.state.firstname, this.state.password, attributeList, null, (err, data) => {
      if (err) {
        document.getElementById("display_error").innerHTML = err.message;
        document.getElementById("display_error").style.color = "#ff0000";
      }
    });
  }
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#EEEEEE", margin: "auto", borderRadius: "16px", overflow: "hidden", boxShadow: " 0 19px 38px rgba(0, 0, 0, 0.30), 0 5px 5px rgba(0, 0, 0, 0.22)" }}>
          <div style={{ backgroundColor: "#EEEEEE", display: "flex", justifyContent: "center", alignItems: "center", padding: "50px" }}>
            <style type="text/css"> 
              {`
                .form-control {
                  background-color: #C4C4C4;
                  color: black;
                  border-radius: 16px;
                }
                .form-control:focus{
                  background-color: #C4C4C4;
                  color: black;
                }
                body {
                  margin: 0;
                  display: flex;
                  flex-direction: column;
                  background-color: #C5CFEA;
                  height: 100%;
                  justify-content: center;
                  align-items: center;
                  background-image: linear-gradient(#087a99, #053E5E);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                }
              html { height: 100%; }
              svg {
                max-height: 100%;
              }
              .submit-btn{
                width: 100%;
                border-radius: 16px;
                background-color: #18CF52;
              }
              .info {
                padding: 20px 40px 20px 40px;
                justify-content: center;
                align-items: center;
                
              }
              .logo {
                padding: 0px 0px 0px 0px;
              }
              .form-box{
                padding: 20px 40px 20px 40px;
                text-align: center;
              }
          `}
            </style>
            <div className="info">
              <div>
                <embed className="logo" src={"/images/logo/logo_dark.svg"} alt={"The GoldenHack Logo"}></embed>
              </div>
              <p>
                <i>Already a member of GoldenHack? <a href="/login">Login Here</a></i>
              </p>
            </div>
            <div className="form-box">
              <Form className="inputForm">
                <Form.Label style={{ fontSize: "2rem" }} ><b>Register</b></Form.Label>
                <Form.Group controlId="inputForm.firstname">
                  {/* <Form.Label>First Name</Form.Label> */}
                  <Form.Control
                    required
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="inputForm.lastname">
                  {/* <Form.Label>Last Name</Form.Label> */}
                  <Form.Control
                    required
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="inputForm.email">
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="inputForm.password">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    name="password"
                    required
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="inputForm.password">
                  {/* <Form.Label>Confirm Password</Form.Label> */}
                  <Form.Control
                    name="confirm password"
                    required
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="inputForm.termsandconditions">
                  {/* <Form.Control
              name="termsandconditions"
              required
              type="text"
              placeholder=""
              onChange={this.handleChange}
            /> */}
                  <Form.Check
                    inline
                    disables
                    className="terms-acc"
                    label="I accept the terms and conditions"
                    type="checkbox"
                    id="yesTC"
                  />
                  {/* <Form.Label>Do you aceept the terms and conditions?</Form.Label> */}

                  {/* <Form.Check inline disables label="No" type="radio" id="noTC" /> */}
                </Form.Group>

                <Button
                  className="submit-btn"
                  variant="success"
                  type="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Register
              </Button>

                <Route path="/login">
                  <LoginPage />
                </Route>
              </Form>
            </div>
          </div>
          <div className="display-error" id="display_error" style={{}}></div> 
        </div>
      </div>
    );
  }
}

export default RegisterPage;
