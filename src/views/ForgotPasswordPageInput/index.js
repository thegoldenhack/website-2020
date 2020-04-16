import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Route } from "react-router-dom";
import ForgotPasswordPageChange from "../ForgotPasswordPageChange";


class ForgotPasswordPageInput extends Component {
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
            position: relative;
            text-align: center;
            max-width: 500px;
          }
          .info>h1{
            white-space: nowrap;
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
                <h1 style={{ fontSize: "3rem" }}><b>Recovery Code</b></h1>
                <p style={{ fontSize: "1rem" }}>
                  Please enter the 6 digit recovery code you recieved in the email to reset your password
            </p></div>
            </div>
            <div className="form-box">
              <Form className="inputForm">
                <Form.Group controlId="inputForm.code">
                  {/* <Form.Label>Recovery Code</Form.Label> */}
                  <Form.Control
                    required
                    name="code"
                    type="text"
                    placeholder="000000"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  className="submit-btn"
                  variant="success"
                  type="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Reset Password
                  {/* <Link className="btn-link" to="/forgotpassword"> 
                    Reset Password
          </Link> */}
                </Button>
                <Route path="/ForgotPasswordPageChange">
                  <ForgotPasswordPageChange />
                </Route>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPageInput;
