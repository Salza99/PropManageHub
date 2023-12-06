import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { RESET_ERROR_MESSAGE, loginFetch } from "../../redux/actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../Alerts/ErrorAlert";
import LogoBar from "../CommonComponents/LogoBar";
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
    <div style={{ height: "100vh" }} className={`${slideGrdient} transition-slow app-background`}>
      <div
        className={`position-relative ${loginInsuccess ? "fast-transition" : ""} ${
          loginInsuccess ? "visibility" : "hidden"
        }`}
      >
        <ErrorAlert loginState={loginState} />
      </div>
      <LogoBar />

      <Container>
        <Row className="justify-content-start align-items-center">
          <Col className="me-xl-5" xs={12} sm={12} xl={6}>
            <Card className="p-3 border-shadow border-0 opacity-form text-center">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(loginFetch(loginInput));
                }}
              >
                <div>
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
