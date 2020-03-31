import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, Route} from 'react-router-dom';
import ForgotPasswordPageChange from '../ForgotPasswordPageChange/index';

var requirements = {
  email: undefined,
  password: undefined,
}

class ForgotPasswordPageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: undefined
    }
  }

  handleChange = event => {

    const info = event.target.name;
    const value = event.target.value;

    this.setState({
        [info]: value
      }
    );
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    requirements.code = this.state.code;
    console.log(this.state);
  }
    render() {
        return (
            <Form className="inputForm">
              <Form.Group controlId="inputForm.code">
                <Form.Label>Recovery Code</ Form.Label>
                <Form.Control
                required
                name = "code"
                type="text"
                placeholder=""
                onChange={this.handleChange}
                />
              </ Form.Group>
                <Button className="move=btn" variant="success" type="submit" onClick={this.handleSubmit.bind(this)}>
                  <Link className="btn-link" to="/forgotpassword">Reset Password</Link>
                </Button>
                <Route path="/ForgotPasswordPageChange">
                  <ForgotPasswordPageChange />
                </Route>
            </ Form>
        );
    }
}

export { requirements };
export default ForgotPasswordPageInput;
