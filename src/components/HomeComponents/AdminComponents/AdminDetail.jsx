import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleAdmin } from "../../../redux/actions/AdminAction";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import AdminCardLoader from "../../Loaders/AdminCardLoader";
import { Fab, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Pencil } from "react-bootstrap-icons";

const AdminDetail = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
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
  useEffect(() => {
    dispatch(singleAdmin(token, params.id));
    return () => {
      dispatch({ type: DETAIL_RESET, payload: "" });
    };
  }, []);
  return (
    <>
      {adminState.selected.id ? (
        <Card className="shadow p-2 mb-2">
          <ThemeProvider theme={theme}>
            <Card.Body>
              <Row>
                <Col xs={6} sm={8}>
                  <Card.Title>Anagrafica</Card.Title>
                </Col>
              </Row>
              <Card.Title>
                {adminState.selected.name} {adminState.selected.surname}
              </Card.Title>
              <ListGroup className="mb-2" variant="flush">
                <ListGroup.Item>Email: {adminState.selected.email}</ListGroup.Item>
                <ListGroup.Item>Telefono: {adminState.selected.phone}</ListGroup.Item>
                <ListGroup.Item>Data di nascità: {adminState.selected.birthDay}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </ThemeProvider>
          <Card.Footer className="d-flex justify-content-end">
            <Card.Subtitle className="text-muted p">Utente inserito il: {adminState.selected.insertDate}</Card.Subtitle>
          </Card.Footer>
        </Card>
      ) : (
        <AdminCardLoader />
      )}
    </>
  );
};
export default AdminDetail;
