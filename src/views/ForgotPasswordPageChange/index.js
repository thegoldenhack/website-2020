import AWS from 'aws-sdk';
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Route } from "react-router-dom";
import LoginPage from "../LoginPage";



class ForgotPasswordPageChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: undefined
    };
  }

  handleChange = event => {
    const { info, value } = event.target;

    this.setState({
      [info]: value
    });
    console.log(this.state);
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#EEEEEE", margin: "auto", borderRadius: "16px", overflow: "hidden", boxShadow: " 0 19px 38px rgba(0, 0, 0, 0.30), 0 5px 5px rgba(0, 0, 0, 0.22)" }}>
          <div style={{ backgroundColor: "#EEEEEE", margin: "0px 200px 0px 200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 0px 100px 0px" }}>
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
            border-radius: 16px;
            background-color: #18CF52;
          }
          .info {
            justify-content: center;
            align-items: center;
            flex-direction: row;
            white-space: nowrap;
            position: relative;
            text-align: center;
          }
          .logo {
            padding: 0px 0px 0px 0px;
            float: left;
            position: absolute;
            left: -120px;
          }
          form{
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            min-width: 500px;
          }

          `}
            </style>
            <div className="info">
              <div>
                <embed width="100" className="logo" src={"/images/logo/logo_dark.svg"} alt={"The GoldenHack Logo"}></embed>
              </div>
              <div>
                <h1 style={{ fontSize: "3rem" }}><b>Reset Password</b></h1>
                <p style={{ fontSize: "1rem" }}>
                  Please enter a new password for your GoldenHack account
            </p></div>
            </div>
            <div className="form-box">
              <Form className="inputForm">
                <Form.Group controlId="inputForm.code">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    required
                    name="password"
                    type="password"
                    placeholder="New password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="inputForm.code">
                  {/* <Form.Label>Confirm Password</Form.Label> */}
                  <Form.Control
                    required
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  className="submit-btn"
                  variant="success"
                  type="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Recover Account
                  {/* <Link className="btn-link" to="/forgotpassword">
                    Change Password
          </Link> */}
                </Button>
                <Route path="/LoginPage">
                  <LoginPage />
                </Route>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPageChange;
