import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = (props) => {

const inCount = props.inCount;

  return <footer>
    <Row>
      <Col>
      <Link to="/">
      <i className="bi bi-telephone">
        <span className="in-count">{inCount}</span>
      </i>
      </Link>
      </Col>
      <Col>
      <Link to="/">
      <i className="bi bi-person"></i>
      </Link>
      </Col>
      <Col>
      <Link to="/">
      <i className="bi bi-gear"></i>
      </Link>
      </Col>
      <Col>
      <Link to="/">
      <i className="bi bi-search"></i>
      </Link>
      </Col>
      <Col>
      <Link to="/">
      <i className="bi bi-mic"></i>
      </Link>
      </Col>
    </Row>

  </footer>;
};

export default Footer;
