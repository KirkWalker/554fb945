import React, { useState, useEffect, useRef } from "react";
import { getActivities, updateAll } from "../api/activities";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import List from "../components/List.jsx";

import "../css/body.css";
import "../css/app.css";

const Archives = () => {
  const [activities, setActivities] = useState();
  const [inCount, setinCount] = useState();
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getActivities(true).then((result) => {
        setActivities(result[0]);
        setinCount(result[1]);
      });
      renderAfterCalled.current = true;
    }
  }, []);

  function restoreAll() {
    updateAll(activities, false);
  }

  return (
    <div className="root">
      <Container fluid className="header">
        <Header />
      </Container>
      <Container fluid className="container">
        <h1 className="text-capitalize mt-3">Call Archives</h1>
        <div className="button-container">
          <Button
            className="button-archive"
            id="button-archive"
            onClick={() => restoreAll()}
          >
            Unarchive All Calls
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

export default Archives;
