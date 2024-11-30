import React, { useState, useEffect, useRef } from "react";
import { getActivities, updateAll } from "../api/activities.js";
import { Container } from "react-bootstrap";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import List from "../components/List.jsx";
import Button from "react-bootstrap/Button";
import "../css/body.css";
import "../css/app.css";

const Inbox = () => {
  const [activities, setActivities] = useState();
  const [inCount, setinCount] = useState();
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getActivities(false).then((result) => {
        setActivities(result[0]);
        setinCount(result[1]);
      });
      renderAfterCalled.current = true;
    }
  }, []);

  function archiveAll() {
    updateAll(activities, true);
  }

  return (
    <div className="root">
      <Container fluid className="header">
        <Header />
      </Container>
      <Container fluid className="container">
        <h1 className="text-capitalize mt-3">Inbox</h1>
        <div className="button-container">
          <Button
            className="button-archive"
            id="button-archive"
            onClick={() => archiveAll()}
          >
            Archive All Calls
          </Button>
        </div>

        {activities?.length ? (
          <List activities={activities} inCount={inCount} />
        ) : (
          <div></div>
        )}
      </Container>
      <Container fluid className="footer">
        <Footer inCount={inCount} />
      </Container>
    </div>
  );
};

export default Inbox;
