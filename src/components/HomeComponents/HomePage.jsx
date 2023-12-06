import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../redux/actions/HomepageAction";
import { Card, Col, Container, Row } from "react-bootstrap";
import PageLoader from "../Loaders/PageLoader";
import LogoBar from "../CommonComponents/LogoBar";
import CardInfoUser from "./HomepageSingleComponent/CardInfoUser";
import ToolBar from "./ToolBar";
import { useLocation } from "react-router-dom";
import CustomerPage from "./CustomerComponent/CustomerPage";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const homeState = useSelector((state) => state.home);
  console.log(location.pathname);
  useEffect(() => {
    if (token) {
      dispatch(fetchMyProfile(token));
    }
  }, []);
  return (
    <div className="app-background">
      {homeState.myProfile.id ? (
        <>
          <LogoBar />
          <ToolBar />
          <Container>
            <Row className="">
              <Col className="text-center" xs={12}>
                {homeState.myProfile.id && <CardInfoUser homeState={homeState.myProfile} />}
              </Col>
              {location.pathname === "/homepage/clienti" ? <CustomerPage /> : <div></div>}
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
