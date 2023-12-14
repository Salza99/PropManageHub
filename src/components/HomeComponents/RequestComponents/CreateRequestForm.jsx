import { useState } from "react";
import { useSelector } from "react-redux";
import ChipRooms from "./MuiSupportComponents/ChipRooms";
import ChipOtherCharacteristics from "./MuiSupportComponents/ChipOtherCharacteristics";
import ChipTypeOfProperty from "./MuiSupportComponents/ChipTypeOfProperty";
import { Form } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ChipsRegionRequest from "./MuiSupportComponents/ChipRegionRequest";

const CreateRequestForm = () => {
  const [body, setBody] = useState({
    habitability: false,
    condominiumFees: 0.0,
    numberOfRooms: [],
    condition: "",
    otherCharacteristics: [],
    regions: [],
    cities: [],
    hamlets: [],
    surface: 0,
    numberOfBathrooms: 0,
    parkingSpace: 0,
    typeOfProperty: [],
    maximal: 0,
    note: "",
    isToRent: false,
  });

  const customerId = useSelector((state) => state.customer.selected.id);

  return (
    <div>
      <Form>
        <ChipRooms setBody={setBody} body={body} />
        <ChipOtherCharacteristics setBody={setBody} body={body} />
        <ChipTypeOfProperty setBody={setBody} body={body} />
        <ChipsRegionRequest setBody={setBody} body={body} />
        <TextField
          id="standard-search"
          label="spese cond."
          type="text"
          variant="standard"
          onChange={(e) => {
            setBody({
              ...body,
              condominiumFees: e.target.value,
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
              surface: e.target.value,
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
              numberOfBathrooms: e.target.value,
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
              parkingSpace: e.target.value,
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
              maximal: e.target.value,
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
              setBody({
                ...body,
                condition: e.target.value,
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
              habitability: e.target.value,
            });
          }}
        />
        <Form.Check
          type={"checkbox"}
          label={"in affitto?"}
          onChange={(e) => {
            setBody({
              ...body,
              isToRent: e.target.value,
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
        <button className="form-button">Aggiungi</button>
      </Form>
    </div>
  );
};
export default CreateRequestForm;
