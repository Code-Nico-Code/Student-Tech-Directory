import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info", // 'success' | 'error' | 'warning' | 'info'
  });

  const showToast = useCallback((message, severity = "info") => {
    setToast({ open: true, message, severity });
  }, []);

  const showSuccess = useCallback(
    (message) => {
      showToast(message, "success");
    },
    [showToast],
  );

  const showError = useCallback(
    (message) => {
      showToast(message, "error");
    },
    [showToast],
  );

  const showWarning = useCallback(
    (message) => {
      showToast(message, "warning");
    },
    [showToast],
  );

  const showInfo = useCallback(
    (message) => {
      showToast(message, "info");
    },
    [showToast],
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  // Helper to extract error message from various error formats
  const getErrorMessage = useCallback((error) => {
    if (typeof error === "string") return error;

    // Check for Axios error response
    if (error?.response) {
      const { status, data } = error.response;

      // Handle 401/403 specifically
      if (status === 401) {
        return "Unauthorized: Please login again.";
      }
      if (status === 403) {
        return "Access Denied: You don't have permission for this action. Admin role required.";
      }

      // Try to get message from response data
      if (data?.message) return data.message;
      if (data?.error) return data.error;
      if (typeof data === "string") return data;

      return `Error: ${status}`;
    }

    // Check for error message
    if (error?.message) return error.message;

    return "An unexpected error occurred.";
  }, []);

  // Show error with automatic message extraction
  const showErrorFromResponse = useCallback(
    (error) => {
      const message = getErrorMessage(error);
      showError(message);
    },
    [getErrorMessage, showError],
  );

  const value = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showErrorFromResponse,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={hideToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={hideToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%", minWidth: 300 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
