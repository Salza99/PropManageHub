import { Component } from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleRequest extends Component {
  render() {
    return (
      <Col xs={12} md={6} lg={12} xl={6}>
        <Link className="nav-link" to={"/homepage/richieste/" + this.props.request.id}>
          <Card className="mb-3 shadow-lg elevation btn-transition single-card-height">
            <Card.Header>
              <Card.Title className="m-0">Richiesta</Card.Title>
            </Card.Header>
            <ListGroup className="p-3">
              <div className="border rounded p-3">
                <Card.Subtitle className="mb-2">Tipologia:</Card.Subtitle>
                {this.props.request.typeOfProperty.map((type, i) => {
                  return (
                    <ListGroup.Item className="fw-bold text-capitalize" key={"type" + i++}>
                      {type.toLowerCase().split("_").join(" ")}
                    </ListGroup.Item>
                  );
                })}
              </div>
            </ListGroup>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <span className="card-subtitle h6">Condizioni:</span>{" "}
                  <span className="text-capitalize">
                    {this.props.request.condition.toLowerCase().split("_").join(" ")}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="card-subtitle h6">Massimale:</span> {this.props.request.maximal}€
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    );
  }
}
export default SingleRequest;
