import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
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
import { Fab, ThemeProvider, Tooltip, createTheme } from "@mui/material";

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
      return <SingleCustomer customer={customer} key={customer.id} />;
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
      dispatch(fetchAllCustomer(token));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <Container>
      <Row className="mb-4 p-3">
        <ThemeProvider theme={theme}>
          <Col xs={10} md={11}>
            <h4 className="text-light t-shadow">Tutti i collaboratori:</h4>
          </Col>

          {add && (
            <Col xs={2} md={1}>
              <Tooltip title="Aggiungi cliente">
                <Fab size="small" color="ochre" aria-label="add">
                  <Plus
                    onClick={() => {
                      navigate("/homepage/clienti/aggiungiCliente");
                    }}
                  />
                </Fab>
              </Tooltip>
            </Col>
          )}
        </ThemeProvider>
      </Row>
      {fetchDone ? (
        customerState.content.length > 0 || location.pathname !== "/homepage/clienti" ? (
          content
        ) : (
          <Alert variant="warning">Non ci sono risultati</Alert>
        )
      ) : (
        <CustomerCardLoader />
      )}
    </Container>
  );
};
export default CustomerPage;
