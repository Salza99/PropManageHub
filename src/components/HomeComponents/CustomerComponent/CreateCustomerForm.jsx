import { Button, TextField, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { Card, Col, Form, Row } from "react-bootstrap";
import ErrorsList from "../../Alerts/ErrorsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  RESET_CUSTOMER_ERRORS,
  RESET_CUSTOMER_OK,
  RESET_CUSTOMER_PUT,
  postCustomer,
  putCustomer,
} from "../../../redux/actions/CustomerAction";
import SendIcon from "@mui/icons-material/DoubleArrowRounded";
const CreateCustomerForm = () => {
  const [body, setBody] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    birthDay: dayjs(),
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [navigateRequest, setNavigateRequest] = useState(false);
  const [navigateProperty, setNavigateProperty] = useState(false);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const adminId = useSelector((state) => state.home.myProfile.id);
  const customerState = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const location = useLocation();
  const handleDateChange = (date) => {
    setBody({
      ...body,
      birthDay: `${date.year()}-${(date.month() + 1).toString().padStart(2, "0")}-${
        date.$D < 10 ? "0" + date.$D : date.$D
      }`,
    });
  };

  const theme = createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });
  useEffect(() => {
    if (customerState.errorMessages !== "") {
      setShow(true);
    }
  }, [customerState.errorMessages]);
  useEffect(() => {
    if (location.pathname === "/homepage/clienti/modifica") {
      setBody({
        name: customerState.selected.name,
        surname: customerState.selected.surname,
        phone: customerState.selected.phone,
        email: customerState.selected.email,
        birthDay: dayjs(customerState.selected.birthDay),
      });
    }
  }, []);
  useEffect(() => {
    if (!show) {
      dispatch({ type: RESET_CUSTOMER_ERRORS, payload: "" });
    }
  }, [show]);
  useEffect(() => {
    if (customerState.putFetch) {
      navigate("/homepage/clienti/" + customerState.selected.id);
    }
    return () => {
      dispatch({ type: RESET_CUSTOMER_PUT, payload: false });
    };
  }, [customerState.putFetch]);
  useEffect(() => {
    if (customerState.errorMessages === "" && customerState.createCustomerOk === true && navigateRequest === true) {
      setBody({
        name: "",
        surname: "",
        phone: "",
        email: "",
        birthDay: dayjs(),
      });
      navigate("/homepage/clienti/aggiungiCliente/richiesta");
    } else if (
      customerState.errorMessages === "" &&
      customerState.createCustomerOk === true &&
      navigateProperty === true
    ) {
      setBody({
        name: "",
        surname: "",
        phone: "",
        email: "",
        birthDay: dayjs(),
      });
      navigate("/homepage/clienti/aggiungiCliente/indirizzo");
    }
  }, [customerState.createCustomerOk]);
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_CUSTOMER_OK, payload: false });
    };
  }, []);
  return (
    <Card className="shadow mb-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          if (location.pathname === "/homepage/clienti/modifica") {
            dispatch(putCustomer(token, body, customerState.selected.id));
          } else {
            dispatch(postCustomer(token, body, adminId));
          }
        }}
      >
        <Row className="p-4 justify-content-center">
          <Card.Header className="align-self-start">
            <Card.Title>Form Cliente</Card.Title>
          </Card.Header>
          <Row className="border shadow-sm mb-3">
            <Col className="mb-3 mb-md-5" xs={12} md={6}>
              <TextField
                className="w-100 text"
                label="Nome"
                disabled={`${location.pathname !== "/homepage/clienti/modifica" ? "" : "disabled"}`}
                variant="standard"
                value={body.name}
                onChange={(e) => {
                  setBody({ ...body, name: e.target.value });
                }}
              />
            </Col>
            <Col className="mb-3 mb-md-5" xs={12} md={6}>
              <TextField
                className="w-100"
                label="cognome"
                disabled={`${location.pathname !== "/homepage/clienti/modifica" ? "" : "disabled"}`}
                variant="standard"
                value={body.surname}
                onChange={(e) => {
                  setBody({ ...body, surname: e.target.value });
                }}
              />
            </Col>
            <Col className="mb-3 mb-md-5" xs={12} md={6}>
              <TextField
                className="w-100"
                label="telefono"
                variant="standard"
                value={body.phone}
                onChange={(e) => {
                  setBody({ ...body, phone: e.target.value });
                }}
              />
            </Col>
            <Col className="mb-5 mb-md-5" xs={12} md={6}>
              <TextField
                className="w-100"
                label="email"
                variant="standard"
                value={body.email}
                onChange={(e) => {
                  setBody({ ...body, email: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Col className="mb-5" xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                className="date"
                format="DD/MM/YYYY"
                label="data di nascità"
                variant="outlined"
                value={body.birthDay}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Col>

          <Col className="text-center mb-3" xs={6} md={6}>
            {location.pathname !== "/homepage/clienti/modifica" && (
              <ThemeProvider theme={theme}>
                <Tooltip title="Vai a Form Richiesta">
                  <Button
                    className="btn-send"
                    onClick={() => {
                      setNavigateRequest(true);
                    }}
                    size="small"
                    color="ochre"
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon className="icon" />}
                  >
                    Aggiungi Richiesta
                  </Button>
                </Tooltip>
              </ThemeProvider>
            )}
          </Col>
          <Col className="text-center mb-3" xs={6} md={6}>
            <ThemeProvider theme={theme}>
              <Tooltip
                title={`${
                  location.pathname === "/homepage/clienti/modifica" ? "Conferma Modifiche" : "Vai a Form Indirizzo"
                }`}
              >
                <Button
                  className="btn-send"
                  onClick={() => {
                    setNavigateProperty(true);
                  }}
                  size="small"
                  color="ochre"
                  variant="contained"
                  type="submit"
                  endIcon={<SendIcon className="icon" />}
                >
                  {`${location.pathname === "/homepage/clienti/modifica" ? "Modifica info" : "Aggiungi Proprietà"}`}
                </Button>
              </Tooltip>
            </ThemeProvider>
          </Col>

          <Col xs={12}>
            {customerState.errorMessages && (
              <ErrorsList stateErrors={customerState.errorMessages} show={show} setShow={setShow} />
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default CreateCustomerForm;
