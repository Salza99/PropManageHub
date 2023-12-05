import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponents/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
