import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { getAllStudents } from "../services/studentService";
import { getAllTechStacks } from "../services/techStackService";
import {
  enrollStudent,
  getAllProfiles,
  deleteEnrollmentsByStudentId,
} from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Enrollments() {
  const [profiles, setProfiles] = useState([]);
  const [students, setStudents] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const { isAdmin } = useAuth();
  const { showSuccess, showErrorFromResponse } = useToast();

  // Helper to check if user is a regular USER (not admin)
  const isUser = () => !isAdmin();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profilesData, studentsData, techStacksData] = await Promise.all([
        getAllProfiles(),
        getAllStudents(),
        getAllTechStacks(),
      ]);
      setProfiles(profilesData);
      setStudents(studentsData);
      setTechStacks(techStacksData);
    } catch (err) {
      showErrorFromResponse(err);
    }
  };

  const handleOpenDialog = () => {
    setSelectedStudent("");
    setSelectedTechStacks([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEnroll = async () => {
    if (!selectedStudent || selectedTechStacks.length === 0) {
      return;
    }
    try {
      await enrollStudent(selectedStudent, selectedTechStacks);
      showSuccess("Student enrolled successfully!");
      handleCloseDialog();
      loadData();
    } catch (err) {
      showErrorFromResponse(err);
    }
  };

  const handleDeleteEnrollments = async (studentId, studentName) => {
    if (
      window.confirm(
        `Are you sure you want to remove all tech stacks for ${studentName}?`,
      )
    ) {
      try {
        await deleteEnrollmentsByStudentId(studentId);
        showSuccess("Enrollments deleted successfully!");
        loadData();
      } catch (err) {
        showErrorFromResponse(err);
      }
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 3, width: "100%", maxWidth: 700 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="medium">
            Student Profiles
          </Typography>
          {isUser() && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={handleOpenDialog}
            >
              Enroll
            </Button>
          )}
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Student</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tech Stacks</TableCell>
                {isAdmin() && (
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.studentId} hover>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {profile.studentName}
                  </TableCell>
                  <TableCell>
                    {profile.techStacks.length > 0 ? (
                      profile.techStacks.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No enrollments
                      </Typography>
                    )}
                  </TableCell>
                  {isAdmin() && (
                    <TableCell align="right">
                      {profile.techStacks.length > 0 && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            handleDeleteEnrollments(
                              profile.studentId,
                              profile.studentName,
                            )
                          }
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {profiles.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin() ? 3 : 2}
                    align="center"
                    sx={{ py: 4, color: "text.secondary" }}
                  >
                    No profiles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Enroll Student in Tech Stacks</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Select Student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.name}>
                {student.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            margin="dense"
            label="Select Tech Stacks"
            value={selectedTechStacks}
            onChange={(e) => setSelectedTechStacks(e.target.value)}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              ),
            }}
          >
            {techStacks.map((tech) => (
              <MenuItem key={tech.id} value={tech.name}>
                {tech.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEnroll} variant="contained">
            Enroll
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Enrollments;
