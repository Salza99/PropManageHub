import { Autocomplete, Button, TextField, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ERROR_RESET,
  POST_ADDRESS_RESET,
  RESET_PROVINCE,
  fetchOnsearch,
  postAddress,
} from "../../../redux/actions/AddressAction";
import { useNavigate } from "react-router-dom";
import ErrorsList from "../../Alerts/ErrorsList";
import SendIcon from "@mui/icons-material/DoubleArrowRounded";

const CreateAddressForm = () => {
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
  const [body, setBody] = useState({
    region: "",
    city: "",
    street: "",
    postalCode: 0,
    houseNumber: "",
  });
  const [show, setShow] = useState(false);
  const [citySelect, setCitySelect] = useState("");
  const cityOption = useSelector((state) => state.address.provinces);
  const addressState = useSelector((state) => state.address);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const stateErrors = useSelector((state) => state.address.errorMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (citySelect !== "") {
      dispatch(fetchOnsearch(token, citySelect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySelect]);
  useEffect(() => {
    if (addressState.fetchOk) {
      setBody({
        region: "",
        city: "",
        street: "",
        postalCode: 0,
        houseNumber: 0,
      });
      navigate("/homepage/clienti/aggiungiCliente/proprieta");
    }
    return () => {
      dispatch({ type: RESET_PROVINCE, payload: [] });
      dispatch({ type: POST_ADDRESS_RESET, payload: false });
    };
  }, [addressState.fetchOk]);
  useEffect(() => {
    if (!show) {
      dispatch({ type: ERROR_RESET, payload: "" });
    }
  }, [show]);
  useEffect(() => {
    if (stateErrors !== "") {
      setShow(true);
    }
  }, [stateErrors]);
  return (
    <Card className=" shadow mb-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postAddress(token, body));
        }}
      >
        <Row className="p-4 justify-content-center">
          <Card.Header className="align-self-start">
            <Card.Title>Form Indirizzo</Card.Title>
          </Card.Header>
          <Row className="border shadow-sm mb-2 p-2 pb-5 mb-4">
            <Col xs={12}>
              <Autocomplete
                options={cityOption.map((option) => `${option.placeName}, ${option.adminName1}, ${option.postalCode}`)}
                onChange={(e, newValue) => {
                  if (newValue) {
                    const [city, region, postalCode] = newValue.split(",").map((item) => item.trim());
                    setBody({
                      ...body,
                      city: city,
                      region: region,
                      postalCode: parseInt(postalCode),
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    value={citySelect}
                    onChange={(e) => {
                      setCitySelect(e.target.value);
                    }}
                    {...params}
                    label="location"
                    variant="standard"
                  />
                )}
              />
            </Col>

            <Col xs={6}>
              <TextField
                className="w-100"
                label="via"
                variant="standard"
                value={body.street}
                onChange={(e) => {
                  setBody({ ...body, street: e.target.value });
                }}
              />
            </Col>

            <Col xs={6}>
              <TextField
                className="w-100"
                label="numero civico"
                variant="standard"
                value={body.houseNumber}
                onChange={(e) => {
                  setBody({ ...body, houseNumber: e.target.value });
                }}
              />
            </Col>
          </Row>

          <Row className="text-end">
            <Col className="mb-2 align-self-end">
              <ThemeProvider theme={theme}>
                <Tooltip title="Vai a Form Proprietà">
                  <Button
                    className="btn-send"
                    size="small"
                    color="ochre"
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon className="icon" />}
                  >
                    Aggiungi Indirizzo
                  </Button>
                </Tooltip>
              </ThemeProvider>
            </Col>
          </Row>
        </Row>
      </Form>
      {stateErrors && <ErrorsList show={show} setShow={setShow} stateErrors={stateErrors} />}
    </Card>
  );
};
export default CreateAddressForm;
