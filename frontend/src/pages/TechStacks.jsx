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
  getAllTechStacks,
  createTechStack,
  updateTechStack,
  deleteTechStack,
} from "../services/techStackService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function TechStacks() {
  const [techStacks, setTechStacks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTechStack, setEditingTechStack] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const { isAdmin } = useAuth();
  const { showSuccess, showErrorFromResponse } = useToast();

  useEffect(() => {
    loadTechStacks();
  }, []);

  const loadTechStacks = async () => {
    try {
      const data = await getAllTechStacks();
      setTechStacks(data);
    } catch (err) {
      showErrorFromResponse(err);
    }
  };

  const handleOpenDialog = (techStack = null) => {
    setEditingTechStack(techStack);
    setFormData({ name: techStack ? techStack.name : "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTechStack(null);
    setFormData({ name: "" });
  };

  const handleSubmit = async () => {
    try {
      if (editingTechStack) {
        await updateTechStack(editingTechStack.id, formData);
        showSuccess("Tech Stack updated successfully!");
      } else {
        await createTechStack(formData);
        showSuccess("Tech Stack created successfully!");
      }
      handleCloseDialog();
      loadTechStacks();
    } catch (err) {
      showErrorFromResponse(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tech stack?")) {
      try {
        await deleteTechStack(id);
        showSuccess("Tech Stack deleted successfully!");
        loadTechStacks();
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
            Tech Stacks
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
              {techStacks.map((techStack) => (
                <TableRow key={techStack.id} hover>
                  <TableCell>{techStack.name}</TableCell>
                  {isAdmin() && (
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(techStack)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(techStack.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {techStacks.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin() ? 2 : 1}
                    align="center"
                    sx={{ py: 4, color: "text.secondary" }}
                  >
                    No tech stacks found.
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
          {editingTechStack ? "Edit Tech Stack" : "Add Tech Stack"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tech Stack Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTechStack ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TechStacks;
