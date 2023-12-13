import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginComponents/Login";
import HomePage from "./components/HomeComponents/HomePage";
import { useSelector } from "react-redux";

function App() {
  const userState = useSelector((state) => state.home.myProfile.authorities[0].authority);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/homepage/clienti" element={<HomePage />} />
        <Route path="/homepage/clienti/aggiungiCliente" element={<HomePage />} />
        <Route path="/homepage/clienti/aggiungiCliente/proprieta" element={<HomePage />} />
        <Route path="/homepage/clienti/aggiungiCliente/richiesta" element={<HomePage />} />
        <Route path="/homepage/clienti/aggiungiCliente/indirizzo" element={<HomePage />} />
        <Route path="/homepage/proprieta" element={<HomePage />} />
        <Route path="/homepage/richieste" element={<HomePage />} />
        <Route path="/homepage/richieste/:rId" element={<HomePage />} />
        <Route path="/homepage/clienti/:cId" element={<HomePage />} />
        <Route path="/homepage/proprieta/:pId" element={<HomePage />} />
        {userState === "SUPER_ADMIN" ? <Route path="/homepage/collaboratori" element={<HomePage />} /> : ""}
        {userState === "SUPER_ADMIN" ? <Route path="/homepage/collaboratori/:id" element={<HomePage />} /> : ""}
        {userState === "SUPER_ADMIN" ? <Route path="/homepage/collaboratori/createAdmin" element={<HomePage />} /> : ""}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
