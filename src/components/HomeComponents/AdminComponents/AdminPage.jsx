import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmin } from "../../../redux/actions/AdminAction";
import SingleAdmin from "./SingleAdmin";
import AdminCardLoader from "../../Loaders/AdminCardLoader";

const AdminPage = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchAllAdmin(token));
    }
  }, [token]);
  return (
    <>
      <h4 className="text-light t-shadow">Tutti i collaboratori:</h4>
      {adminState.content[0].id ? (
        adminState.content.map((admin) => {
          return <SingleAdmin admin={admin} key={admin.id} />;
        })
      ) : (
        <AdminCardLoader />
      )}
    </>
  );
};
export default AdminPage;
