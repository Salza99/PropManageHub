import { Autocomplete, TextField, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_RESET, RESET_PROVINCE, fetchOnsearch, postAddress } from "../../../redux/actions/AddressAction";
import { useNavigate } from "react-router-dom";
import ErrorsList from "../../Alerts/ErrorsList";

const CreateAddressForm = () => {
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
  const [body, setBody] = useState({
    region: "",
    city: "",
    street: "",
    postalCode: 0,
    houseNumber: 0,
  });
  const [show, setShow] = useState(false);
  const [citySelect, setCitySelect] = useState("");
  const cityOption = useSelector((state) => state.address.provinces);
  const addressState = useSelector((state) => state.address);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const stateErrors = useSelector((state) => state.address.errorMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (citySelect !== "") {
      dispatch(fetchOnsearch(token, citySelect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySelect]);
  useEffect(() => {
    if (addressState.fetchOk) {
      setBody({
        region: "",
        city: "",
        street: "",
        postalCode: 0,
        houseNumber: 0,
      });
      navigate("/homepage/clienti/aggiungiCliente/proprieta");
    }
    return () => {
      dispatch({ type: RESET_PROVINCE, payload: [] });
    };
  }, [addressState.fetchOk]);
  useEffect(() => {
    if (!show) {
      dispatch({ type: ERROR_RESET, payload: "" });
    }
  }, [show]);
  useEffect(() => {
    if (stateErrors !== "") {
      setShow(true);
    }
  }, [stateErrors]);
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(postAddress(token, body));
        }}
      >
        <Autocomplete
          options={cityOption.map((option) => `${option.placeName}, ${option.adminName1}, ${option.postalCode}`)}
          onChange={(e, newValue) => {
            if (newValue) {
              const [city, region, postalCode] = newValue.split(",").map((item) => item.trim());
              setBody({
                ...body,
                city: city,
                region: region,
                postalCode: parseInt(postalCode),
              });
            }
          }}
          renderInput={(params) => (
            <TextField
              value={citySelect}
              onChange={(e) => {
                setCitySelect(e.target.value);
              }}
              {...params}
              label="location"
              variant="standard"
            />
          )}
        />
        <ThemeProvider theme={theme}>
          <TextField
            InputLabelProps={{
              style: {
                color: "white",
                textShadow: "2px 2px 4px black",
              },
            }}
            color="ochre"
            className="w-100"
            label="via"
            variant="standard"
            value={body.street}
            onChange={(e) => {
              setBody({ ...body, street: e.target.value });
            }}
          />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <TextField
            InputLabelProps={{
              style: {
                color: "white",
                textShadow: "2px 2px 4px black",
              },
            }}
            color="ochre"
            className="w-100"
            label="numero civico"
            variant="standard"
            value={body.houseNumber}
            onChange={(e) => {
              setBody({ ...body, houseNumber: e.target.value });
            }}
          />
        </ThemeProvider>
        <button className="form-button" type="submit">
          Inserisci indirizzo
        </button>
      </Form>
      {stateErrors && <ErrorsList show={show} setShow={setShow} stateErrors={stateErrors} />}
    </div>
  );
};
export default CreateAddressForm;
