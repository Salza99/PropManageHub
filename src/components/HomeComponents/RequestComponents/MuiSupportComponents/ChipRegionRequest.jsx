import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { fetchOnRegions } from "../../../../redux/actions/AddressAction";
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
const ChipsRegionRequest = (props) => {
  const theme = useTheme();
  const [regions, setRegions] = useState([]);
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const regionsState = useSelector((state) => state.address.regions);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegions(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    props.setBody({ ...props.body, regions: regions });
  }, [regions]);

  useEffect(() => {
    dispatch(fetchOnRegions(token));
  }, []);
  useEffect(() => {
    if (regionsState.geonames.length > 1) {
      setNames(regionsState.geonames);
    }
  }, [regionsState]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">regioni</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={regions}
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
          {names.map((region) => (
            <MenuItem key={region.adminCode1} value={region.name} style={getStyles(region.name, regions, theme)}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ChipsRegionRequest;
