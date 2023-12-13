import { Component, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Cucina",
  "Salotto",
  "Studio",
  "Balcone",
  "Terrazza",
  "Sala da pranzo",
  "Ripostiglio",
  "Cantina",
  "Soffitta",
  "Lavanderia",
  "Veranda",
  "Mansarda",
  "Tavernetta",
  "Sauna",
];

function getStyles(name, rooms, theme) {
  return {
    fontWeight: rooms.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const ChipRooms = (props) => {
  const theme = useTheme();
  const [rooms, setRooms] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRooms(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    props.setBody({ ...props.body, numberOfRooms: rooms });
  }, [rooms]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Stanze</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={rooms}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, rooms, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChipRooms;
