import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { singleCustomer } from "../../../redux/actions/CustomerAction";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";
import { EnvelopePlus, HouseAdd, Pencil } from "react-bootstrap-icons";
import { Fab, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CustomerDetail = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  const navigate = useNavigate();
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
    dispatch(singleCustomer(token, params.cId));
  }, []);
  return (
    <>
      {customerState.selected.id ? (
        <Card>
          <ThemeProvider theme={theme}>
            <Card.Body>
              <Row>
                <Col xs={6} sm={8}>
                  <Card.Title>
                    {customerState.selected.name} {customerState.selected.surname}
                  </Card.Title>
                </Col>
                <Col className="text-center" xs={6} sm={4}>
                  <Fab className="me-1" size="small" color="ochre" aria-label="add">
                    <HouseAdd
                      onClick={() => {
                        navigate("/homepage/clienti/aggiungiCliente/indirizzo");
                      }}
                    />
                  </Fab>
                  <Fab className="me-1" size="small" color="ochre" aria-label="edit">
                    <Pencil />
                  </Fab>
                  {customerState.selected.request === null && (
                    <Fab size="small" color="ochre" aria-label="edit">
                      <EnvelopePlus
                        onClick={() => {
                          navigate("/homepage/clienti/aggiungiCliente/richiesta");
                        }}
                      />
                    </Fab>
                  )}
                </Col>
              </Row>
              <Card.Subtitle className="mb-2 text-muted">{customerState.selected.email}</Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>{customerState.selected.phone}</ListGroup.Item>
                <ListGroup.Item>{customerState.selected.birthDay}</ListGroup.Item>
              </ListGroup>
              {customerState.selected.sellingProperties.length > 0 && (
                <div>
                  <h3>prorpietà:</h3>
                  <div>
                    {customerState.selected.sellingProperties.map((property) => {
                      return (
                        <div key={property.id}>
                          <h3>{property.typeOfProperty}</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card.Body>
          </ThemeProvider>
        </Card>
      ) : (
        <CustomerCardLoader />
      )}
    </>
  );
};
export default CustomerDetail;
