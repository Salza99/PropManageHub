import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
const Login = () => {
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  const [visibility, setVisibility] = useState(["hidden", "hidden", "hidden", "hidden"]);
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < visibility.length) {
        const newVisibility = [...visibility];
        newVisibility[index] = "visible";
        setVisibility(newVisibility);
        index++;
      } else {
        setVisibility(["visible", "visible", "visible"]);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="login-background">
      <Container style={{ height: "100vh" }}>
        <Row className="h-100 justify-content-start align-items-center">
          <Col className="me-5" xs={12} sm={8} xl={6}>
            <Card className="p-3">
              <Form>
                <div className="text-center">
                  <h3>Accedi</h3>
                  <Card.Subtitle className="mb-4 text-muted">Benvenuto in PropManageHub</Card.Subtitle>
                </div>
                <div className="d-flex flex-column justify-content-start">
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="inserisci l'username"
                      value={loginInput.username}
                      onChange={(e) => {
                        setLoginInput({ ...loginInput, username: e.target.value });
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={loginInput.password}
                      onChange={(e) => {
                        setLoginInput({ ...loginInput, password: e.target.value });
                      }}
                    />
                  </Form.Group>
                </div>
                <Button variant="primary" type="submit">
                  Accedi
                </Button>
              </Form>
            </Card>
          </Col>
          <Col className="d-none d-xl-block" xs={12} sm={4} xl={5}>
            <div className="d-flex flex-column">
              <p className={`login-welcome transition ${visibility[0]}`}>Everything</p>
              <p className={`text-secondary login-welcome transition ${visibility[1]}`}>Property</p>
              <p className={`text-secondary login-welcome transition ${visibility[2]}`}>Manager</p>
              <p className={`text-secondary login-welcome transition ${visibility[3]}`}>Need</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
