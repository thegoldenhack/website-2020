// Application page
import { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Route, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { SchoolsLVpair } from "./schools.js";
import { Majors } from "./majors.js";
import { ethnicity } from "./ethnicity.js";
import { degrees } from "./degrees.js";
import { jwt } from "jsonwebtoken";
import { jwkToPem } from "jwk-to-pem";
import { request } from "request";
var AWS = require("aws-sdk");

let awsConfig = {
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
};

AWS.config.update(awsConfig);
let gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];
function ValidateToken(token) {
  request(
    {
      url: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.REACT_APP_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let pems = {};
        var keys = body["keys"];
        for (var i = 0; i < keys.length; i++) {
          //Convert each key to PEM
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        //validate the token
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          console.log("Not a valid JWT token");
          return;
        }

        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          console.log("Invalid token");
          return;
        }

        jwt.verify(token, pem, function (err, payload) {
          if (err) {
            console.log("Invalid Token.");
          } else {
            console.log("Valid Token.");
            console.log(payload);
          }
        });
      } else {
        console.log("Error! Unable to download JWKs");
      }
    }
  );
}
export default class application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gradDate: null,
      Birthdate: undefined,
      Gender: undefined,
      Ethnicity: undefined,
      School: undefined,
      Degree: undefined,
      Program: undefined,
      Github_URL: undefined,
      LinkedIn_URL: undefined,
      Dribbble_URL: undefined,
      Personal_URL: undefined,
      Link_to_resume: undefined,
      Why_GoldenHack: undefined,
      termsandconditions: undefined,
    };
  }

  handleChangedate = (date) => {
    console.log(localStorage.getItem("accessToken"));
    this.setState({
      Birthdate: date,
    });
  };

  handleChangedateGrad = (date) => {
    this.setState({
      gradDate: date,
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeschool = (School) => {
    this.setState({ School: School });
  };

  handleChangedegree = (Degree) => {
    this.setState({ Degree: Degree });
  };
  handleChangeEthnicity = (Ethnicity) => {
    this.setState({ Ethnicity: Ethnicity });
  };

  handleChangeprograms = (Program) => {
    this.setState({ Program: Program });
  };

  handleChangeGender = (Gender) => {
    this.setState({ Gender: Gender });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.Gender == undefined ||
      this.state.Ethnicity == undefined ||
      this.state.School == undefined ||
      this.state.Degree == undefined ||
      this.state.gradDate == undefined ||
      this.state.Program == undefined
    ) {
      document.getElementById("display_error").innerHTML =
        "Not all required fields have been filled out.";
      return;
    }
    if (!this.state.Github_URL.startsWith("https://www.github.com/")) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
      return;
    }
    if (!this.state.LinkedIn_URL.startsWith("https://www.linkedin.com/in/")) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
      return;
    }
    if (!this.state.Dribbble_URL.startsWith("https://www.dribbble.com/")) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
      return;
    }
    if (!this.state.Link_to_resume.startsWith("https://")) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
      return;
    }
    if (this.state.Why_GoldenHack.length > 1000) {
      document.getElementById("display_error").innerHTML =
        "Over 1000 character limit for 'Why Golden Hack'";
      return;
    }

    let docClient = new AWS.DynamoDB.DocumentClient();
    let input = {
      email: "d", // How do i get the email from JWT
      Birthdate: this.state.Birthdate.toString(),
      Gender: this.state.Gender.value,
      Ethnicity: this.state.Ethnicity.value,
      School: this.state.School.value,
      Degree: this.state.Degree.value,
      Graduation: this.state.gradDate.toString(),
      Program: this.state.Program.value,
      GithubURL: this.state.Github_URL,
      LinkedInURL: this.state.LinkedIn_URL,
      DribbbleURL: this.state.Dribbble_URL,
      PersonalURL: this.state.Personal_URL,
      ResumeURL: this.state.Link_to_resume,
      WhyGoldenHack: this.state.Why_GoldenHack,
      submitted: true,
    };
    var params = {
      TableName: process.env.REACT_APP_DYNAMO_DB_TABLE,
      Item: input,
    };
    docClient.put(params, function (err, data) {
      if (err) {
        document.getElementById("display_error").innerHTML = err;
      } else {
        document.getElementById("display_error").innerHTML =
          "Submitted Successfully";
      }
    });
  };

  render() {
    return (
      <Form className="inputForm">
        <Form.Group controlId="inputForm.firstname">
          <Form.Label>Birthday</Form.Label>
          <br></br>
          <DatePicker
            selected={this.state.Birthdate}
            onChange={this.handleChangedate}
          />
        </Form.Group>

        <Form.Group controlId="inputForm.firstname">
          <Form.Label>Gender</Form.Label>
          <Select
            value={this.state.Gender}
            onChange={this.handleChangeGender}
            options={gender}
          />
        </Form.Group>

        <Form.Label>Ethnicity</Form.Label>
        <Select
          value={this.state.Ethnicity}
          onChange={this.handleChangeEthnicity}
          options={ethnicity}
        />
        <Form.Label>School</Form.Label>
        <Select
          name="schoolOption"
          value={this.state.School}
          onChange={this.handleChangeschool}
          options={SchoolsLVpair}
        />

        <Form.Label>Degree</Form.Label>
        <Select
          value={this.state.Degree}
          onChange={this.handleChangedegree}
          options={degrees}
        />
        <Form.Label>Graduation Year</Form.Label>
        <br></br>
        <DatePicker
          selected={this.state.gradDate}
          onChange={this.handleChangedateGrad}
        />
        <br></br>
        <Form.Label>Program</Form.Label>
        <Select
          name="programOption"
          value={this.state.Program}
          onChange={this.handleChangeprograms}
          options={Majors}
        />

        <Form.Group controlId="inputForm">
          <Form.Label>Github URL</Form.Label>
          <Form.Control
            name="Github_URL"
            placeholder=""
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="inputForm">
          <Form.Label>LinkedIn URL</Form.Label>
          <Form.Control
            name="LinkedIn_URL"
            placeholder=""
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="inputForm">
          <Form.Label>Dribbble URL</Form.Label>
          <Form.Control
            name="Dribbble_URL"
            placeholder=""
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="inputForm">
          <Form.Label>Personal URL</Form.Label>
          <Form.Control
            name="Personal_URL"
            placeholder=""
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="inputForm">
          <Form.Label>Link to Resume</Form.Label>
          <Form.Control
            name="Link_to_resume"
            placeholder=""
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="inputForm">
          <Form.Label>Why GoldenHack</Form.Label>
          <Form.Control
            name="Why_GoldenHack"
            placeholder=""
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          className="submit-btn"
          variant="success"
          type="submit"
          value={this.state}
          onClick={this.handleSubmit} // Add Onclick here.
        >
          <Link
            className="btn-link"
            value={this.state}
            onClick={this.handleSubmit}
          >
            Submit
          </Link>
        </Button>
        <div class="display-error" id="display_error"></div>
      </Form>
    );
  }
}
