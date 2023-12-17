import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChipRooms from "./MuiSupportComponents/ChipRooms";
import ChipOtherCharacteristics from "./MuiSupportComponents/ChipOtherCharacteristics";
import ChipTypeOfProperty from "./MuiSupportComponents/ChipTypeOfProperty";
import { Form } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import ChipProvinceRequest from "./MuiSupportComponents/ChipProvinceRequest";
import { postRequest } from "../../../redux/actions/RequestAction";

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
  const dispatch = useDispatch();
  const customerIdState = useSelector((state) => state.customer.selected.id);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  useEffect(() => {
    setBody({
      ...body,
      customerId: customerIdState,
    });
  }, [customerIdState]);
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postRequest(token, body));
        }}
      >
        <ChipRooms setBody={setBody} body={body} />
        <ChipOtherCharacteristics setBody={setBody} body={body} />
        <ChipTypeOfProperty setBody={setBody} body={body} />
        <TextField required variant="filled" disabled label="Regione" value={body.regions[0]} />
        <ChipProvinceRequest setBody={setBody} body={body} />
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
        <Form.Check
          type={"checkbox"}
          label={"abitabile?"}
          onChange={(e) => {
            setBody({
              ...body,
              habitability: e.target.checked,
            });
          }}
        />
        <Form.Check
          type={"checkbox"}
          label={"in affitto?"}
          onChange={(e) => {
            setBody({
              ...body,
              isToRent: e.target.checked,
            });
          }}
        />
        <TextField
          id="standard-multiline-static"
          label="note"
          multiline
          rows={4}
          variant="standard"
          onChange={(e) => {
            setBody({
              ...body,
              note: e.target.value,
            });
          }}
        />
        <button type="submit" className="form-button">
          Aggiungi
        </button>
      </Form>
    </div>
  );
};
export default CreateRequestForm;
