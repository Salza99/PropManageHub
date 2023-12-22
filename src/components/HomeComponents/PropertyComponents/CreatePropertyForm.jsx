import { Card, Col, Form, Row } from "react-bootstrap";
import ChipRooms from "../RequestComponents/MuiSupportComponents/ChipRooms";
import { useEffect, useState } from "react";
import {
  Button,
  ThemeProvider,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  createTheme,
} from "@mui/material";
import ChipOtherCharacteristics from "../RequestComponents/MuiSupportComponents/ChipOtherCharacteristics";
import { useDispatch, useSelector } from "react-redux";
import {
  ERROR_PROPERTY_RESET,
  POST_PROPERTY_RESET,
  PUT_PROPERTY_RESET,
  postProperty,
  putPropertyFetch,
} from "../../../redux/actions/PropertyAction";
import { useLocation, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/DoubleArrowRounded";
import ErrorsList from "../../Alerts/ErrorsList";
const CreatePropertyForm = () => {
  const [body, setBody] = useState({
    surface: 0,
    numberOfFloors: 1,
    floor: "",
    numberOfBathrooms: 0,
    parkingSpace: 0,
    isToRent: false,
    habitability: false,
    numberOfRooms: [],
    energyClass: "",
    condition: "",
    typeOfProperty: "",
    otherCharacteristics: [],
    yearOfConstruction: 1800,
    condominiumFees: 0,
    price: 0,
    addressId: 0,
    customerId: 0,
    heating: "",
  });
  const [show, setShow] = useState(false);
  const [isHeated, setIsHeated] = useState(true);
  const [heat, setHeat] = useState({
    type: "",
    alimentation: "",
    distribution: "",
  });
  const [refresh, setRefresch] = useState(false);
  const addressId = useSelector((state) => state.address.addressId);
  const customerIdState = useSelector((state) => state.customer.selected.id);
  const propertySelected = useSelector((state) => state.property.selected);
  const fetchProperty = useSelector((state) => state.property.postProperty);
  const putProperty = useSelector((state) => state.property.putProperty);
  const stateErrors = useSelector((state) => state.property.errorMessages);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
    if (!show) {
      dispatch({ type: ERROR_PROPERTY_RESET, payload: "" });
    }
  }, [show]);
  useEffect(() => {
    if (stateErrors !== "") {
      setShow(true);
    }
  }, [stateErrors]);
  useEffect(() => {
    if (!isHeated) {
      setBody({
        ...body,
        heating: "Non classificabile",
      });
      setHeat({
        type: "",
        alimentation: "",
        distribution: "",
      });
    } else {
      setBody({
        ...body,
        heating: heat.type + ", " + heat.alimentation + ", " + heat.distribution,
      });
    }
  }, [isHeated, heat]);
  useEffect(() => {
    if (customerIdState !== "" && addressId !== "" && location.pathname !== "/homepage/proprieta/modifica") {
      setBody({
        ...body,
        customerId: customerIdState,
        addressId: addressId,
      });
    }
  }, [customerIdState, addressId]);
  useEffect(() => {
    if (fetchProperty) {
      navigate("/homepage/proprieta/" + propertySelected.id);
    }
    return () => {
      dispatch({ type: ERROR_PROPERTY_RESET, payload: "" });
      dispatch({ type: POST_PROPERTY_RESET, payload: false });
    };
  }, [fetchProperty]);
  useEffect(() => {
    if (location.pathname === "/homepage/proprieta/modifica") {
      setBody({
        surface: propertySelected.surface,
        numberOfFloors: propertySelected.numberOfFloors,
        floor: propertySelected.floor,
        numberOfBathrooms: propertySelected.numberOfBathrooms,
        parkingSpace: propertySelected.parkingSpace,
        isToRent: propertySelected.ToRent,
        habitability: propertySelected.habitability,
        numberOfRooms: propertySelected.numberOfRooms,
        energyClass: propertySelected.energyClass,
        condition: propertySelected.condition,
        typeOfProperty: propertySelected.typeOfProperty,
        otherCharacteristics: propertySelected.otherCharacteristics,
        yearOfConstruction: propertySelected.yearOfConstruction,
        condominiumFees: propertySelected.condominiumFees,
        price: propertySelected.price,
      });
      setRefresch(true);
      console.log("ho finito di cambiare le stanze dentro al componente propertyForm");
      if (propertySelected.heating !== "Non classificabile") {
        setHeat({
          type: propertySelected.heating.split(",")[0],
          alimentation: propertySelected.heating.split(",")[1].trim(),
          distribution: propertySelected.heating.split(",")[2].trim(),
        });
      } else {
        setIsHeated(false);
      }
    }
  }, [location.pathname]);
  useEffect(() => {
    if (putProperty) {
      navigate("/homepage/proprieta/" + propertySelected.id);
    }
    return () => {
      dispatch({ type: PUT_PROPERTY_RESET, payload: false });
      dispatch({ type: ERROR_PROPERTY_RESET, payload: "" });
    };
  }, [putProperty]);
  return (
    <Card className="shadow mb-3">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (location.pathname === "/homepage/proprieta/modifica") {
            dispatch(putPropertyFetch(token, body, propertySelected.id));
          } else {
            dispatch(postProperty(token, body));
          }
        }}
      >
        <Row className="p-4 justify-content-center">
          <Card.Header className="align-self-start">
            <Card.Title>Form Proprietà</Card.Title>
          </Card.Header>
          <Row className="border shadow-sm mb-3 p-2 pt-4 justify-content-center text-center">
            <Col className="mb-3" xs={6}>
              <TextField
                label="anno di costruzione"
                variant="standard"
                value={body.yearOfConstruction}
                onChange={(e) => {
                  setBody({
                    ...body,
                    yearOfConstruction: e.target.value,
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={6}>
              <TextField
                label="superfice"
                variant="standard"
                value={body.surface}
                onChange={(e) => {
                  setBody({
                    ...body,
                    surface: e.target.value,
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={6}>
              <TextField
                label="numero piani"
                variant="standard"
                type="number"
                value={body.numberOfFloors}
                onChange={(e) => {
                  setBody({
                    ...body,
                    numberOfFloors: e.target.value,
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={6}>
              <TextField
                label="ubicazione piano"
                variant="standard"
                value={body.floor}
                onChange={(e) => {
                  setBody({
                    ...body,
                    floor: e.target.value,
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={12}>
              <FormControl className="w-75" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>
                <Select
                  value={body.typeOfProperty}
                  onChange={(e) => {
                    const updatedValue = e.target.value.toUpperCase().replace(/\s+/g, "_");
                    setBody({
                      ...body,
                      typeOfProperty: updatedValue,
                    });
                  }}
                >
                  <MenuItem value={"APPARTAMENTO"}>Appartamento</MenuItem>
                  <MenuItem value={"CASA_INDIPENDENTE"}>Casa indipendente</MenuItem>
                  <MenuItem value={"VILLA"}>Villa</MenuItem>
                  <MenuItem value={"BIFAMILIARE"}>Bifamiliare</MenuItem>
                  <MenuItem value={"TRIFAMILIARE"}>Trifamiliare</MenuItem>
                  <MenuItem value={"MONOLOCALE"}>Monolocale</MenuItem>
                  <MenuItem value={"BILOCALE"}>Bilocale</MenuItem>
                  <MenuItem value={"TRILOCALE"}>Trilocale</MenuItem>
                  <MenuItem value={"QUADRILOCALE"}>Quadrilocale</MenuItem>
                  <MenuItem value={"ATTICO"}>Attico</MenuItem>
                  <MenuItem value={"LOFT"}>Loft</MenuItem>
                  <MenuItem value={"MANSARDA"}>Mansarda</MenuItem>
                  <MenuItem value={"RUSTICO"}>Rustico</MenuItem>
                  <MenuItem value={"CASALE"}>Casale</MenuItem>
                  <MenuItem value={"PALAZZO"}>Palazzo</MenuItem>
                  <MenuItem value={"CHALET"}>Chalet</MenuItem>
                  <MenuItem value={"CAPANNONE"}>Capannone</MenuItem>
                  <MenuItem value={"NEGOZIO"}>Negozio</MenuItem>
                  <MenuItem value={"UFFICIO"}>Ufficio</MenuItem>
                  <MenuItem value={"TERRENO_EDIFICABILE"}>Terreno edificabile</MenuItem>
                  <MenuItem value={"TERRENO_AGRICOLO"}>Terreno agricolo</MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Row>

          <Row className="border shadow-sm p-2 pt-4 mb-3 text-center">
            <Col className="mb-3" xs={6}>
              <TextField
                label="numero bagni"
                variant="standard"
                type="number"
                value={body.numberOfBathrooms}
                onChange={(e) => {
                  setBody({
                    ...body,
                    numberOfBathrooms: e.target.value,
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={6}>
              <TextField
                label="posti auto"
                variant="standard"
                type="number"
                value={body.parkingSpace}
                onChange={(e) => {
                  setBody({
                    ...body,
                    parkingSpace: e.target.value,
                  });
                }}
              />
            </Col>
            <Col className="mb-3" xs={6}>
              <TextField
                label="spese cond."
                variant="standard"
                value={body.condominiumFees}
                onChange={(e) => {
                  setBody({
                    ...body,
                    condominiumFees: e.target.value,
                  });
                }}
              />
            </Col>

            <Col className="mb-3" xs={12}>
              <FormControl className="w-75" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">classe energetica</InputLabel>
                <Select
                  value={body.energyClass}
                  onChange={(e) => {
                    setBody({
                      ...body,
                      energyClass: e.target.value,
                    });
                  }}
                >
                  <MenuItem value={"A4"}>A4</MenuItem>
                  <MenuItem value={"A3"}>A3</MenuItem>
                  <MenuItem value={"A2"}>A2</MenuItem>
                  <MenuItem value={"A1"}>A1</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"D"}>D</MenuItem>
                  <MenuItem value={"E"}>E</MenuItem>
                  <MenuItem value={"F"}>F</MenuItem>
                  <MenuItem value={"G"}>G</MenuItem>
                  <MenuItem value={"NON_CLASSIFICABILE"}>NON_CLASSIFICABILE</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col className="mb-3" xs={12}>
              <FormControl className="w-75" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">condizioni</InputLabel>
                <Select
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
          </Row>

          <Row className="border shadow-sm mb-3 text-center p-2 pt-4">
            <Col className="mb-2" xs={12} sm={6}>
              <ChipRooms body={body} setBody={setBody} refresh={refresh} setRefresch={setRefresch} />
            </Col>
            <Col className="mb-2" xs={12} sm={6}>
              <ChipOtherCharacteristics body={body} setBody={setBody} refresh={refresh} setRefresch={setRefresch} />
            </Col>
            <Col className="mb-3" xs={12}>
              <TextField
                className="w-75"
                label="prezzo"
                variant="standard"
                value={body.price}
                onChange={(e) => {
                  setBody({
                    ...body,
                    price: e.target.value,
                  });
                }}
              />
            </Col>
            <Col xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={body.isToRent}
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
            <Col xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={body.habitability}
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
          </Row>
          <Row className="justify-content-center mb-3">
            <Card.Footer>
              <Row className="align-items-center justify-content-between">
                <Col xs={9} sm>
                  <Card.Title>Riscaldamento</Card.Title>
                </Col>
                <Col xs={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isHeated}
                        onChange={(e) => {
                          setIsHeated(e.target.checked);
                        }}
                      />
                    }
                  />
                </Col>
              </Row>
            </Card.Footer>

            {isHeated && (
              <>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>tipo</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={heat.type}
                    onChange={(e) => {
                      setHeat({
                        ...heat,
                        type: e.target.value,
                      });
                    }}
                    label="tipo"
                  >
                    <MenuItem value={"Autonomo"}>Autonomo</MenuItem>
                    <MenuItem value={"Centralizzato"}>Centralizzato</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">alimentazione</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={heat.alimentation}
                    onChange={(e) => {
                      setHeat({
                        ...heat,
                        alimentation: e.target.value,
                      });
                    }}
                    label="alimentazione"
                  >
                    <MenuItem value={"Caldaia a pellet"}>Caldaia a pellet</MenuItem>
                    <MenuItem value={"Caldaia a metano"}>Caldaia a metano</MenuItem>
                    <MenuItem value={"Caldaia a gasolio"}>Caldaia a gasolio</MenuItem>
                    <MenuItem value={"Pompa di calore"}>Pompa di calore</MenuItem>
                    <MenuItem value={"Elettrico"}>Elettrico</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">distribuzione</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={heat.distribution}
                    onChange={(e) => {
                      setHeat({
                        ...heat,
                        distribution: e.target.value,
                      });
                    }}
                    label="distribuzione"
                  >
                    <MenuItem value={"A radiatori"}>A radiatori</MenuItem>
                    <MenuItem value={"A pavimento radiante"}>A pavimento radiante</MenuItem>
                    <MenuItem value={"Ventilconvettori"}>Ventilconvettori</MenuItem>
                    <MenuItem value={"Termosifoni a parete"}>Termosifoni a parete</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Row>
          <Row className="text-end justify-content-end">
            <Col className="mb-2 align-self-end" xs={6} md={6}>
              <ThemeProvider theme={theme}>
                <Tooltip
                  title={`${location.pathname === "/homepage/proprieta/modifica" ? "Modifica" : "Aggiungi Proprietà"}`}
                >
                  <Button
                    className="btn-send"
                    size="small"
                    color="ochre"
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon className="icon" />}
                  >
                    {`${
                      location.pathname === "/homepage/proprieta/modifica" ? "Modifica Proprietà" : "Aggiungi Proprietà"
                    }`}
                  </Button>
                </Tooltip>
              </ThemeProvider>
            </Col>
          </Row>
          {stateErrors && <ErrorsList show={show} setShow={setShow} stateErrors={stateErrors} />}
        </Row>
      </Form>
    </Card>
  );
};
export default CreatePropertyForm;
