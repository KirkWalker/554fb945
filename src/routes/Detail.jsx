import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { formatUsPhone, getIcon } from "../helpers/functions.jsx";
import { getActivityDetail, updateActivity } from "../api/activities";
import { Container, Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const { slug } = useParams();
  const [activity, setActivity] = useState();
  const [archived, setArchived] = useState();
  const renderAfterCalled = useRef(false);
  const { state } = useLocation();

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getActivityDetail(slug).then((response) => {
        setActivity(response);
        setArchived(response.is_archived);
      });
    }
  }, [slug]);

  const formatted = moment.utc(activity?.duration * 1000).format("mm:ss");

  const handleChange = async (newVal) => {
    setArchived(newVal);
    updateActivity(slug, newVal);
  };

  return (
    <div className="root">
      <Container fluid className="header">
        <Header />
      </Container>
      <Container fluid className="container">
        {activity ? (
          <Form>
            <h1 className="text-capitalize mt-3">
              <Link to="/">{"<"}</Link> {activity?.direction}{" "}
              {activity?.call_type} Call
            </h1>
            <div className="date-time">
              <Moment format="dddd, MMMM Do YYYY -  hh:mm A">
                {activity?.created_at}
              </Moment>
            </div>

            <Row className="details pt-3 pb-3">
              <Col className="col-3 text-center">
                {getIcon(activity?.call_type, activity?.direction)}
                {formatted}
              </Col>
              <Col className="col-9 pt-3">
                {activity?.direction == "inbound" ? (
                  <h4>+{formatUsPhone(activity?.from)}</h4>
                ) : (
                  <h4>+{formatUsPhone(activity?.to)}</h4>
                )}
                <h5>via +{formatUsPhone(activity?.via)}</h5>
                <div className="archived-form">
                  <label>Archived</label>
                  <Form.Check // prettier-ignore
                    type="switch"
                    reverse
                    className="archived-switch"
                    checked={archived}
                    onChange={(e) => handleChange(e.target.checked)}
                    id="custom-switch"
                  />
                </div>
              </Col>
            </Row>
          </Form>
        ) : (
          <div></div>
        )}
      </Container>
      <Container fluid className="footer">
        <Footer inCount={state.inCount} />
      </Container>
    </div>
  );
};

export default Detail;
