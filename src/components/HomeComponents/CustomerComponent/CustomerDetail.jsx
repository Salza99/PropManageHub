import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { singleCustomer } from "../../../redux/actions/CustomerAction";
import { Card, ListGroup } from "react-bootstrap";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  useEffect(() => {
    dispatch(singleCustomer(token, params.cId));
    return () => {
      dispatch({ type: DETAIL_RESET, payload: "" });
    };
  }, []);
  return (
    <>
      {customerState.selected.id ? (
        <Card>
          <Card.Body>
            <Card.Title>
              {customerState.selected.name} {customerState.selected.surname}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{customerState.selected.email}</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>{customerState.selected.phone}</ListGroup.Item>
              <ListGroup.Item>{customerState.selected.birthDay}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <CustomerCardLoader />
      )}
    </>
  );
};
export default CustomerDetail;
