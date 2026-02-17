import { AppBar, Toolbar, Typography, Button, Box, Chip } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Student Tech Directory
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isAuthenticated() ? (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/students">
                Students
              </Button>
              <Button color="inherit" component={RouterLink} to="/techstacks">
                Tech Stacks
              </Button>
              <Button color="inherit" component={RouterLink} to="/enrollments">
                Enrollments
              </Button>
              <Chip
                icon={<PersonIcon />}
                label={`${user?.username} (${user?.role})`}
                color={isAdmin() ? "warning" : "success"}
                sx={{ ml: 2 }}
              />
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
