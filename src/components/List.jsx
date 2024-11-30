import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import ListGroup from "react-bootstrap/ListGroup";
import { Row, Col } from "react-bootstrap";
import {formatUsPhone, getIcon} from "../helpers/functions.jsx";


const List = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dateTime, setDate] = useState(null);
  var dd;

  const activities = props.activities;
  const inCount=props.inCount;

  const handleClick = async (id, idx) => {
    navigate("/" + id, { state: { inCount, from: location }, replace: true });
  };

  function setDateFunc(newDate) {
    if (moment(newDate).format("DD/MM/YYYY") != dd) {
      dd = moment(newDate).format("DD/MM/YYYY");
      return (
        <Row className="date-time">
          <Col>
            <Moment format="dddd, MMMM Do YYYY">{newDate}</Moment>
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }

  return (
    <ListGroup as="ul">
      {props ? (
        activities.map((activity, i) => (
          <ListGroup.Item
            className="pb-3"
            as="li"
            onClick={() => handleClick(activity?.id, i)}
            key={i}
          >
            {setDateFunc(activity?.created_at)}
            <Row className="list-item">
              <div>
                <span>
                    {getIcon(activity?.call_type,activity?.direction )}
                </span>

                <h5>+{formatUsPhone(activity?.to)}</h5>
                {activity?.direction == "inbound" ? (
                  <span>
                    {activity?.call_type == "answered"
                      ? "Call from +"
                      : "Missed call from +"}
                    {formatUsPhone(activity?.from)}
                  </span>
                ) : (
                  <span>
                    {activity?.call_type == "answered"
                      ? "Call to +"
                      : "Tried to call +"}
                    {formatUsPhone(activity?.to)}
                  </span>
                )}
              </div>
              <div className="time">
                <Moment format="hh:mm A">{activity?.created_at}</Moment>
              </div>
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>Loading ...</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default List;
