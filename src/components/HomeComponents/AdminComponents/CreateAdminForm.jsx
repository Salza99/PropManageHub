import { DateField } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SendIcon from "@mui/icons-material/DoubleArrowRounded";
import { Button, TextField, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET_ADMIN_ERRORS, RESET_ADMIN_OK, postAdmin } from "../../../redux/actions/AdminAction";

import ErrorsList from "../../Alerts/ErrorsList";

const CreateAdminForm = () => {
  const [body, setBody] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    username: "",
    birthDay: dayjs(),
  });
  const [show, setShow] = useState(false);

  const adminState = useSelector((state) => state.admin);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setBody({
      ...body,
      birthDay: `${date.year()}-${date.month() < 10 ? "0" + (date.month() + 1) : date.month()}-${date.$D}`,
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
    if (adminState.errorMessages !== "") {
      setShow(true);
    }
  }, [adminState.errorMessages]);
  useEffect(() => {
    if (!show) {
      dispatch({ type: RESET_ADMIN_ERRORS, payload: "" });
    }
  }, [show]);
  useEffect(() => {
    if (adminState.errorMessages === "" && adminState.createAdminOk === true) {
      setBody({
        name: "",
        surname: "",
        phone: "",
        email: "",
        username: "",
        birthDay: dayjs(),
      });
      navigate("/homepage/collaboratori");
    }
    return () => {
      dispatch({ type: RESET_ADMIN_OK, payload: false });
    };
  }, [adminState.createAdminOk]);
  return (
    <Card className="mb-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postAdmin(token, body));
        }}
      >
        <Row className="p-4 justify-content-center">
          <Card.Header>
            <Card.Title>Form Collaboratore</Card.Title>
          </Card.Header>
          <Row className="border shadow-sm mb-3">
            <Col className="mb-3 mb-md-5" xs={12} md={6}>
              <TextField
                className="w-100 text"
                label="Nome"
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
            <Col className="mb-3 mb-md-5" xs={12} md={6}>
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
            <Col className="mb-5 mb-md-5" xs={12} md={8}>
              <TextField
                value={body.username}
                className="w-100"
                label="username"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, username: e.target.value });
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

          <Row className="text-end">
            <Col className="mb-3 align-self-end">
              <ThemeProvider theme={theme}>
                <Tooltip title="Aggiungi Collaboratore">
                  <Button
                    className="btn-send"
                    size="small"
                    color="ochre"
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon className="icon" />}
                  >
                    Aggiungi Collaboratore
                  </Button>
                </Tooltip>
              </ThemeProvider>
            </Col>
          </Row>
          <Col xs={12}>
            {adminState.errorMessages && (
              <ErrorsList stateErrors={adminState.errorMessages} show={show} setShow={setShow} />
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default CreateAdminForm;
