import React, { Component } from "react";

import EventsGrid from "../../components/EventsGrid";

export default class AllEventsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <EventsGrid />
      </div>
    );
  }
}
