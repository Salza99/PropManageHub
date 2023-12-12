import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleAdmin extends Component {
  render() {
    return (
      <Link className="nav-link" to={"/homepage/collaboratori/" + this.props.admin.id}>
        <Card className="mb-3 shadow-lg">
          <Card.Body>
            <Card.Title>
              {this.props.admin.name} {this.props.admin.surname}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.props.admin.email}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{this.props.admin.phone}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}
export default SingleAdmin;
