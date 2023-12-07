import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleProperty extends Component {
  render() {
    return (
      <Link className="nav-link" to={"/homepage/proprieta/" + this.props.property.id}>
        <Card className="mb-3 shadow-lg">
          <Card.Body>
            <Card.Title>{this.props.property.typeOfProperty}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Condizioni: {this.props.property.condition}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Prezzo: {this.props.property.price} €</Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}
export default SingleProperty;
