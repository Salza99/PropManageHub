import { Logout, PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../../redux/actions/HomepageAction";
import { Card } from "react-bootstrap";
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
        <Tooltip title="Impostazioni">
          <ThemeProvider theme={theme}>
            <Button
              color="ochre"
              className="mt-2 mb-2"
              variant="contained"
              onClick={handleClick}
              size="large"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <div className="w-100 text-dark">
                <Card.Title>
                  {props.homeState.name.charAt(0).toUpperCase()} {props.homeState.surname.charAt(0).toUpperCase()}
                </Card.Title>
              </div>
            </Button>
          </ThemeProvider>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/homepage/collaboratori/" + props.homeState.id);
          }}
        >
          <Avatar />
          Profilo
        </MenuItem>
        <Divider />
        {props.homeState.role === "SUPER_ADMIN" && (
          <MenuItem
            onClick={() => {
              navigate("/homepage/collaboratori/createAdmin");
            }}
          >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            dispatch({ type: LOGOUT, payload: "" });
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default CardInfoUser;
