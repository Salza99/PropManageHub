import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperty } from "../../../redux/actions/PropertyAction";
import SingleProperty from "./SingleProperty";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";
import { useParams, useLocation } from "react-router";
import PropertyDetail from "./PropertyDetail";
import { Alert, Col, Container, Row } from "react-bootstrap";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton, ThemeProvider, Tooltip, createTheme } from "@mui/material";

const PropertyPage = () => {
  const propertyState = useSelector((state) => state.property);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
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
  let content;
  if (params.pId === undefined && propertyState.content.length > 0) {
    content = propertyState.content.map((property) => {
      return <SingleProperty property={property} key={property.id} />;
    });
  } else {
    content = <PropertyDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllProperty(token));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <Container>
      <Row className="mb-4 p-3">
        {location.pathname !== "/homepage/proprieta" ? (
          <ThemeProvider theme={theme}>
            <Col xs={12}>
              <Tooltip title="indietro">
                <button className="button-info btn-transition shadow w-100" onClick={() => window.history.back()}>
                  <KeyboardBackspaceIcon className="icon" />
                </button>
              </Tooltip>
            </Col>
          </ThemeProvider>
        ) : (
          <Col xs={12}>
            <h4 className="text-light t-shadow m-0">Tutte le proprietà:</h4>
          </Col>
        )}
      </Row>
      {fetchDone ? (
        propertyState.content.length > 0 ? (
          content
        ) : (
          <Alert variant="warning">Non ci sono risultati</Alert>
        )
      ) : (
        <PropertyCardLoader />
      )}
    </Container>
  );
};
export default PropertyPage;
