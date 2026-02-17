import { Typography, Paper, Grid, Box } from "@mui/material";
import { School, Code, AssignmentInd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 8, lg: 12 }, width: "100%" }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Welcome to Student Tech Directory
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Manage students, tech stacks, and enrollments
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} lg={4}>
          <Paper
            elevation={3}
            onClick={() => navigate("/students")}
            sx={{
              p: 4,
              textAlign: "center",
              height: "100%",
              minHeight: 280,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
            }}
          >
            <School sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Students
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Add, view, update, and manage student profiles
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper
            elevation={3}
            onClick={() => navigate("/techstacks")}
            sx={{
              p: 4,
              textAlign: "center",
              height: "100%",
              minHeight: 280,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
            }}
          >
            <Code sx={{ fontSize: 80, color: "secondary.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Tech Stacks
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage programming languages and technologies
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper
            elevation={3}
            onClick={() => navigate("/enrollments")}
            sx={{
              p: 4,
              textAlign: "center",
              height: "100%",
              minHeight: 280,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 8,
              },
            }}
          >
            <AssignmentInd
              sx={{ fontSize: 80, color: "success.main", mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Enrollments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enroll students in tech stacks and view profiles
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
