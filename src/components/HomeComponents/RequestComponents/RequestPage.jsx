import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../../redux/actions/RequestAction";
import { useEffect } from "react";
import SingleRequest from "./SingleRequest";
import RequestCardLoader from "../../Loaders/RequestCardLoader";

const RequestPage = () => {
  const requestState = useSelector((state) => state.request);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchAllRequest(token));
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutte le richieste:</h4>
      {requestState.content[0].id ? (
        requestState.content.map((request) => {
          return <SingleRequest request={request} key={request.id} />;
        })
      ) : (
        <RequestCardLoader />
      )}
    </>
  );
};
export default RequestPage;
