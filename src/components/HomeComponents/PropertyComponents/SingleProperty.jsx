import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleProperty extends Component {
  render() {
    return (
      <Card className="mb-3 shadow-lg">
        <Card.Body>
          <Card.Title>{this.props.property.typeOfProperty}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Condizioni: {this.props.property.condition}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Prezzo: {this.props.property.price} €</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
export default SingleProperty;
