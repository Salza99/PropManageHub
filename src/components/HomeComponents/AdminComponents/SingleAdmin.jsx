import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleAdmin extends Component {
  render() {
    return (
      <Card className="mb-3 shadow-lg">
        <Card.Body>
          <Card.Title>
            {this.props.admin.name} {this.props.admin.surname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.admin.email}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{this.props.admin.phone}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
export default SingleAdmin;
