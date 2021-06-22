import React, { useState } from "react";
import { useHistory }  from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import { SearchState, IntegratedFiltering, SelectionState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableColumnVisibility,
  TableSelection,
  Toolbar,
  ColumnChooser,
  SearchPanel,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import GradientBackground from "../GradientBackground/index.js";
import { getAllEvents } from "../../utils/API/index.js";

import styles from "./styles.module.css";

const getHiddenColumnsFilteringExtensions = (hiddenColumnNames) =>
  hiddenColumnNames.map((columnName) => ({
    columnName,
    predicate: () => false,
  }));

export default () => {
  const [rows, setRows] = useState([
    { name: "Workshop #1", time: "3:00 - 4:00", description: "Fun workshop to attend", attendees: "17"},
    { name: "Workshop #2", time: "2:00 - 4:00", description: "Fun workshop to attend", attendees: "24"},
    { name: "Workshop #3", time: "3:00 - 5:00", description: "Fun workshop to attend", attendees: "5"},
  ]);
  // getAllEvents(
  //   (response) => {
  //     setRows(response.Items);
  //     console.log(response.Items);
  //   },
  //   (response) => {
  //     console.log(response.error);
  //   }
  // );
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "time", title: "Time" },
    { name: "description", title: "Description" },
    { name: "attendees", title: "# Attendees" },
  ]);
  const [selection, setSelection] = useState([]);

  const [defaultHiddenColumnNames] = useState(["submitted"]);
  const [filteringColumnExtensions, setFilteringColumnExtensions] = useState(
    getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames)
  );

  const onHiddenColumnNamesChange = (hiddenColumnNames) =>
    setFilteringColumnExtensions(
      getHiddenColumnsFilteringExtensions(hiddenColumnNames)
    );

  let history = useHistory();
  let id = '1020';

  const onSelectionChange = (selection) => {
    id = rows[selection].email;
    history.push('/exec/' + id);
  }

  return (
    <GradientBackground>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <Grid rows={rows} columns={columns}>
            <SearchState defaultValue="" />
            <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
            <SelectionState 
              selection={selection}
              onSelectionChange={onSelectionChange}
            />
            <Table />
            <TableHeaderRow />
            <TableColumnVisibility
              defaultHiddenColumnNames={defaultHiddenColumnNames}
              onHiddenColumnNamesChange={onHiddenColumnNamesChange}
            />
            <TableSelection
              selectByRowClick
              highlightRow
              showSelectionColumn={false}
            />
            <Toolbar />
            <SearchPanel />
            <ColumnChooser />
            <Button className={styles.button}>Create Event</Button>
          </Grid>
        </Card>
      </Container>
    </GradientBackground>
  );
};
