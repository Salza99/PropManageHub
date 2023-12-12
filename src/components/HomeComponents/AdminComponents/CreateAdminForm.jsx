import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { GlobalStyles, TextField, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAdmin } from "../../../redux/actions/AdminAction";
import ErrorAlert from "../../Alerts/ErrorAlert";

const CreateAdminForm = () => {
  const [body, setBody] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    username: "",
    birthDay: dayjs(),
  });
  const fetchSuccess = useState(false);
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
  //   useEffect(() => {
  //     if (adminState.errorMessages === "" && body.birthDay !== "") {
  //       navigate("/homepage/collaboratori");
  //     }
  //   }, []);
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postAdmin(token, body));
        }}
      >
        <GlobalStyles
          styles={{
            "&::before": {
              border: "0 !important",
              borderBottom: "1px solid white !important",
            },
          }}
        />
        <Row className="p-4">
          <Col xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                inputProps={{ style: { color: "white", textShadow: "2px 2px 4px black" } }}
                className="w-100 text"
                label="Nome"
                helperText="inserisci il nome"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, name: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                inputProps={{ style: { color: "white", textShadow: "2px 2px 4px black" } }}
                className="w-100"
                label="cognome"
                helperText="inserisci il cognome"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, surname: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                inputProps={{ style: { color: "white", textShadow: "2px 2px 4px black" } }}
                className="w-100"
                label="telefono"
                helperText="inserisci il numero telefono"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, phone: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                inputProps={{ style: { color: "white", textShadow: "2px 2px 4px black" } }}
                className="w-100"
                label="email"
                helperText="inserisci l'email"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, email: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col xs={12} md={6}>
            <ThemeProvider theme={theme}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  },
                }}
                color="ochre"
                inputProps={{ style: { color: "white", textShadow: "2px 2px 4px black" } }}
                className="w-100"
                label="username"
                helperText="inserisci l'username"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, username: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker format="YYYY-MM-DD" disableFuture onChange={handleDateChange} defaultValue={body.birthDay} />
            </LocalizationProvider>
          </Col>
          <Col xs={12} md={12}>
            <Button variant="outline-light" type="submit">
              Crea nuovo Collaboratore
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default CreateAdminForm;
