import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponents/Login";
import HomePage from "./components/HomeComponents/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/homepage/clienti" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
