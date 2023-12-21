import { Component } from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleCustomer extends Component {
  render() {
    return (
      <Col xs={12} md={6} lg={12} xl={6}>
        <Link className="nav-link" to={"/homepage/clienti/" + this.props.customer.id}>
          <Card className="mb-3 shadow-lg elevation btn-transition single-card-height">
            <Card.Header>
              <Card.Title className="m-0">Cliente</Card.Title>
            </Card.Header>

            <ListGroup className="p-3">
              <div className="border rounded p-3">
                <Card.Subtitle className="mb-2">Anagrafica:</Card.Subtitle>
                <ListGroup.Item className="fw-bold text-capitalize">
                  {this.props.customer.name.toLowerCase()} {this.props.customer.surname.toLowerCase()}
                </ListGroup.Item>
              </div>
            </ListGroup>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <span className="card-subtitle h6">Email:</span> {this.props.customer.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="card-subtitle h6">Telefono:</span> {this.props.customer.phone}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  }
}
export default SingleCustomer;
