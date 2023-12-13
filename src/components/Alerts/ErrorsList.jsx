import { Component } from "react";
import { Alert } from "react-bootstrap";

class ErrorsList extends Component {
  render() {
    return (
      <Alert variant="danger" show={this.props.show} onClose={() => this.props.setShow(false)} dismissible>
        <Alert.Heading>Errore nell'inserimento dei dati!</Alert.Heading>
        {this.props.stateErrors &&
          this.props.stateErrors.map((error, index) => {
            return (
              <ul key={`error-${index + 1}`}>
                <li>{error}</li>
              </ul>
            );
          })}
      </Alert>
    );
  }
}
export default ErrorsList;
