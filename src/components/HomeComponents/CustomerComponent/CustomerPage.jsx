import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomer } from "../../../redux/actions/CustomerAction";
import SingleCustomer from "./SingleCustomer";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { useLocation, useParams } from "react-router";
import CustomerDetail from "./CustomerDetail";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  let content;

  if (params.id === undefined) {
    content = customerState.content.map((customer) => {
      return <SingleCustomer customer={customer} key={customer.id} />;
    });
  } else {
    content = <CustomerDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomer(token));
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutti i clienti:</h4>
      {customerState.content[0].id ? content : <CustomerCardLoader />}
    </>
  );
};
export default CustomerPage;
