import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../redux/actions/HomepageAction";
import { Card } from "react-bootstrap";
import PageLoader from "../Loaders/PageLoader";
import LogoBar from "../CommonComponents/LogoBar";
import CardInfoUser from "./HomepageSingleComponent/CardInfoUser";
import ToolBar from "./ToolBar";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.respLogin.authorizationToken);
  const homeState = useSelector((state) => state.home);
  useEffect(() => {
    if (token) {
      dispatch(fetchMyProfile(token));
    }
  }, []);
  return (
    <>
      {homeState ? (
        <div className="app-background">
          <LogoBar />
          <ToolBar />
          <div className="d-flex justify-content-center">
            <div>{homeState.myProfile.id && <CardInfoUser homeState={homeState.myProfile} />}</div>
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};
export default HomePage;
