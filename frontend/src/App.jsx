import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Students from "./pages/Students";
import TechStacks from "./pages/TechStacks";
import Enrollments from "./pages/Enrollments";
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students"
                  element={
                    <ProtectedRoute>
                      <Students />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/techstacks"
                  element={
                    <ProtectedRoute>
                      <TechStacks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/enrollments"
                  element={
                    <ProtectedRoute>
                      <Enrollments />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Box>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
