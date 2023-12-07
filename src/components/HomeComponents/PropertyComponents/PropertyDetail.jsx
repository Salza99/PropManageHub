import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";
import { singleProperty } from "../../../redux/actions/PropertyAction";

const PropertyDetail = () => {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.property);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const params = useParams();

  useEffect(() => {
    dispatch(singleProperty(token, params.pId));
  }, []);
  return (
    <>
      {propertyState.selected.id ? (
        <Card>
          <ListGroup className="p-3" variant="flush">
            <Card.Title>Caratteristiche:</Card.Title>
            <ListGroup.Item>Tipologia: {propertyState.selected.typeOfProperty}</ListGroup.Item>
            <ListGroup.Item>Condizioni: {propertyState.selected.condition}</ListGroup.Item>
            <ListGroup.Item>
              Tipologia di contratto: {propertyState.selected.toRent ? "affitto" : "vendità"}
            </ListGroup.Item>
            <ListGroup.Item>Prezzo: {propertyState.selected.price} €</ListGroup.Item>
            <ListGroup.Item>Numero di locali: {propertyState.selected.numberOfRooms.length}</ListGroup.Item>
            <ListGroup.Item>Numero di bagni: {propertyState.selected.numberOfBathrooms}</ListGroup.Item>

            <Card.Text className="fw-bold">Locazione:</Card.Text>
            <ListGroup.Item>Regione: {propertyState.selected.address.region}</ListGroup.Item>
            <ListGroup.Item>Città: {propertyState.selected.address.city}</ListGroup.Item>
            <ListGroup.Item>Comune: {propertyState.selected.address.hamlet}</ListGroup.Item>
            <ListGroup.Item>
              {propertyState.selected.address.street}, {propertyState.selected.address.houseNumber}
            </ListGroup.Item>
            <Card.Text className="fw-bold">Efficenza energetica:</Card.Text>
            <ListGroup.Item>Classe energetica: {propertyState.selected.energyClass}</ListGroup.Item>
            <ListGroup.Item>Riscaldamento: {propertyState.selected.heating}</ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        <PropertyCardLoader />
      )}
    </>
  );
};
export default PropertyDetail;
