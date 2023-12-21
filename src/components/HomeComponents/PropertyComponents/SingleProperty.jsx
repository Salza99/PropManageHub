import { Component } from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleProperty extends Component {
  render() {
    return (
      <Col xs={12} md={6} lg={12} xl={6}>
        <Link className="nav-link" to={"/homepage/proprieta/" + this.props.property.id}>
          <Card className="mb-3 shadow-lg elevation btn-transition single-card-height">
            <Card.Header>
              <Card.Title className="m-0">Proprietà</Card.Title>
            </Card.Header>
            <ListGroup className="p-3">
              <div className="border rounded p-3">
                <Card.Subtitle className="mb-2">Tipologia:</Card.Subtitle>
                <ListGroup.Item className="fw-bold text-capitalize">
                  {this.props.property.typeOfProperty.toLowerCase().split("_").join(" ")}
                </ListGroup.Item>
              </div>
            </ListGroup>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <span className="card-subtitle h6">Condizioni:</span>{" "}
                  {this.props.property.condition.toLowerCase().split("_").join(" ")}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="card-subtitle h6">Prezzo:</span> {this.props.property.price} €
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  }
}
export default SingleProperty;
