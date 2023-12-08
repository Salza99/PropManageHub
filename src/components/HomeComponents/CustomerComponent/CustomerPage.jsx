import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomer } from "../../../redux/actions/CustomerAction";
import SingleCustomer from "./SingleCustomer";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { useParams } from "react-router";
import CustomerDetail from "./CustomerDetail";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const params = useParams();
  let content;

  if (params.cId === undefined && customerState.content.length > 0) {
    content = customerState.content.map((customer) => {
      return <SingleCustomer customer={customer} key={customer.id} />;
    });
  } else {
    content = <CustomerDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomer(token));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutti i clienti:</h4>
      {fetchDone ? (
        customerState.content.lenght > 0 ? (
          content
        ) : (
          <div>non ci sono risultati</div>
        )
      ) : (
        <CustomerCardLoader />
      )}
    </>
  );
};
export default CustomerPage;
