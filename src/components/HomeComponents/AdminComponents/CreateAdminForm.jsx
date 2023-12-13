import { DateField } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { GlobalStyles, TextField, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET_ADMIN_OK, postAdmin } from "../../../redux/actions/AdminAction";
import { ClassNames } from "@emotion/react";
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
  const [errorsPosition, setErrorsPosition] = useState(false);
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      setErrorsPosition(true);
    } else {
      setErrorsPosition(false);
    }
  };
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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (adminState.errorMessages !== "") {
      setShow(true);
    }
  }, [adminState.errorMessages]);
  useEffect(() => {
    if (adminState.errorMessages === "" && adminState.createAdminOk === true) {
      navigate("/homepage/collaboratori");
    }
    return () => {
      dispatch({ type: RESET_ADMIN_OK, payload: false });
    };
  }, [adminState.createAdminOk]);
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
                onChange={(e) => {
                  setBody({ ...body, phone: e.target.value });
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
                label="email"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, email: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col className="mb-5 mb-md-5" xs={12} md={8}>
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
                label="username"
                variant="standard"
                onChange={(e) => {
                  setBody({ ...body, username: e.target.value });
                }}
              />
            </ThemeProvider>
          </Col>
          <Col xs={6} md={4}>
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
          <Col className={`text-center align-self-center ${errorsPosition && "order-btn"}`} xs={6} md={3}>
            <button className="form-button" type="submit">
              Aggiungi
            </button>
          </Col>
          <Col className={errorsPosition && "order-errors"} xs={12} md={9}>
            {adminState.errorMessages && (
              <ErrorsList adminState={adminState.errorMessages} show={show} setShow={setShow} />
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default CreateAdminForm;
