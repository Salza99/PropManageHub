import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperty } from "../../../redux/actions/PropertyAction";
import SingleProperty from "./SingleProperty";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";
import { useParams, useLocation } from "react-router";
import PropertyDetail from "./PropertyDetail";
import { Col, Container, Row } from "react-bootstrap";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AlertTitle, Alert, ThemeProvider, Tooltip, createTheme, Pagination } from "@mui/material";

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
      dispatch(fetchAllProperty(token, 0));
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
          <>
            <Row>{content}</Row>
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
            ) : propertyState.totalPages > 0 ? (
              <Pagination
                count={propertyState.totalPages}
                defaultPage={propertyState.pageable.pageNumber + 1}
                onChange={(e, page) => {
                  dispatch(fetchAllProperty(token, page - 1));
                }}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          <Alert severity="warning" variant="filled" elevation={6}>
            <AlertTitle>Attenzione</AlertTitle>
            Nessun Risultato trovato!
          </Alert>
        )
      ) : (
        <PropertyCardLoader />
      )}
    </Container>
  );
};
export default PropertyPage;
