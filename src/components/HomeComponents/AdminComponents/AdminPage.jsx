import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmin } from "../../../redux/actions/AdminAction";
import SingleAdmin from "./SingleAdmin";
import AdminCardLoader from "../../Loaders/AdminCardLoader";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminDetail from "./AdminDetail";
import CreateAdminForm from "./CreateAdminForm";
import { Plus } from "react-bootstrap-icons";
import { AlertTitle, Alert, Fab, ThemeProvider, Tooltip, createTheme, Pagination } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
      dispatch(fetchAllAdmin(token, 0));
      setFetchDone(true);
    }
  }, [token, adminState.createAdminOk]);
  return (
    <Container>
      <Row className="mb-4 p-3">
        <ThemeProvider theme={theme}>
          {location.pathname !== "/homepage/collaboratori" ? (
            <Col xs={12}>
              <Tooltip title="indietro">
                <button className="button-info btn-transition shadow w-100" onClick={() => window.history.back()}>
                  <KeyboardBackspaceIcon className="icon" />
                </button>
              </Tooltip>
            </Col>
          ) : (
            <Col xs={10} md={11}>
              <h4 className="text-light t-shadow m-0">Tutti i collaboratori:</h4>
            </Col>
          )}

          {add && (
            <Col xs={2} md={1}>
              <Tooltip title="Aggiungi collaboratori">
                <Fab
                  size="small"
                  color="ochre"
                  aria-label="add"
                  onClick={() => {
                    navigate("/homepage/collaboratori/createAdmin");
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
        adminState.content[0].id ? (
          <>
            <Row>{content}</Row>
            {location.pathname !== "/homepage/collaboratori" ? (
              <Col xs={12}>
                <Tooltip title="indietro">
                  <button className="button-info btn-transition shadow w-100" onClick={() => window.history.back()}>
                    <KeyboardBackspaceIcon className="icon" />
                  </button>
                </Tooltip>
              </Col>
            ) : adminState.totalPages > 0 ? (
              <Pagination
                count={adminState.totalPages}
                defaultPage={adminState.pageable.pageNumber + 1}
                onChange={(e, page) => {
                  dispatch(fetchAllAdmin(token, page - 1));
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
        <AdminCardLoader />
      )}
    </Container>
  );
};
export default AdminPage;
