import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";
import { singleProperty } from "../../../redux/actions/PropertyAction";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { Pencil } from "react-bootstrap-icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const PropertyDetail = () => {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.property);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  const [expanded, setExpanded] = useState(false);
  let count = 0;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
    dispatch(singleProperty(token, params.pId));
    return () => {
      dispatch({ type: DETAIL_RESET, payload: "" });
    };
  }, []);
  return (
    <>
      {propertyState.selected.id ? (
        <Card className="p-2">
          <ThemeProvider theme={theme}>
            <Card.Body>
              <Row>
                <Col xs={10}>
                  <Card.Title>Info Proprietà</Card.Title>
                </Col>
                <Col xs={2}>
                  <Tooltip title="Modifica info proprietà">
                    <Fab className="me-1" size="small" color="ochre" aria-label="edit">
                      <Pencil />
                    </Fab>
                  </Tooltip>
                </Col>
              </Row>
            </Card.Body>
            <div className="border rounded p-2">
              <Card className="shadow">
                <Card.Header>
                  <Card.Title className="m-0">Caratteristiche</Card.Title>
                </Card.Header>
                <ListGroup className="p-3">
                  <div className="border rounded p-3">
                    <Card.Subtitle className="mb-2">Tipologia:</Card.Subtitle>
                    <ListGroup.Item className="fw-bold text-capitalize">
                      {propertyState.selected.typeOfProperty.toLowerCase().split("_").join(" ")}
                    </ListGroup.Item>
                  </div>
                </ListGroup>
                <ListGroup className="p-3" variant="flush">
                  <ListGroup.Item>
                    <span className="card-subtitle h6">Condizioni:</span>{" "}
                    <span className="text-capitalize">
                      {propertyState.selected.condition.toLowerCase().split("_").join(" ")}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="card-subtitle h6">Tipologia di contratto:</span>{" "}
                    {propertyState.selected.toRent ? "affitto" : "vendità"}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="card-subtitle h6">Numero di bagni:</span>{" "}
                    {propertyState.selected.numberOfBathrooms}
                  </ListGroup.Item>
                  <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <Tooltip title={`${expanded ? "nascondi" : "Vedi tutte le stanze"}`} placement="bottom-end">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className="card-subtitle h6" sx={{ width: "33%", flexShrink: 0 }}>
                          Locali:
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                          {propertyState.selected.numberOfRooms.length}
                        </Typography>
                      </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                      <ListGroup variant="flush">
                        {propertyState.selected.numberOfRooms.map((room) => {
                          return <ListGroup.Item key={"room" + count++}>{room}</ListGroup.Item>;
                        })}
                      </ListGroup>
                    </AccordionDetails>
                  </Accordion>
                  <ListGroup.Item>
                    <span className="card-subtitle h6">Prezzo:</span> {propertyState.selected.price} €
                  </ListGroup.Item>
                  <Card className="p-2 mb-3">
                    <Card.Subtitle className="fw-bold mb-2">Locazione:</Card.Subtitle>
                    <ListGroup.Item>
                      <span className="card-subtitle h6">Regione:</span> {propertyState.selected.address.region}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="card-subtitle h6">Città:</span> {propertyState.selected.address.city}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="card-subtitle h6">Indirizzo:</span> {propertyState.selected.address.street},{" "}
                      {propertyState.selected.address.houseNumber}
                    </ListGroup.Item>
                  </Card>

                  <Card className="p-2">
                    <Card.Subtitle className="fw-bold mb-2">Efficenza energetica:</Card.Subtitle>
                    <ListGroup.Item>
                      <span className="card-subtitle h6">Classe energetica:</span> {propertyState.selected.energyClass}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="card-subtitle h6">Riscaldamento:</span> {propertyState.selected.heating}
                    </ListGroup.Item>
                  </Card>
                </ListGroup>
              </Card>
            </div>
          </ThemeProvider>
        </Card>
      ) : (
        <PropertyCardLoader />
      )}
    </>
  );
};
export default PropertyDetail;
