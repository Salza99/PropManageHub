import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperty } from "../../../redux/actions/PropertyAction";
import SingleProperty from "./SingleProperty";
import PropertyCardLoader from "../../Loaders/PropertyCardLoader";

const PropertyPage = () => {
  const propertyState = useSelector((state) => state.property);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchAllProperty(token));
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutte le proprietà:</h4>
      {propertyState.content[0].id ? (
        propertyState.content.map((property) => {
          return <SingleProperty property={property} key={property.id} />;
        })
      ) : (
        <PropertyCardLoader />
      )}
    </>
  );
};
export default PropertyPage;
