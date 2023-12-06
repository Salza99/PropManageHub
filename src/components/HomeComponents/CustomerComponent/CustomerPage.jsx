import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomer } from "../../../redux/actions/CustomerAction";
import SingleCustomer from "./SingleCustomer";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomer(token));
    }
  }, [token]);
  return (
    <div>
      {customerState.content[0].id &&
        customerState.content.map((customer) => {
          return <SingleCustomer customer={customer} key={customer.id} />;
        })}
    </div>
  );
};
export default CustomerPage;
