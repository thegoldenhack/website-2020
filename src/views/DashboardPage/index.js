import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";

import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardSidebarExec from "../../components/DashboardSidebarExec";
import DashboardCard from "../../components/DashboardCard";
import GradientBackground from "../../components/GradientBackground";
import LoadingSpinner from "../../components/LoadingSpinner";

import styles from "./styles.module.css";

import {
  getJwt,
  getEmailFromJwt,
  getNameFromJwt,
  getRoleFromJwt,
} from "../../utils/Cognito/index.js";
import { getApplication } from "../../utils/API/index.js";

const applicationDeadline = new Date(
  process.env.REACT_APP_APPLICATION_DEADLINE
);
const today = new Date();

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      buttonStatus: undefined,
      loadComplete: false,
      accepted: null,
    };

    if (getJwt()) {
      this.state.email = getEmailFromJwt();
    }
    // } else {
    //   return <Redirect to="/login" />;
    //   // this.props.history.push({
    //   //   pathname: "/login",
    //   // });
    // }
  }

  componentDidMount() {
    getApplication(
      getEmailFromJwt(),
      (data) => {
        if (today > applicationDeadline) {
          if (data.accepted) {
            this.setState({
              status: "complete",
              buttonStatus: "disabled",
              loadComplete: true,
              accepted: true,
            });
          } else if (!data.accepted) {
            this.setState({
              status: "complete",
              buttonStatus: "disabled",
              loadComplete: true,
              accepted: false,
            });
          } else if (!data.submitted) {
            this.setState({
              status: "incomplete",
              buttonStatus: "disabled",
              loadComplete: true,
            });
          } else {
            this.setState({
              status: "complete",
              buttonStatus: "disabled",
              loadComplete: true,
            });
          }
        } else {
          if (!data || !data.submitted) {
            this.setState({
              status: "incomplete",
              buttonStatus: "enabled",
              loadComplete: true,
            });
          } else {
            this.setState({
              status: "complete",
              buttonStatus: "disabled",
              loadComplete: true,
            });
          }
        }
      },
      // If there is an error then there is no application for the user
      () =>
        this.setState({
          status: "incomplete",
          buttonStatus: "enabled",
          loadComplete: true,
        })
    );
  }

  render() {
    if (!getJwt()) {
      return <Redirect to="/login" />;
    }
    
    const user_role = getRoleFromJwt();
    let dashboard_content;

    if (user_role === "exec") {
      dashboard_content =
          <div style={{ color: "white" }}>
            Hello World, welcome to the Executive Dashboard!
        </div>
    } else {
      dashboard_content =
          <DashboardCard
            title={"Welcome, " + getNameFromJwt() + "!"}
            key={this.state.status}
            status={this.state.status}
            buttonStatus={this.state.buttonStatus}
            accepted={this.state.accepted}
          />
    }

    return (
      <GradientBackground className={styles.gradientBackground}>
        {!this.state.loadComplete && (
          <div className={styles.loading}>
            <LoadingSpinner />
          </div>
        )}
        {this.state.loadComplete && (
          <Container fluid>
            <Row>
              <Col sm="auto" className={styles.noPadding}>
              {user_role === "exec" && (
                <DashboardSidebarExec />
              )}
              {user_role === "hacker" && (
                <DashboardSidebar />
              )}
              </Col>
              {this.state.status &&
                <Col className={styles.centerContent}>
                  {dashboard_content}
                </Col>
              }
            </Row>
          </Container>
        )}
      </GradientBackground>
    )
  }
}
