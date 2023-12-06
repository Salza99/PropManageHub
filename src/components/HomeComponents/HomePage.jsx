import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../redux/actions/HomepageAction";
import { Card } from "react-bootstrap";
import PageLoader from "../Loaders/PageLoader";

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
    <div className="app-background">
      <div style={{ height: "100vh" }}>
        {homeState.myProfile.id ? (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                Benvenuto {homeState.myProfile.name} {homeState.myProfile.surname}!
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{homeState.myProfile.username}</Card.Subtitle>
              <Card.Text>
                {homeState.myProfile.email}
                <br />
                {homeState.myProfile.phone}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        ) : (
          <PageLoader />
        )}
      </div>
    </div>
  );
};
export default HomePage;
