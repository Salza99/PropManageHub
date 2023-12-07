import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleRequest extends Component {
  render() {
    return (
      <Card className="mb-3 shadow-lg">
        <Card.Body>
          <Card.Title>{this.props.request.typeOfProperty}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Condizioni: {this.props.request.condition}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Massimale: {this.props.request.maximal} €</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
export default SingleRequest;
