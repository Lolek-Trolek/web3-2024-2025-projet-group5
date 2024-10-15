import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Ensure this is imported correctly

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Make sure the `Link` is being used correctly for routing */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/meme-list">
          Meme List
        </Button>
        <Button color="inherit" component={Link} to="/add-meme">
          Add Meme
        </Button>
        <Button color="inherit" component={Link} to="/system-info">
          System Info
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
