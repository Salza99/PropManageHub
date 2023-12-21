import { GlobalStyles, TextField, ThemeProvider, createTheme } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { Col, Form, Row } from "react-bootstrap";
import ErrorsList from "../../Alerts/ErrorsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RESET_CUSTOMER_ERRORS, RESET_CUSTOMER_OK, postCustomer } from "../../../redux/actions/CustomerAction";

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
  const [errorsPosition, setErrorsPosition] = useState(false);
  const [navigateRequest, setNavigateRequest] = useState(false);
  const [navigateProperty, setNavigateProperty] = useState(false);
  const [screenWidth, setScreenWidth] = useState("");
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const adminId = useSelector((state) => state.home.myProfile.id);
  const customerState = useSelector((state) => state.customer);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    if (screenWidth >= 768) {
      setErrorsPosition(true);
    } else {
      setErrorsPosition(false);
    }
  };
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setBody({
      ...body,
      birthDay: `${date.year()}-${(date.month() + 1).toString().padStart(2, "0")}-${
        date.$D < 10 ? "0" + date.$D : date.$D
      }`,
    });
    console.log(date);
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
    setScreenWidth(window.innerWidth);
    if (screenWidth >= 768) {
      setErrorsPosition(true);
    } else {
      setErrorsPosition(false);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);
  useEffect(() => {
    if (customerState.errorMessages !== "") {
      setShow(true);
    }
  }, [customerState.errorMessages]);
  useEffect(() => {
    if (!show) {
      dispatch({ type: RESET_CUSTOMER_ERRORS, payload: "" });
    }
  }, [show]);
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
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postCustomer(token, body, adminId));
        }}
      >
        <GlobalStyles
          styles={{
            "&::before": {
              border: "0 !important",
              borderBottom: "1px solid white !important",
            },
            input: {
              color: "white !important",
              textShadow: "2px 2px 4px black !important",
            },
            svg: {
              color: "white !important",
            },
            "& fieldset:hover": {
              border: "1px solid #f4e7ac !important",
            },
          }}
        />
        <Row className="p-4 justify-content-end">
          <Col className="mb-3 mb-md-5" xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                inputProps={{ style: { color: "white", textShadow: "2px 2px 4px black" } }}
                className="w-100 text"
                label="Nome"
                variant="standard"
                value={body.name}
                onChange={(e) => {
                  setBody({ ...body, name: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col className="mb-3 mb-md-5" xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                className="w-100"
                label="cognome"
                variant="standard"
                value={body.surname}
                onChange={(e) => {
                  setBody({ ...body, surname: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col className="mb-3 mb-md-5" xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                className="w-100"
                label="telefono"
                variant="standard"
                value={body.phone}
                onChange={(e) => {
                  setBody({ ...body, phone: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col className="mb-5 mb-md-5" xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                className="w-100"
                label="email"
                variant="standard"
                value={body.email}
                onChange={(e) => {
                  setBody({ ...body, email: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col className="mb-5" xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                className="date"
                format="DD/MM/YYYY"
                label="data di nascità"
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                disableFuture
                onChange={handleDateChange}
                defaultValue={body.birthDay}
              />
            </LocalizationProvider>
          </Col>

          <Col className="text-center" xs={6} md={6}>
            <button
              onClick={() => {
                setNavigateRequest(true);
              }}
              className="form-button mb-3"
              type="submit"
            >
              Aggiungi richiesta
            </button>
          </Col>
          <Col className="text-center" xs={6} md={6}>
            <button
              onClick={() => {
                setNavigateProperty(true);
              }}
              className="form-button"
              type="submit"
            >
              Aggiungi proprietà
            </button>
          </Col>

          <Col xs={12}>
            {customerState.errorMessages && (
              <ErrorsList stateErrors={customerState.errorMessages} show={show} setShow={setShow} />
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default CreateCustomerForm;
