import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmin } from "../../../redux/actions/AdminAction";
import SingleAdmin from "./SingleAdmin";
import AdminCardLoader from "../../Loaders/AdminCardLoader";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminDetail from "./AdminDetail";
import CreateAdminForm from "./CreateAdminForm";
import { Plus } from "react-bootstrap-icons";
import { Fab, ThemeProvider, Tooltip, createTheme } from "@mui/material";
const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminState = useSelector((state) => state.admin);
  const [fetchDone, setFetchDone] = useState(false);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  const location = useLocation();
  let content;
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
    params.id === undefined &&
    adminState.content.length > 0 &&
    location.pathname !== "/homepage/collaboratori/createAdmin"
  ) {
    add = true;
    content = adminState.content.map((admin) => {
      return <SingleAdmin admin={admin} key={admin.id} />;
    });
  } else if (params.id !== undefined) {
    add = false;
    content = <AdminDetail />;
  } else {
    add = false;
    content = <CreateAdminForm />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllAdmin(token));
      setFetchDone(true);
    }
  }, [token, adminState.createAdminOk]);
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
        adminState.content[0].id ? (
          content
        ) : (
          <Alert variant="warning">Non ci sono risultati</Alert>
        )
      ) : (
        <AdminCardLoader />
      )}
    </Container>
  );
};
export default AdminPage;
