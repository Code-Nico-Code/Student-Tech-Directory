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
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Students() {
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const { isAdmin } = useAuth();
  const { showSuccess, showErrorFromResponse } = useToast();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      showErrorFromResponse(err);
    }
  };

  const handleOpenDialog = (student = null) => {
    setEditingStudent(student);
    setFormData({ name: student ? student.name : "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
    setFormData({ name: "" });
  };

  const handleSubmit = async () => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        showSuccess("Student updated successfully!");
      } else {
        await createStudent(formData);
        showSuccess("Student created successfully!");
      }
      handleCloseDialog();
      loadStudents();
    } catch (err) {
      showErrorFromResponse(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        showSuccess("Student deleted successfully!");
        loadStudents();
      } catch (err) {
        showErrorFromResponse(err);
      }
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 3, width: "100%", maxWidth: 600 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="medium">
            Students
          </Typography>
          {isAdmin() && (
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Add
            </Button>
          )}
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                {isAdmin() && (
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.name}</TableCell>
                  {isAdmin() && (
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(student)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {students.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin() ? 2 : 1}
                    align="center"
                    sx={{ py: 4, color: "text.secondary" }}
                  >
                    No students found.
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
        <DialogTitle>
          {editingStudent ? "Edit Student" : "Add Student"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Student Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingStudent ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Students;
