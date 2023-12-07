import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleRequest extends Component {
  render() {
    return (
      <Link className="nav-link" to={"/homepage/richieste/" + this.props.request.id}>
        <Card className="mb-3 shadow-lg">
          <Card.Body>
            <Card.Title>{this.props.request.typeOfProperty}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Condizioni: {this.props.request.condition}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Massimale: {this.props.request.maximal} €</Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}
export default SingleRequest;
