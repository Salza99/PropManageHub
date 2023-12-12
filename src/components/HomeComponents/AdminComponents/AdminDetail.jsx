import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleAdmin } from "../../../redux/actions/AdminAction";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";
import { Card, ListGroup } from "react-bootstrap";
import AdminCardLoader from "../../Loaders/AdminCardLoader";

const AdminDetail = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  useEffect(() => {
    dispatch(singleAdmin(token, params.id));
    return () => {
      dispatch({ type: DETAIL_RESET, payload: "" });
    };
  }, []);
  return (
    <>
      {adminState.selected.id ? (
        <Card>
          <Card.Body>
            <Card.Title>
              {adminState.selected.name} {adminState.selected.surname}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{adminState.selected.email}</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>{adminState.selected.phone}</ListGroup.Item>
              <ListGroup.Item>{adminState.selected.birthDay}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <AdminCardLoader />
      )}
    </>
  );
};
export default AdminDetail;
