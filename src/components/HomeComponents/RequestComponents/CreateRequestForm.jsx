import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChipRooms from "./MuiSupportComponents/ChipRooms";
import ChipOtherCharacteristics from "./MuiSupportComponents/ChipOtherCharacteristics";
import ChipTypeOfProperty from "./MuiSupportComponents/ChipTypeOfProperty";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/DoubleArrowRounded";
import ChipProvinceRequest from "./MuiSupportComponents/ChipProvinceRequest";
import { ERROR_REQUEST_RESET, POST_FETCH_OK, postRequest } from "../../../redux/actions/RequestAction";
import { useNavigate } from "react-router-dom";
import { RESET_PROVINCE } from "../../../redux/actions/AddressAction";
import ErrorsList from "../../Alerts/ErrorsList";

const CreateRequestForm = () => {
  const [body, setBody] = useState({
    habitability: false,
    condominiumFees: 0.0,
    numberOfRooms: [],
    condition: "",
    otherCharacteristics: [],
    regions: [],
    cities: [],
    surface: 0,
    numberOfBathrooms: 0,
    parkingSpace: 0,
    typeOfProperty: [],
    maximal: 0,
    note: "",
    customerId: "",
    isToRent: false,
  });
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
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const customerIdState = useSelector((state) => state.customer.selected.id);
  const fetchOk = useSelector((state) => state.request.fetchOk);
  const stateErrors = useSelector((state) => state.request.errorMessages);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const navigate = useNavigate();
  useEffect(() => {
    setBody({
      ...body,
      customerId: customerIdState,
    });
  }, [customerIdState]);
  useEffect(() => {
    if (stateErrors !== "") {
      setShow(true);
    }
  }, [stateErrors]);
  useEffect(() => {
    if (!show) {
      dispatch({ type: ERROR_REQUEST_RESET, payload: "" });
    }
  }, [show]);
  useEffect(() => {
    if (fetchOk) {
      setBody({
        habitability: false,
        condominiumFees: 0.0,
        numberOfRooms: [],
        condition: "",
        otherCharacteristics: [],
        regions: [],
        cities: [],
        surface: 0,
        numberOfBathrooms: 0,
        parkingSpace: 0,
        typeOfProperty: [],
        maximal: 0,
        note: "",
        customerId: "",
        isToRent: false,
      });
      navigate("/homepage/richieste");
    }
    return () => {
      dispatch({ type: POST_FETCH_OK, payload: false });
      dispatch({ type: RESET_PROVINCE, payload: [] });
    };
  }, [fetchOk]);
  return (
    <Card className="shadow mb-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postRequest(token, body));
        }}
      >
        <Row className="p-3 justify-content-center">
          <Card.Header className="align-self-start">
            <Card.Title>Form Richiesta</Card.Title>
          </Card.Header>
          <Row className="border shadow-sm p-2 justify-content-center text-center">
            <Col xs={12}>
              <ChipRooms setBody={setBody} body={body} />
            </Col>
            <Col xs={12}>
              <ChipOtherCharacteristics setBody={setBody} body={body} />
            </Col>
            <Col xs={12}>
              <ChipTypeOfProperty setBody={setBody} body={body} />
            </Col>

            <Col className="w-75" xs={12}>
              <ChipProvinceRequest setBody={setBody} body={body} />
            </Col>
          </Row>
        </Row>
        <Row className="p-3 text-center justify-content-center">
          <Row className="border shadow-sm">
            <Col className="mb-2" xs={6} md={4}>
              <TextField
                id="standard-search"
                label="spese cond."
                type="text"
                variant="standard"
                onChange={(e) => {
                  setBody({
                    ...body,
                    condominiumFees: parseInt(e.target.value),
                  });
                }}
              />
            </Col>
            <Col className="mb-2" xs={6} md={4}>
              <TextField
                id="standard-search"
                label="superficie"
                type="text"
                variant="standard"
                onChange={(e) => {
                  setBody({
                    ...body,
                    surface: parseInt(e.target.value),
                  });
                }}
              />
            </Col>
            <Col className="mb-2" xs={6} md={4}>
              <TextField
                id="standard-search"
                label="n. di bagni"
                type="number"
                variant="standard"
                onChange={(e) => {
                  setBody({
                    ...body,
                    numberOfBathrooms: parseInt(e.target.value),
                  });
                }}
              />
            </Col>
            <Col className="mb-2" xs={6} md={4}>
              <TextField
                id="standard-search"
                label="posti auto"
                type="number"
                variant="standard"
                onChange={(e) => {
                  setBody({
                    ...body,
                    parkingSpace: parseInt(e.target.value),
                  });
                }}
              />
            </Col>
            <Col className="mb-2" xs={6} md={4}>
              <TextField
                id="standard-search"
                label="massimale"
                type="text"
                variant="standard"
                onChange={(e) => {
                  setBody({
                    ...body,
                    maximal: parseInt(e.target.value),
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={12}>
              <FormControl className="w-75" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">condizioni</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={body.condition}
                  onChange={(e) => {
                    const updatedValue = e.target.value.toUpperCase().replace(/\s+/g, "_");
                    setBody({
                      ...body,
                      condition: updatedValue,
                    });
                  }}
                >
                  <MenuItem value={"DA_RISTRUTTURARE"}>Da ristrutturare</MenuItem>
                  <MenuItem value={"RISTRUTTURATO"}>Ristrutturato</MenuItem>
                  <MenuItem value={"BUONO_STATO"}>Buono stato</MenuItem>
                  <MenuItem value={"NUOVA_COSTRUZIONE"}>Nuova costruzione</MenuItem>
                  <MenuItem value={"IN_FASE_DI_COSTRUZIONE"}>In fase di costruzione</MenuItem>
                </Select>
              </FormControl>
            </Col>

            <Row className="justify-content-center">
              <Col xs={6} sm={4} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      type={"checkbox"}
                      label={"Abitabile"}
                      onChange={(e) => {
                        setBody({
                          ...body,
                          habitability: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Abitabile"
                />
              </Col>
              <Col xs={6} sm={4} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      type={"checkbox"}
                      label={"Affitto"}
                      onChange={(e) => {
                        setBody({
                          ...body,
                          isToRent: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Affitto"
                />
              </Col>
            </Row>
          </Row>
        </Row>

        <Card>
          <Row className="p-3 mb-3">
            <Card.Footer>
              <Card.Subtitle>Note</Card.Subtitle>
            </Card.Footer>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              placeholder="(opzionale) Scrivi qui le tue note"
              onChange={(e) => {
                setBody({
                  ...body,
                  note: e.target.value,
                });
              }}
            />
          </Row>
          <Row className="justify-content-end">
            <ThemeProvider theme={theme}>
              <Col className="mb-1" xs={6} sm={4} md={3} lg={4}>
                <Tooltip title="Aggiungi Richiesta">
                  <Button
                    className="btn-send"
                    size="small"
                    color="ochre"
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon className="icon" />}
                  >
                    Aggiungi Richiesta
                  </Button>
                </Tooltip>
              </Col>
            </ThemeProvider>
            <Col className="mt-1" xs={12}>
              {stateErrors && <ErrorsList stateErrors={stateErrors} show={show} setShow={setShow} />}
            </Col>
          </Row>
        </Card>
      </Form>
    </Card>
  );
};
export default CreateRequestForm;
