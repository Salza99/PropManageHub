import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { singleRequest } from "../../../redux/actions/RequestAction";
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
const RequestDetail = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.request);
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
    dispatch(singleRequest(token, params.rId));
    return () => {
      dispatch({ type: DETAIL_RESET, payload: "" });
    };
  }, []);
  return (
    <>
      {requestState.selected.id ? (
        <Card className="p-2 mb-2">
          <ThemeProvider theme={theme}>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={10}>
                  <Card.Title>Info Richiesta</Card.Title>
                </Col>
                <Col className="text-center" xs={2}>
                  <Tooltip title="Modifica info richiesta">
                    <Fab className="me-1" size="small" color="ochre" aria-label="edit">
                      <Pencil />
                    </Fab>
                  </Tooltip>
                </Col>
              </Row>
            </Card.Body>
            <div className="border rounded p-2">
              <Card className="shadwow">
                <Card.Header>
                  <Card.Title className="m-0">Caratteristiche</Card.Title>
                </Card.Header>
                <div className="p-2">
                  <Accordion
                    className="border rounded"
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <Tooltip title={`${expanded ? "nascondi" : "Vedi tutte le tipologie"}`} placement="bottom-end">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className="card-subtitle h6" sx={{ width: "33%", flexShrink: 0 }}>
                          Tipologie:
                        </Typography>
                      </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                      <ListGroup variant="flush">
                        {requestState.selected.typeOfProperty.map((type) => {
                          return (
                            <ListGroup.Item className="text-capitalize" key={"room" + count++}>
                              {type.toLowerCase().split("_").join(" ")}
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <ListGroup className="p-3" variant="flush">
                  <ListGroup.Item>
                    <span className="card-subtitle h6">Condizioni:</span>{" "}
                    <span className="text-capitalize">
                      {requestState.selected.condition.toLowerCase().split("_").join(" ")}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="card-subtitle h6">Tipologia di contratto:</span>{" "}
                    {requestState.selected.toRent ? "affitto" : "vendità"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="card-subtitle h6">Numero di bagni:</span> {requestState.selected.numberOfBathrooms}
                  </ListGroup.Item>
                  <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <Tooltip title={`${expanded ? "nascondi" : "Vedi tutte le stanze"}`} placement="bottom-end">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          <span className="card-subtitle h6">Locali:</span>
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                          {requestState.selected.numberOfRooms.length}
                        </Typography>
                      </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                      <ListGroup variant="flush">
                        {requestState.selected.numberOfRooms.map((room) => {
                          return <ListGroup.Item key={"room" + count++}>{room}</ListGroup.Item>;
                        })}
                      </ListGroup>
                    </AccordionDetails>
                  </Accordion>

                  <ListGroup.Item>
                    <span className="card-subtitle h6">Massimale:</span> {requestState.selected.maximal} €
                  </ListGroup.Item>
                </ListGroup>
                <Card className="p-2">
                  <Card.Subtitle className="fw-bold mb-2">Informazioni sulla Locazione:</Card.Subtitle>
                  <ListGroup>
                    {requestState.selected.regions.length > 0 && (
                      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                        <Tooltip title={`${expanded ? "nascondi" : "Vedi tutte le regioni"}`} placement="bottom-end">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                              <span className="card-subtitle h6">Regioni:</span>
                            </Typography>
                          </AccordionSummary>
                        </Tooltip>
                        <AccordionDetails>
                          <ListGroup variant="flush">
                            {requestState.selected.regions.map((region) => {
                              return <ListGroup.Item key={"region" + count++}>{region}</ListGroup.Item>;
                            })}
                          </ListGroup>
                        </AccordionDetails>
                      </Accordion>
                    )}
                    {requestState.selected.cities.length > 0 && (
                      <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                        <Tooltip title={`${expanded ? "nascondi" : "Vedi tutte le città"}`} placement="bottom-end">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ width: "33%", flexShrink: 0 }}>
                              <span className="card-subtitle h6">città/paesi:</span>
                            </Typography>
                          </AccordionSummary>
                        </Tooltip>
                        <AccordionDetails>
                          <ListGroup variant="flush">
                            {requestState.selected.cities.map((city) => {
                              return <ListGroup.Item key={"city" + count++}>{city}</ListGroup.Item>;
                            })}
                          </ListGroup>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </ListGroup>
                  {requestState.selected.note && (
                    <Card className="p-2">
                      <Card.Subtitle className="fw-bold mb-2">Note</Card.Subtitle>
                      <ListGroup>
                        <ListGroup.Item>{requestState.selected.note}</ListGroup.Item>
                      </ListGroup>
                    </Card>
                  )}
                </Card>
              </Card>
            </div>
          </ThemeProvider>
        </Card>
      ) : (
        <CustomerCardLoader />
      )}
    </>
  );
};
export default RequestDetail;
