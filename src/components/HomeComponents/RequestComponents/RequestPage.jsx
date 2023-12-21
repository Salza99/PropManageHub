import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../../redux/actions/RequestAction";
import { useEffect, useState } from "react";
import SingleRequest from "./SingleRequest";
import RequestCardLoader from "../../Loaders/RequestCardLoader";
import { useParams, useLocation } from "react-router";
import RequestDetail from "./RequestDetail";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Alert, AlertTitle, Pagination, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
const RequestPage = () => {
  const requestState = useSelector((state) => state.request);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  let content;
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
  if (params.rId === undefined && requestState.content.length > 0) {
    content = requestState.content.map((request) => {
      return <SingleRequest request={request} key={request.id} />;
    });
  } else {
    content = <RequestDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllRequest(token, 0));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <Container>
      <Row className="mb-4 p-3">
        {location.pathname !== "/homepage/richieste" ? (
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
            <h4 className="text-light t-shadow m-0">Tutte le richieste:</h4>
          </Col>
        )}
      </Row>
      {fetchDone ? (
        requestState.content.length > 0 ? (
          <>
            <Row>{content}</Row>
            {location.pathname !== "/homepage/richieste" ? (
              <ThemeProvider theme={theme}>
                <Col xs={12}>
                  <Tooltip title="indietro">
                    <button className="button-info btn-transition shadow w-100" onClick={() => window.history.back()}>
                      <KeyboardBackspaceIcon className="icon" />
                    </button>
                  </Tooltip>
                </Col>
              </ThemeProvider>
            ) : requestState.totalPages > 0 ? (
              <Pagination
                count={requestState.totalPages}
                defaultPage={requestState.pageable.pageNumber + 1}
                onChange={(e, page) => {
                  dispatch(fetchAllRequest(token, page - 1));
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
        <RequestCardLoader />
      )}
    </Container>
  );
};
export default RequestPage;
