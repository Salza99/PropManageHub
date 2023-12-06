import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ToolBar = () => {
  const navigate = useNavigate();
  return (
    <Nav justify variant="tabs">
      <Nav.Item
        onClick={() => {
          navigate("/homepage/clienti");
        }}
      >
        <Nav.Link className="text-light">Clienti</Nav.Link>
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          navigate("/homepage/proprietà");
        }}
      >
        <Nav.Link className="text-light">Proprietà</Nav.Link>
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          navigate("/homepage/nonso");
        }}
      >
        <Nav.Link className="text-light">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          navigate("/homepage/nonso");
        }}
      >
        <Nav.Link className="text-light">Disabled</Nav.Link>
      </Nav.Item>
      <Nav.Item
        onClick={() => {
          navigate("/homepage/collaboratori");
        }}
      >
        <Nav.Link className="text-light" disabled>
          Collaboratori
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default ToolBar;
