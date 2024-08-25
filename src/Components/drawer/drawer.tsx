import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  IconButton,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useStyles } from "./drawer.styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../State/store";
import { setAuthentication } from "../../State/authSlice/authSlice";

export default function Drawer() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsOpen(false);
    dispatch(setAuthentication({ authanticated: false }));
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <MuiDrawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={classes.linkContainer}>
            <Button
              component={Link}
              to={"/projects"}
              variant="text"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Projects
            </Button>
            <Button
              component={Link}
              to={"/users"}
              variant="text"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Users
            </Button>
            <Button
              component={Link}
              to={"/profile"}
              variant="text"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Profile
            </Button>
            <Button variant="text" onClick={logout}>
              Logout
            </Button>
          </Box>
        </div>
      </MuiDrawer>
    </div>
  );
}
