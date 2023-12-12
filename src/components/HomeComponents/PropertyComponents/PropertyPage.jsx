import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperty } from "../../../redux/actions/PropertyAction";
import SingleProperty from "./SingleProperty";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";
import { useParams } from "react-router";
import PropertyDetail from "./PropertyDetail";
import { Alert } from "react-bootstrap";

const PropertyPage = () => {
  const propertyState = useSelector((state) => state.property);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  let content;
  if (params.pId === undefined && propertyState.content.length > 0) {
    content = propertyState.content.map((property) => {
      return <SingleProperty property={property} key={property.id} />;
    });
  } else {
    content = <PropertyDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllProperty(token));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutte le proprietà:</h4>
      {fetchDone ? (
        propertyState.content.length > 0 ? (
          content
        ) : (
          <Alert variant="warning">Non ci sono risultati</Alert>
        )
      ) : (
        <PropertyCardLoader />
      )}
    </>
  );
};
export default PropertyPage;
