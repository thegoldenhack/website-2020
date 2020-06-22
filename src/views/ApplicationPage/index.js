import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";

import { schools } from "../../assets/data/schools.js";
import { majors } from "../../assets/data/majors.js";
import { ethnicity } from "../../assets/data/ethnicity.js";
import { degrees } from "../../assets/data/degrees.js";
import { genders } from "../../assets/data/genders.js";
import { gradYears } from "../../assets/data/gradYears.js";

import DashboardSidebar from "../../components/DashboardSidebar";
import InputFieldApplication from "../../components/InputFieldApplication";
import InputFieldSelect from "../../components/InputFieldSelect";
import SubmitButton from "../../components/SubmitButton";

import styles from "./styles.module.css";

import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

const applicationDeadline = new Date(
  process.env.REACT_APP_APPLICATION_DEADLINE
);
const decisionDate = new Date(process.env.REACT_APP_DECISION_DATE);
const today = new Date();

const dynamoDbData = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
};

const tableName = process.env.REACT_APP_DYNAMO_DB_TABLE;

const userPool = new CognitoUserPool(poolData);
var cognitoUser = userPool.getCurrentUser();
var dynamoDB = new AWS.DynamoDB(dynamoDbData);
var isLoggedIn = false;

export default class application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      submitted: false,
      birth_date: undefined,
      gender: undefined,
      ethnicity: undefined,
      school: undefined,
      degree: undefined,
      graduation_year: undefined,
      program: undefined,
      github_url: undefined,
      linkedin_url: undefined,
      dribbble_url: undefined,
      personal_url: undefined,
      link_to_resume: undefined,
      why_goldenHack: undefined,
    };

    if (cognitoUser != null) {
      cognitoUser.getSession(
        function (err, session) {
          if (err) {
            console.log(err);
            return;
          } else {
            this.state.email = session.idToken.payload.email;
            console.log(this.state.email);

            var params = {
              Key: {
                email: {
                  S: this.state.email,
                },
              },
              TableName: tableName,
            };
            dynamoDB.getItem(params, (err, data) => {
              if (err) {
                console.log(err);
              }

              if (data.Item.submitted.BOOL) {
                this.setState({
                  saved: false,
                  submitted: true,
                  birth_date: data.Item.Birthdate.S,
                  gender: data.Item.Gender.S,
                  ethnicity: data.Item.Ethnicity.S,
                  school: data.Item.School.S,
                  degree: data.Item.Degree.S,
                  graduation_year: data.Item.Graduation.S,
                  program: data.Item.Program.S,
                  github_url: "ASDA",
                  linkedin_url: data.Item.LinkedInURL.S,
                  dribbble_url: data.Item.DribbbleURL.S,
                  personal_url: data.Item.PersonalURL.S,
                  link_to_resume: data.Item.ResumeURL.S,
                  why_goldenHack: data.Item.WhyGoldenHack.S,
                });
              }
            });
          }
          //Set the profile info
          cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
          });
          isLoggedIn = true;
        }.bind(this)
      );
    } else {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
  componentDidMount() {
    this.setState({ github_url: "ASD" });
  }

  // React-select handles events a little weirdly (ie it doesn't contain the name
  // of the field which was passed in props), so when an input field uses
  // react-select we get another field which does contain the name, and we have
  // to do a little extra work.
  handleChange = (event, extra) => {
    if (extra != null) {
      // If it's possible to select mutliple options, then the event
      // will be an array (even if only 1 option was selected)
      if (event.length > 0) {
        var arr = [];
        for (var i = 0; i < event.length; i++) {
          arr.push(event[i].value);
        }
        this.setState({
          [extra.name]: arr,
          saved: false,
          submitted: false,
        });
      } else {
        this.setState({
          [extra.name]: event.value,
          saved: false,
          submitted: false,
        });
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        saved: false,
        submitted: false,
      });
    }
  };

  handleSubmit = (event) => {
    console.log("Submitting!");
    event.preventDefault();
    if (
      this.state.gender == undefined ||
      this.state.ethnicity == undefined ||
      this.state.school == undefined ||
      this.state.degree == undefined ||
      this.state.graduation_year == undefined ||
      this.state.program == undefined
    ) {
      document.getElementById("display_error").innerHTML =
        "Not all required fields have been filled out.";
    }
    if (
      this.state.github_url != undefined &&
      !this.state.github_url.startsWith("https://www.github.com/")
    ) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
    }
    if (
      this.state.linkedin_url != undefined &&
      !this.state.linkedin_url.startsWith("https://www.linkedin.com/in/")
    ) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
    }
    if (
      this.state.dribbble_url != undefined &&
      !this.state.dribbble_url.startsWith("https://www.dribbble.com/")
    ) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
    }
    if (
      this.state.link_to_resume != undefined &&
      !this.state.link_to_resume.startsWith("https://")
    ) {
      document.getElementById("display_error").innerHTML =
        "Invalid URL entered";
    }
    if (this.state.why_goldenHack.length > 1000) {
      document.getElementById("display_error").innerHTML =
        "Over 1000 character limit for 'Why Golden Hack'";
    }

    let input = {
      email: {
        S: this.state.email,
      },
      Birthdate: {
        S: this.state.birth_date.toString(),
      },
      Gender: {
        S: this.state.gender,
      },
      Ethnicity: {
        S: this.state.ethnicity[0],
      },
      School: {
        S: this.state.school[0],
      },
      Degree: {
        S: this.state.degree,
      },
      Graduation: {
        S: this.state.graduation_year.toString(),
      },
      Program: {
        S: this.state.program[0],
      },
      GithubURL: {
        S: this.state.github_url || "empty",
      },
      LinkedInURL: {
        S: this.state.linkedIn_url || "empty",
      },
      DribbbleURL: {
        S: this.state.dribbble_url || "empty",
      },
      PersonalURL: {
        S: this.state.personal_url || "empty",
      },
      ResumeURL: {
        S: this.state.link_to_resume || "empty",
      },
      WhyGoldenHack: {
        S: this.state.why_goldenHack,
      },
      submitted: {
        BOOL: true,
      },
    };
    var params = {
      TableName: process.env.REACT_APP_DYNAMO_DB_TABLE,
      Item: input,
    };
    dynamoDB.putItem(params, function (err, data) {
      if (err) {
        document.getElementById("display_error").innerHTML = err;
      } else {
        document.getElementById("display_error").innerHTML =
          "Submitted Successfully";
      }
    });
    this.setState({
      submitted: true,
    });

    console.log(this.state);
  };

  handleSave = () => {
    let input = {
      email: {
        S: this.state.email,
      },
      Birthdate: {
        S: this.state.birth_date.toString(),
      },
      Gender: {
        S: this.state.gender,
      },
      Ethnicity: {
        S: this.state.ethnicity[0],
      },
      School: {
        S: this.state.school[0],
      },
      Degree: {
        S: this.state.degree,
      },
      Graduation: {
        S: this.state.graduation_year.toString(),
      },
      Program: {
        S: this.state.program[0],
      },
      GithubURL: {
        S: this.state.github_url || "empty",
      },
      LinkedInURL: {
        S: this.state.linkedIn_url || "empty",
      },
      DribbbleURL: {
        S: this.state.dribbble_url || "empty",
      },
      PersonalURL: {
        S: this.state.personal_url || "empty",
      },
      ResumeURL: {
        S: this.state.link_to_resume || "empty",
      },
      WhyGoldenHack: {
        S: this.state.why_goldenHack,
      },
      submitted: {
        BOOL: false,
      },
    };
    var params = {
      TableName: process.env.REACT_APP_DYNAMO_DB_TABLE,
      Item: input,
    };
    dynamoDB.putItem(params, function (err, data) {
      if (err) {
        document.getElementById("display_error").innerHTML = err;
      }
    });
    this.setState({
      saved: true,
    });
    console.log(this.state);
  };

  displayStatus = () => {
    if (this.state.submitted) {
      return <p> Successfully submitted application! </p>;
    } else if (this.state.saved) {
      return <p> Successfully saved application! </p>;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <Row>
          <Col
            sm={{
              span: 3,
            }}
          >
            <DashboardSidebar />
          </Col>{" "}
          <Col sm className={styles.scrollCol}>
            <h2 className={styles.heading}>
              {" "}
              The GoldenHack 2020 Application{" "}
            </h2>{" "}
            <p>
              Little blurb or something about how after you submit you can 't
              edit your application.{" "}
            </p>{" "}
            {/* Birthday */}{" "}
            <InputFieldApplication
              label="Birthday"
              name={"birth_date"}
              required={true}
              value={this.state.birth_date}
              key={this.state.birth_date}
              onChange={this.handleChange}
              type="date"
            />{" "}
            {/* Gender */}{" "}
            <InputFieldSelect
              label={"Gender"}
              name={"gender"}
              multiSelect={false}
              value={{ value: this.state.gender, label: this.state.gender }}
              key={this.state.gender}
              onChange={this.handleChange}
              options={genders}
            />{" "}
            {/* Ethnicity */}{" "}
            <InputFieldSelect
              label={"Ethnicity"}
              name={"ethnicity"}
              multiSelect={true}
              value={{
                value: this.state.ethnicity,
                label: this.state.ethnicity,
              }}
              key={this.state.ethnicity}
              onChange={this.handleChange}
              options={ethnicity}
            />{" "}
            {/* School */}{" "}
            <InputFieldSelect
              label={"School"}
              name={"school"}
              multiSelect={true}
              value={{ value: this.state.school, label: this.state.school }}
              key={this.state.school}
              onChange={this.handleChange}
              options={schools}
            />{" "}
            {/* Degree */}{" "}
            <InputFieldSelect
              label={"Degree"}
              name={"degree"}
              multiSelect={false}
              value={{ value: this.state.degree, label: this.state.degree }}
              key={this.state.degree}
              onChange={this.handleChange}
              options={degrees}
            />{" "}
            {/* Graduation Year */}{" "}
            <InputFieldSelect
              label={"Graduation Year"}
              name={"graduation_year"}
              multiSelect={false}
              value={{
                value: this.state.graduation_year,
                label: this.state.graduation_year,
              }}
              key={this.state.graduation_year}
              onChange={this.handleChange}
              options={gradYears}
            />{" "}
            {/* Program */}{" "}
            <InputFieldSelect
              label={"Program"}
              name={"program"}
              multiSelect={true}
              value={{ value: this.state.program, label: this.state.program }}
              onChange={this.handleChange}
              key={this.state.program}
              options={majors}
            />{" "}
            {/* Github URL */}{" "}
            <InputFieldApplication
              label={"Github URL"}
              name={"github_url"}
              required={false}
              placeholder={"https://github.com/"}
              value={this.state.github_url}
              key={this.state.github_url}
              onChange={(event) => this.handleChange(event, null)}
            />{" "}
            {/* LinkedIn URL */}{" "}
            <InputFieldApplication
              label={"LinkedIn URL"}
              name={"linkedin_url"}
              required={false}
              placeholder={"https://www.linkedin.com/in/"}
              value={this.state.linkedin_url}
              key={this.state.linkedin_url}
              onChange={(event) => this.handleChange(event, null)}
            />{" "}
            {/* Dribbble URL */}{" "}
            <InputFieldApplication
              label={"Dribbble URL"}
              name={"dribbble_url"}
              required={false}
              placeholder={"https://www.dribbble.com/"}
              value={this.state.dribbble_url}
              key={this.state.dribble_url}
              onChange={(event) => this.handleChange(event, null)}
            />{" "}
            {/* Personal URL */}{" "}
            <InputFieldApplication
              label={"Personal URL"}
              name={"personal_url"}
              required={false}
              placeholder={"https://"}
              value={this.state.personal_url}
              key={this.state.personal_url}
              onChange={(event) => this.handleChange(event, null)}
            />{" "}
            {/* Link to Resume */}{" "}
            <InputFieldApplication
              label={"Link To Resume"}
              name={"link_to_resume"}
              required={false}
              placeholder={"https://"}
              value={this.state.link_to_resume}
              key={this.state.link_to_resume}
              onChange={(event) => this.handleChange(event, null)}
            />{" "}
            {/* Why The GoldenHack? */}{" "}
            <InputFieldApplication
              label={"Why The GoldenHack?"}
              name={"why_goldenHack"}
              required={true}
              placeholder={"Give us your best answer in 1000 words or less."}
              value={this.state.why_goldenHack}
              key={this.state.why_goldenHack}
              onChange={(event) => this.handleChange(event, null)}
              longAnswer={true}
            />{" "}
            {this.displayStatus()}{" "}
            <div class="display-error" id="display_error">
              {" "}
            </div>{" "}
            <Row>
              <Col>
                <SubmitButton text={"Save"} handleSubmit={this.handleSave} />{" "}
              </Col>{" "}
              <Col>
                <SubmitButton
                  text={"Submit"}
                  handleSubmit={this.handleSubmit}
                />{" "}
              </Col>{" "}
            </Row>{" "}
          </Col>{" "}
        </Row>{" "}
      </div>
    );
  }
}
