import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomer } from "../../../redux/actions/CustomerAction";
import SingleCustomer from "./SingleCustomer";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { useParams, useLocation } from "react-router";
import CustomerDetail from "./CustomerDetail";
import { Plus } from "react-bootstrap-icons";
import CreateCustomerForm from "./CreateCustomerForm";
import CreateRequestForm from "../RequestComponents/CreateRequestForm";
import CreateAddressForm from "../PropertyComponents/CreateAddressForm";
import CreatePropertyForm from "../PropertyComponents/CreatePropertyForm";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";
import { AlertTitle, Alert, Fab, ThemeProvider, Tooltip, createTheme, Pagination } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let content;
  const location = useLocation();
  let add = true;
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
  if (
    params.cId === undefined &&
    customerState.content.length > 0 &&
    location.pathname !== "/homepage/clienti/aggiungiCliente" &&
    location.pathname !== "/homepage/clienti/aggiungiCliente/richiesta" &&
    location.pathname !== "/homepage/clienti/aggiungiCliente/proprieta" &&
    location.pathname !== "/homepage/clienti/aggiungiCliente/indirizzo"
  ) {
    add = true;
    content = customerState.content.map((customer) => {
      return <SingleCustomer key={customer.id} customer={customer} />;
    });
  } else if (params.cId !== undefined) {
    add = false;
    content = <CustomerDetail />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente") {
    add = false;
    content = <CreateCustomerForm />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente/richiesta") {
    add = false;
    content = <CreateRequestForm />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente/indirizzo") {
    add = false;
    content = <CreateAddressForm />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente/proprieta") {
    add = false;
    content = <CreatePropertyForm />;
  }
  useEffect(() => {}, [content]);
  useEffect(() => {
    if (
      params.cId !== undefined &&
      location.pathname !== "/homepage/clienti/aggiungiCliente/richiesta" &&
      location.pathname !== "/homepage/clienti/aggiungiCliente/proprieta" &&
      location.pathname !== "/homepage/clienti/aggiungiCliente/indirizzo"
    ) {
      dispatch({ type: DETAIL_RESET, payload: "" });
    }
  }, [location]);
  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomer(token, 0));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <Container>
      <Row className="mb-1 p-3">
        <ThemeProvider theme={theme}>
          {location.pathname !== "/homepage/clienti" ? (
            <Col xs={12}>
              <Tooltip title="indietro">
                <button className="button-info btn-transition shadow w-100" onClick={() => window.history.back()}>
                  <KeyboardBackspaceIcon className="icon" />
                </button>
              </Tooltip>
            </Col>
          ) : (
            <Col xs={10} md={11}>
              <h4 className="text-light t-shadow m-0">Tutti i clienti:</h4>
            </Col>
          )}

          {add && (
            <Col xs={2} md={1}>
              <Tooltip title="Aggiungi cliente">
                <Fab
                  size="small"
                  color="ochre"
                  aria-label="add"
                  onClick={() => {
                    navigate("/homepage/clienti/aggiungiCliente");
                  }}
                >
                  <Plus />
                </Fab>
              </Tooltip>
            </Col>
          )}
        </ThemeProvider>
      </Row>
      {fetchDone ? (
        customerState.content.length > 0 || location.pathname !== "/homepage/clienti" ? (
          <>
            <Row>{content}</Row>

            {location.pathname !== "/homepage/clienti" ? (
              <Row>
                <Col xs={12}>
                  <Tooltip title="indietro">
                    <button className="button-info btn-transition shadow w-100" onClick={() => window.history.back()}>
                      <KeyboardBackspaceIcon className="icon" />
                    </button>
                  </Tooltip>
                </Col>
              </Row>
            ) : customerState.totalPages > 0 ? (
              <Pagination
                count={customerState.totalPages}
                defaultPage={customerState.pageable.pageNumber + 1}
                onChange={(e, page) => {
                  dispatch(fetchAllCustomer(token, page - 1));
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
        <CustomerCardLoader />
      )}
    </Container>
  );
};
export default CustomerPage;
