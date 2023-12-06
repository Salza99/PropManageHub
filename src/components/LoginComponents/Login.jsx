import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { RESET_ERROR_MESSAGE, loginFetch } from "../../redux/actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Alerts/ErrorAlert";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.login.respLogin);
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  const [loginInsuccess, setLoginInsuccess] = useState(false);
  useEffect(() => {
    if (loginState.authorizationToken) {
      setLoginInput({
        username: "",
        password: "",
      });
      navigate("/homepage");
    } else if (loginState.errorMessage) {
      setLoginInput({
        username: "",
        password: "",
      });
      setLoginInsuccess(true);
      setTimeout(() => {
        setLoginInsuccess(false);
        dispatch({ type: RESET_ERROR_MESSAGE, payload: "" });
      }, 3000);
    }
  }, [loginState]);

  const [visibility, setVisibility] = useState(["hidden", "hidden", "hidden", "hidden"]);
  const [slideGrdient, setSlideGradient] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setSlideGradient("slide-gradient");
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
    <div className={`${slideGrdient} transition-slow app-background`}>
      <div
        className={`position-relative ${loginInsuccess ? "fast-transition" : ""} ${
          loginInsuccess ? "visibility" : "hidden"
        }`}
      >
        <ErrorAlert loginState={loginState} />
      </div>

      <Container style={{ height: "100vh" }}>
        <Row className="h-100 justify-content-start align-items-center">
          <Col className="me-xl-5" xs={12} sm={12} xl={6}>
            <Card className="p-3 border-shadow border-0 opacity-form text-center">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(loginFetch(loginInput));
                }}
              >
                <div>
                  <img
                    className="img-fluid rounded-circle"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <Card.Subtitle className="mb-4 text-light t-shadow border-bottom-saffron w-75 me-auto ms-auto mb-0 mt-0 p-3">
                    Benvenuto in PropManageHub
                  </Card.Subtitle>
                </div>
                <div className="text-light">
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="text-light t-shadow">Username</Form.Label>
                    <Form.Control
                      className="text-center w-75 me-auto ms-auto mb-0 mt-0"
                      type="text"
                      placeholder="inserisci l'username"
                      value={loginInput.username}
                      onChange={(e) => {
                        setLoginInput({ ...loginInput, username: e.target.value });
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-light t-shadow">Password</Form.Label>
                    <Form.Control
                      className="text-center w-75 me-auto ms-auto mb-0 mt-0"
                      type="password"
                      placeholder="Password"
                      value={loginInput.password}
                      onChange={(e) => {
                        setLoginInput({ ...loginInput, password: e.target.value });
                      }}
                    />
                  </Form.Group>
                </div>
                <Button className="access-button" type="submit">
                  Accedi
                </Button>
              </Form>
            </Card>
          </Col>
          <Col className="d-none d-xl-block" xs={12} sm={4} xl={5}>
            <div className="d-flex flex-column">
              <p className={` text-color-text login-welcome transition ${visibility[0]}`}>Everything</p>
              <p className={` text-color-text login-welcome transition ${visibility[1]}`}>Property</p>
              <p className={` text-color-text login-welcome transition ${visibility[2]}`}>Manager</p>
              <p className={` text-color-text login-welcome transition ${visibility[3]}`}>Need</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
