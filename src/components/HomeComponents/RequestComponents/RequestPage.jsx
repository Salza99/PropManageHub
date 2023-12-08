import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequest } from "../../../redux/actions/RequestAction";
import { useEffect, useState } from "react";
import SingleRequest from "./SingleRequest";
import RequestCardLoader from "../../Loaders/RequestCardLoader";
import { useParams } from "react-router";
import RequestDetail from "./RequestDetail";

const RequestPage = () => {
  const requestState = useSelector((state) => state.request);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const [fetchDone, setFetchDone] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  let content;
  console.log(params.rId);
  if (params.rId === undefined) {
    content = requestState.content.map((request) => {
      return <SingleRequest request={request} key={request.id} />;
    });
  } else {
    content = <RequestDetail />;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchAllRequest(token));
      setFetchDone(true);
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutte le richieste:</h4>
      {fetchDone ? requestState.content.lenght > 0 ? content : <div>non ci sono risultati</div> : <RequestCardLoader />}
    </>
  );
};
export default RequestPage;
