import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleCustomer extends Component {
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {this.props.customer.name} {this.props.customer.surname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.customer.email}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{this.props.customer.phone}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
export default SingleCustomer;
