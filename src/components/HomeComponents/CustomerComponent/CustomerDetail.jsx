import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { singleCustomer } from "../../../redux/actions/CustomerAction";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { EnvelopePlus, HouseAdd, Pencil } from "react-bootstrap-icons";
import { Alert, Fab, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";

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
  useEffect(() => {
    if (params.cId !== undefined) {
      dispatch({ type: DETAIL_RESET, payload: "" });
    }
  }, [params]);
  return (
    <>
      {customerState.selected.id ? (
        <Card className="p-2 mb-2">
          <ThemeProvider theme={theme}>
            <Card.Body>
              <Row>
                <Col xs={6} sm={8}>
                  <Card.Title>Anagrafica</Card.Title>
                </Col>
                <Col className="text-center" xs={6} sm={4}>
                  <Tooltip title="Modifica info cliente">
                    <Fab
                      className="me-1"
                      size="small"
                      color="ochre"
                      aria-label="edit"
                      onClick={() => {
                        navigate("/homepage/clienti/modifica");
                      }}
                    >
                      <Pencil />
                    </Fab>
                  </Tooltip>

                  <Tooltip title="Aggiungi proprietà">
                    <Fab
                      className="me-1"
                      size="small"
                      color="ochre"
                      aria-label="add"
                      onClick={() => {
                        navigate("/homepage/clienti/aggiungiCliente/indirizzo");
                      }}
                    >
                      <HouseAdd />
                    </Fab>
                  </Tooltip>
                  {customerState.selected.request === null && (
                    <Tooltip title="Aggiungi richiesta">
                      <Fab
                        size="small"
                        color="ochre"
                        aria-label="edit"
                        onClick={() => {
                          navigate("/homepage/clienti/aggiungiCliente/richiesta");
                        }}
                      >
                        <EnvelopePlus />
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
              <div className="shadow border mb-4 rounded p-2">
                <h3>Modulo Proprietà</h3>
                {customerState.selected.sellingProperties.length > 0 ? (
                  <div>
                    {customerState.selected.sellingProperties.map((property) => {
                      return (
                        <Card className="mb-3" key={property.id}>
                          <Card.Header>
                            <Card.Title className="m-0">Proprietà:</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <ListGroup>
                              <div className="border rounded p-3">
                                <Card.Subtitle className="mb-2">Tipologia:</Card.Subtitle>
                                <ListGroup.Item className="fw-bold fs-6 text-capitalize">
                                  {property.typeOfProperty.toLowerCase().split("_").join(" ")}
                                </ListGroup.Item>
                              </div>
                            </ListGroup>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                Superficie: {property.surface} m<sup>2</sup>
                              </ListGroup.Item>
                              <ListGroup.Item className="text-capitalize">
                                Condizioni:{" "}
                                <span className="text-capitalize">
                                  {property.condition.toLowerCase().split("_").join(" ")}
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item>Prezzo: {property.price}€</ListGroup.Item>
                            </ListGroup>
                            <Row className="justify-content-end">
                              <Tooltip title="Dettagli proprietà">
                                <button
                                  onClick={() => {
                                    navigate("/homepage/proprieta/" + property.id);
                                  }}
                                  className="button-info btn-transition shadow"
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
                ) : (
                  <Alert variant="outlined" className="mb-2" severity="info">
                    Il cliente non ha proprietà in vendità
                  </Alert>
                )}
              </div>
              <div className="shadow border rounded p-2">
                <h3>Modulo Richiesta</h3>
                {customerState.selected.request !== null ? (
                  <>
                    <Card>
                      <Card.Header>
                        <Card.Title className="m-0">Richiesta:</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        {customerState.selected.request.typeOfProperty.length < 2 ? (
                          <div className="border p-3 rounded">
                            <Card.Subtitle className="mb-2">Tipologia:</Card.Subtitle>
                            <ListGroup>
                              {customerState.selected.request.typeOfProperty.map((type) => {
                                return (
                                  <ListGroup.Item className="fw-bold fs-6 text-capitalize" key={"type" + count++}>
                                    {type.toLowerCase().split("_").join(" ")}
                                  </ListGroup.Item>
                                );
                              })}
                            </ListGroup>
                          </div>
                        ) : (
                          <div className="border p-3 mb-1 rounded">
                            <Card.Subtitle className="mb-2">Tipologie:</Card.Subtitle>
                            <ListGroup>
                              {customerState.selected.request.typeOfProperty.map((type) => {
                                return (
                                  <ListGroup.Item className="fw-bold fs-6 text-capitalize" key={"type" + count++}>
                                    {type.toLowerCase().split("_").join(" ")}
                                  </ListGroup.Item>
                                );
                              })}
                            </ListGroup>
                          </div>
                        )}

                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Superficie: {customerState.selected.request.surface} m<sup>2</sup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Condizioni:{" "}
                            <span className="text-capitalize">
                              {customerState.selected.request.condition.toLowerCase().split("_").join(" ")}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item>Massimale: {customerState.selected.request.maximal}€</ListGroup.Item>
                        </ListGroup>
                        <Row className="justify-content-end">
                          <Tooltip title="Dettagli richiesta">
                            <button
                              onClick={() => {
                                navigate("/homepage/richieste/" + customerState.selected.request.id);
                              }}
                              className="button-info btn-transition shadow"
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
            <Card.Footer className="d-flex justify-content-end">
              <Card.Subtitle className="text-muted p">
                Cliente inserito il: {customerState.selected.insertDate}
              </Card.Subtitle>
            </Card.Footer>
          </ThemeProvider>
        </Card>
      ) : (
        <CustomerCardLoader />
      )}
    </>
  );
};
export default CustomerDetail;
