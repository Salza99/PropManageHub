import { Col, Form, Row } from "react-bootstrap";
import ChipTypeOfPropert from "../RequestComponents/MuiSupportComponents/ChipTypeOfProperty";
import ChipRooms from "../RequestComponents/MuiSupportComponents/ChipRooms";
import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import ChipOtherCharacteristics from "../RequestComponents/MuiSupportComponents/ChipOtherCharacteristics";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_PROPERTY_RESET, POST_PROPERTY_RESET, postProperty } from "../../../redux/actions/PropertyAction";
import { useNavigate } from "react-router-dom";
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
    otherCharacteristics: "",
    yearOfConstruction: 1800,
    condominiumFees: 0,
    price: 0,
    addressId: 0,
    customerId: 0,
    heating: "",
  });
  const [isHeated, setIsHeated] = useState(true);
  const [heat, setHeat] = useState({
    type: "",
    alimentation: "",
    distribution: "",
  });
  const addressId = useSelector((state) => state.address.addressId);
  const customerIdState = useSelector((state) => state.customer.selected.id);
  const fetchProperty = useSelector((state) => state.property.postProperty);
  const stateErrors = useSelector((state) => state.property.errorMessages);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    if (customerIdState !== "" && addressId !== "") {
      setBody({
        ...body,
        customerId: customerIdState,
        addressId: addressId,
      });
    }
  }, [customerIdState, addressId]);
  useEffect(() => {
    if (fetchProperty) {
      navigate("/homepage/proprieta");
    }
    return () => {
      dispatch({ type: ERROR_PROPERTY_RESET, payload: "" });
      dispatch({ type: POST_PROPERTY_RESET, payload: false });
    };
  }, [fetchProperty]);
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postProperty(token, body));
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
        <ChipRooms body={body} setBody={setBody} />
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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
        <ChipOtherCharacteristics body={body} setBody={setBody} />
        <Row>
          <TextField
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
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setBody({
                    ...body,
                    isToRent: e.target.checked,
                  });
                }}
              />
            }
            label={`${body.isToRent ? "Immobile in affitto" : "Immobile in vendità"}`}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  setBody({
                    ...body,
                    habitability: e.target.checked,
                  });
                }}
              />
            }
            label={`${body.habitability ? "Immobile abitabile" : "Immobile non abitabile"}`}
          />
          <Col xs={6} sm={4}>
            <h3>Riscaldamento</h3>
          </Col>
          <Col xs={6} sm={8}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={(e) => {
                    setIsHeated(e.target.checked);
                  }}
                />
              }
              label={`${isHeated ? "" : "non classificabile"}`}
            />
          </Col>

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
        <button className="form-button" type="submit">
          Inserisci proprietà
        </button>
      </Form>
    </div>
  );
};
export default CreatePropertyForm;
