import { Component } from "react";
import { Card } from "react-bootstrap";

class CardInfoUser extends Component {
  render() {
    return (
      <Card className="bg-transparent border-0">
        <Card.Body>
          <Card.Title className="text-light t-shadow">
            Benvenuto {this.props.homeState.name} {this.props.homeState.surname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-light t-shadow">{this.props.homeState.username}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
export default CardInfoUser;
