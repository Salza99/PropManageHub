import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
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

function getStyles(name, rooms, theme) {
  return {
    fontWeight: rooms.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const ChipProvinceRequest = (props) => {
  const theme = useTheme();
  const [provinces, setProvinces] = useState([]);
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  let counter = 0;
  const provinceState = useSelector((state) => state.address.provinces);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProvinces(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    props.setBody({ ...props.body, regions: provinces });
  }, [provinces]);

  useEffect(() => {
    dispatch(fetchOnProvinces(token));
  }, []);
  useEffect(() => {
    if (provinceState.geonames.length > 1) {
      setNames(provinceState.geonames);
    }
  }, [provinceState]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">province</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={provinces}
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
          {names.map((province) => (
            <MenuItem
              key={`provincia-${counter++}`}
              value={province.name}
              style={getStyles(province.name, provinces, theme)}
            >
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ChipProvinceRequest;
