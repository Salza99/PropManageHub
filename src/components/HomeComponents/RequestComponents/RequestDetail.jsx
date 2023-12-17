import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import CustomerCardLoader from "../../Loaders/CustomerCardLoader";
import { singleRequest } from "../../../redux/actions/RequestAction";
import { DETAIL_RESET } from "../../../redux/actions/HomepageAction";

const RequestDetail = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.request);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();
  useEffect(() => {
    dispatch(singleRequest(token, params.rId));
    return () => {
      dispatch({ type: DETAIL_RESET, payload: "" });
    };
  }, []);
  return (
    <>
      {requestState.selected.id ? (
        <Card>
          <ListGroup className="p-3" variant="flush">
            <Card.Title>Caratteristiche:</Card.Title>
            <ListGroup.Item>Tipologia: {requestState.selected.typeOfProperty}</ListGroup.Item>
            <ListGroup.Item>Condizioni: {requestState.selected.condition}</ListGroup.Item>
            <ListGroup.Item>
              Tipologia di contratto: {requestState.selected.toRent ? "affitto" : "vendità"}
            </ListGroup.Item>
            <ListGroup.Item>Massimale: {requestState.selected.maximal} €</ListGroup.Item>
            <ListGroup.Item>Numero di locali: {requestState.selected.numberOfRooms.length}</ListGroup.Item>
            <ListGroup.Item>Numero di bagni: {requestState.selected.numberOfBathrooms}</ListGroup.Item>

            <Card.Text className="fw-bold">Informazioni sulla locazione:</Card.Text>
            {requestState.selected.regions.length > 0 && (
              <ListGroup.Item>
                Regione/i:{" "}
                {requestState.selected.regions.map((region) => {
                  return region + ", ";
                })}
              </ListGroup.Item>
            )}
            {requestState.selected.cities.length > 0 && (
              <ListGroup.Item>
                Città:{" "}
                {requestState.selected.cities.map((city) => {
                  return city + ", ";
                })}
              </ListGroup.Item>
            )}
            <Card.Text className="fw-bold">Note:</Card.Text>
            <ListGroup.Item>{requestState.selected.note}</ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        <CustomerCardLoader />
      )}
    </>
  );
};
export default RequestDetail;
