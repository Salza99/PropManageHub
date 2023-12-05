import { Component } from "react";
import { Alert } from "react-bootstrap";

class ErrorAlert extends Component {
  render() {
    return (
      <Alert
        className="top-center-error-alert start-50 translate-middle position-absolute text-center"
        variant="danger"
      >
        <Alert.Heading className="fs-4">Errore nell'inserimento dei dati</Alert.Heading>
        <p className="fs-5">{this.props.loginState.errorMessage}</p>
      </Alert>
    );
  }
}
export default ErrorAlert;
