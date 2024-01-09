import { Logout, PersonAdd } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../../redux/actions/HomepageAction";
import { Card, Col, Container, Row } from "react-bootstrap";
const CardInfoUser = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });
  return (
    <>
      <Container>
        <Row>
          <Col xs={0} md={2}></Col>
          <Col xs={12} md={8}>
            <Card className="mt-5">
              <Card.Header>
                <Card.Title>
                  Bentornato {props.homeState.name} {props.homeState.surname}
                </Card.Title>
              </Card.Header>
              <Paper>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      navigate("/homepage/collaboratori/" + props.homeState.id);
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  {props.homeState.role === "SUPER_ADMIN" && (
                    <MenuItem
                      onClick={() => {
                        navigate("/homepage/collaboratori/createAdmin");
                      }}
                    >
                      <ListItemIcon>
                        <PersonAddOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      Aggiungi un nuovo collaboratore
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      navigate("/homepage/clienti/aggiungiCliente");
                    }}
                  >
                    <ListItemIcon>
                      <PersonAddOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Aggiungi un nuovo cliente
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch({ type: LOGOUT, payload: "" });
                    }}
                  >
                    <ListItemIcon>
                      <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </MenuList>
              </Paper>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CardInfoUser;
