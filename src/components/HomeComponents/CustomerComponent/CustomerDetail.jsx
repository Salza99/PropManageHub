import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { singleCustomer } from "../../../redux/actions/CustomerAction";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { EnvelopePlus, HouseAdd, Pencil } from "react-bootstrap-icons";
import { Alert, Fab, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  const navigate = useNavigate();
  let count = 0;
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
                  <Card.Title>Anagrafica</Card.Title>
                </Col>
                <Col className="text-center" xs={6} sm={4}>
                  <Tooltip title="Modifica info cliente">
                    <Fab className="me-1" size="small" color="ochre" aria-label="edit">
                      <Pencil />
                    </Fab>
                  </Tooltip>

                  <Tooltip title="Aggiungi proprietà">
                    <Fab className="me-1" size="small" color="ochre" aria-label="add">
                      <HouseAdd
                        onClick={() => {
                          navigate("/homepage/clienti/aggiungiCliente/indirizzo");
                        }}
                      />
                    </Fab>
                  </Tooltip>
                  {customerState.selected.request === null && (
                    <Tooltip title="Aggiungi richiesta">
                      <Fab size="small" color="ochre" aria-label="edit">
                        <EnvelopePlus
                          onClick={() => {
                            navigate("/homepage/clienti/aggiungiCliente/richiesta");
                          }}
                        />
                      </Fab>
                    </Tooltip>
                  )}
                </Col>
              </Row>
              <Card.Title>
                {customerState.selected.name} {customerState.selected.surname}
              </Card.Title>
              <ListGroup className="mb-2" variant="flush">
                <ListGroup.Item>Email: {customerState.selected.email}</ListGroup.Item>
                <ListGroup.Item>Telefono: {customerState.selected.phone}</ListGroup.Item>
                <ListGroup.Item>Data di nascità: {customerState.selected.birthDay}</ListGroup.Item>
              </ListGroup>
              {customerState.selected.sellingProperties.length > 0 ? (
                <div>
                  <h3>Lista proprietà in vendità:</h3>
                  <div>
                    {customerState.selected.sellingProperties.map((property) => {
                      return (
                        <Card key={property.id}>
                          <Card.Body>
                            <Card.Title>{property.typeOfProperty.toLowerCase()}</Card.Title>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                Superficie: {property.surface} m<sup>2</sup>
                              </ListGroup.Item>
                              <ListGroup.Item>Condizioni: {property.condition.toLowerCase()}</ListGroup.Item>
                              <ListGroup.Item>Prezzo: {property.price}€</ListGroup.Item>
                            </ListGroup>
                            <Row className="justify-content-end">
                              <Tooltip title="Dettagli proprietà">
                                <button
                                  onClick={() => {
                                    navigate("/homepage/proprieta/" + property.id);
                                  }}
                                  className="button-info btn-transition"
                                >
                                  Dettagli
                                </button>
                              </Tooltip>
                            </Row>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Alert variant="outlined" className="mb-2" severity="info">
                  Il cliente non ha proprietà in vendità
                </Alert>
              )}
              <div>
                {customerState.selected.request !== null ? (
                  <>
                    <h3>Richiesta:</h3>
                    <Card>
                      <Card.Body>
                        <ListGroup variant="flush">
                          {customerState.selected.request.typeOfProperty.map((type) => {
                            return (
                              <ListGroup.Item className="fw-bold" key={"type" + count++}>
                                {type}
                              </ListGroup.Item>
                            );
                          })}
                        </ListGroup>

                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Superficie: {customerState.selected.request.surface} m<sup>2</sup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Condizioni: {customerState.selected.request.condition.toLowerCase()}
                          </ListGroup.Item>
                          <ListGroup.Item>Massimale: {customerState.selected.request.maximal}€</ListGroup.Item>
                        </ListGroup>
                        <Row className="justify-content-end">
                          <Tooltip title="Dettagli richiesta">
                            <button
                              onClick={() => {
                                navigate("/homepage/richieste/" + customerState.selected.request.id);
                              }}
                              className="button-info btn-transition"
                            >
                              Dettagli
                            </button>
                          </Tooltip>
                        </Row>
                      </Card.Body>
                    </Card>
                  </>
                ) : (
                  <Alert variant="outlined" severity="info">
                    Il cliente non ha richieste attive
                  </Alert>
                )}
              </div>
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
