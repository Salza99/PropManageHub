import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperty } from "../../../redux/actions/PropertyAction";
import SingleProperty from "./SingleProperty";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";
import { useParams } from "react-router";
import PropertyDetail from "./PropertyDetail";

const PropertyPage = () => {
  const propertyState = useSelector((state) => state.property);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const dispatch = useDispatch();
  const params = useParams();
  let content;
  if (params.pId === undefined) {
    content = propertyState.content.map((property) => {
      return <SingleProperty property={property} key={property.id} />;
    });
  } else {
    content = <PropertyDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllProperty(token));
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutte le proprietà:</h4>
      {propertyState.content[0].id ? content : <PropertyCardLoader />}
    </>
  );
};
export default PropertyPage;
