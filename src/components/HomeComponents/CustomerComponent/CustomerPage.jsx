import { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomer } from "../../../redux/actions/CustomerAction";
import SingleCustomer from "./SingleCustomer";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { useParams } from "react-router";
import CustomerDetail from "./CustomerDetail";
import { Plus } from "react-bootstrap-icons";
import CreateCustomerForm from "./CreateCustomerForm";
import CreateRequestForm from "../RequestComponents/CreateRequestForm";
import CreateAddressForm from "../PropertyComponents/CreateAddressForm";
import CreatePropertyForm from "../PropertyComponents/CreatePropertyForm";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let content;

  if (
    params.cId === undefined &&
    customerState.content.length > 0 &&
    location.pathname !== "/homepage/clienti/aggiungiCliente" &&
    location.pathname !== "/homepage/clienti/aggiungiCliente/richiesta" &&
    location.pathname !== "/homepage/clienti/aggiungiCliente/proprieta" &&
    location.pathname !== "/homepage/clienti/aggiungiCliente/indirizzo"
  ) {
    content = customerState.content.map((customer) => {
      return <SingleCustomer customer={customer} key={customer.id} />;
    });
  } else if (params.cId !== undefined) {
    content = <CustomerDetail />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente") {
    content = <CreateCustomerForm />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente/richiesta") {
    content = <CreateRequestForm />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente/indirizzo") {
    content = <CreateAddressForm />;
  } else if (location.pathname === "/homepage/clienti/aggiungiCliente/proprieta") {
    content = <CreatePropertyForm />;
  }
  useEffect(() => {}, [content]);
  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomer(token));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <>
      <Row>
        <Col xs={10} sm={11}>
          <h4 className="text-light t-shadow">Tutti i collaboratori:</h4>
        </Col>
        <Col xs={2} sm={1}>
          <Plus
            className="form-button-add"
            onClick={() => {
              navigate("/homepage/clienti/aggiungiCliente");
            }}
          />
        </Col>
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
    </>
  );
};
export default CustomerPage;
