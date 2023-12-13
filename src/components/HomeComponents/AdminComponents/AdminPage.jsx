import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmin } from "../../../redux/actions/AdminAction";
import SingleAdmin from "./SingleAdmin";
import AdminCardLoader from "../../Loaders/AdminCardLoader";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminDetail from "./AdminDetail";
import CreateAdminForm from "./CreateAdminForm";
import { Plus } from "react-bootstrap-icons";

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminState = useSelector((state) => state.admin);
  const [fetchDone, setFetchDone] = useState(false);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  const location = useLocation();
  let content;
  if (
    params.id === undefined &&
    adminState.content.length > 0 &&
    location.pathname !== "/homepage/collaboratori/createAdmin"
  ) {
    content = adminState.content.map((admin) => {
      return <SingleAdmin admin={admin} key={admin.id} />;
    });
  } else if (params.id !== undefined) {
    content = <AdminDetail />;
  } else {
    content = <CreateAdminForm />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllAdmin(token));
      setFetchDone(true);
    }
  }, [token, adminState.createAdminOk]);
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
              navigate("/homepage/collaboratori/createAdmin");
            }}
          />
        </Col>
      </Row>
      {fetchDone ? (
        adminState.content[0].id ? (
          content
        ) : (
          <Alert variant="warning">Non ci sono risultati</Alert>
        )
      ) : (
        <AdminCardLoader />
      )}
    </>
  );
};
export default AdminPage;
