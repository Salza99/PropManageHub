import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Refresh } from "@mui/icons-material";

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
  "Appartamento",
  "Casa indipendente",
  "Villa",
  "Bifamiliare",
  "Trifamiliare",
  "Monolocale",
  "Bilocale",
  "Trilocale",
  "Quadrilocale",
  "Attico",
  "Loft",
  "Mansarda",
  "Rustico",
  "Casale",
  "Palazzo",
  "Chalet",
  "Capannone",
  "Negozio",
  "Ufficio",
  "Terreno edificabile",
  "Terreno agricolo",
];
function getStyles(name, rooms, theme) {
  return {
    fontWeight: rooms.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const ChipTypeOfProperty = (props) => {
  const theme = useTheme();
  const [typeOfProperty, setTypeOfProperty] = useState([]);
  const [displayedType, setDisplayedType] = useState([]);
  let initialPut = [];
  const handleChange = (event) => {
    setDisplayedType(event.target.value);
  };
  useEffect(() => {
    setTypeOfProperty(displayedType.map((type) => type.toUpperCase().split(" ").join("_")));
  }, [displayedType]);
  useEffect(() => {
    props.setBody({ ...props.body, typeOfProperty: typeOfProperty });
  }, [typeOfProperty]);
  useEffect(() => {
    if (props.refresh) {
      initialPut = props.body.typeOfProperty;
      initialPut = initialPut.map((type) =>
        type
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      );
      setDisplayedType(initialPut);
    }
  }, [props.refresh]);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Tipologia</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={displayedType}
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
            <MenuItem key={name} value={name} style={getStyles(name, typeOfProperty, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ChipTypeOfProperty;
