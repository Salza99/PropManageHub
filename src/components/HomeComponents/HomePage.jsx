import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../redux/actions/HomepageAction";
import { Col, Container, Row } from "react-bootstrap";
import PageLoader from "../Loaders/PageLoader";
import LogoBar from "../CommonComponents/LogoBar";
import CardInfoUser from "./HomepageSingleComponent/CardInfoUser";
import ToolBar from "./ToolBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomerPage from "./CustomerComponent/CustomerPage";
import Calendar from "./Calendar";
import PropertyPage from "./PropertyComponents/PropertyPage";
import RequestPage from "./RequestComponents/RequestPage";
import AdminPage from "./AdminComponents/AdminPage";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const homeState = useSelector((state) => state.home);
  const params = useParams();
  const navigate = useNavigate();
  let content;
  if (
    location.pathname === "/homepage/clienti" ||
    params.cId != null ||
    location.pathname === "/homepage/clienti/aggiungiCliente" ||
    location.pathname === "/homepage/clienti/aggiungiCliente/proprieta" ||
    location.pathname === "/homepage/clienti/aggiungiCliente/richiesta" ||
    location.pathname === "/homepage/clienti/aggiungiCliente/indirizzo" ||
    location.pathname === "/homepage/clienti/modifica" ||
    location.pathname === "/homepage/proprieta/modifica" ||
    location.pathname === "/homepage/richieste/modifica"
  ) {
    content = <CustomerPage />;
  } else if (location.pathname === "/homepage/proprieta" || params.pId != null) {
    content = <PropertyPage />;
  } else if (location.pathname === "/homepage/richieste" || params.rId != null) {
    content = <RequestPage />;
  } else if (
    location.pathname === "/homepage/collaboratori" ||
    params.id != null ||
    location.pathname === "/homepage/collaboratori/createAdmin" ||
    location.pathname === "/homepage/collaboratori/modifica"
  ) {
    content = <AdminPage />;
  } else {
    content = <div></div>;
  }
  useEffect(() => {
    if (token) {
      dispatch(fetchMyProfile(token));
    } else {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="app-background">
      {homeState.myProfile.id ? (
        <>
          <LogoBar />
          <ToolBar />
          <Container>
            <Row className="gy-3">
              <Col className="text-center" xs={12}>
                {homeState.myProfile.id && <CardInfoUser homeState={homeState.myProfile} />}
              </Col>

              <Col className="border-main background-op p-2" xs={12} lg={7}>
                {content}
              </Col>
              <Col xs={0} lg={1}></Col>
              <Col className="p-2" xs={12} lg={4}>
                <Calendar />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};
export default HomePage;
