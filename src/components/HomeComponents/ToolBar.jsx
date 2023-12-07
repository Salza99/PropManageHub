import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ToolBar = () => {
  const userState = useSelector((state) => state.home.myProfile.authorities[0].authority);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
    <Nav justify variant="tabs">
      <Nav.Item
        className={location.pathname === "/homepage" ? "active" : ""}
        onClick={() => {
          navigate("/homepage");
        }}
      >
        <Nav.Link className="text-light t-shadow">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className={location.pathname === "/homepage/clienti" ? "active" : ""}
        onClick={() => {
          navigate("/homepage/clienti");
        }}
      >
        <Nav.Link className="text-light t-shadow">Clienti</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className={location.pathname === "/homepage/proprieta" ? "active" : ""}
        onClick={() => {
          navigate("/homepage/proprieta");
        }}
      >
        <Nav.Link className="text-light t-shadow">Proprietà</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className={location.pathname === "/homepage/nonso" ? "active" : ""}
        onClick={() => {
          navigate("/homepage/nonso");
        }}
      >
        <Nav.Link className="text-light t-shadow">Disabled</Nav.Link>
      </Nav.Item>
      <Nav.Item
        className={location.pathname === "/homepage/collaboratori" ? "active" : ""}
        onClick={() => {
          if (userState === "SUPER_ADMIN") {
            navigate("/homepage/collaboratori");
          }
        }}
      >
        <Nav.Link className="text-light t-shadow" disabled={userState === "SUPER_ADMIN" ? false : true}>
          Collaboratori
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default ToolBar;
