import { Autocomplete, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnhamletByRange, fetchOnsearch } from "../../../../redux/actions/AddressAction";

const ChipProvinceRequest = (props) => {
  const chipValue = useSelector((state) => state.address.provinces);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search !== "") {
      dispatch(fetchOnsearch(token, search));
    }
  }, [search]);
  const [searchedProvince, setSearchedProvince] = useState({});
  useEffect(() => {
    if (props.body.cities.length > 0) {
      setSearchedProvince(chipValue.find((searchedCity) => props.body.cities[0].includes(searchedCity.placeName)));
      dispatch(fetchOnhamletByRange(token, searchedProvince.lat, searchedProvince.lng));
    }
  }, [props.body.cities]);
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-filled"
        options={chipValue.map((option) => option.placeName + ", " + " " + option.adminName1)}
        onChange={(event, newValue) => {
          const selectedCities = newValue.map((value) => {
            const parts = value.split(",")[0].trim();
            return parts;
          });
          const selectedRegions = newValue.map((value) => {
            const parts = value.split(",")[1].trim();
            return parts;
          });
          const uniqueRegions = [];
          for (let i = 0; i < selectedRegions.length; i++) {
            const region = selectedRegions[i];

            if (!uniqueRegions.includes(region)) {
              uniqueRegions.push(region);
            }
          }
          props.setBody({
            ...props.body,
            cities: [selectedCities[0]],
            regions: [uniqueRegions[0]],
          });
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={option.postalCode} variant="standard" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="nome della provincia"
            placeholder="Favorites"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        )}
      />
    </div>
  );
};
export default ChipProvinceRequest;
