import {
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import MuiAlert from '@mui/material/Alert';

const initValues = { name: "", email: "", subject: "", message: "" };
const initState = { isLoading: false, error: "", values: initValues };



export default function Contact() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { values, isLoading, error } = state;

  const sendContactForm = async (data) => {
    return fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    });
  };

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
  
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      setSnackbarMessage("Message sent.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
       <Typography variant="h4" gutterBottom align="center" color="text.primary">
    Contact Us
  </Typography>
 
      {error && (
        <Typography color="error.main" mb={2} variant="h6" align="center">
          {error}
        </Typography>
      )}

      <Box component="form" noValidate autoComplete="off">
        <FormControl fullWidth margin="normal">
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
            onBlur={onBlur}
            error={touched.name && !values.name}
            helperText={touched.name && !values.name ? "Required" : ""}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={onBlur}
            error={touched.email && !values.email}
            helperText={touched.email && !values.email ? "Required" : ""}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Subject"
            name="subject"
            variant="outlined"
            value={values.subject}
            onChange={handleChange}
            onBlur={onBlur}
            error={touched.subject && !values.subject}
            helperText={touched.subject && !values.subject ? "Required" : ""}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            multiline
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={onBlur}
            error={touched.message && !values.message}
            helperText={touched.message && !values.message ? "Required" : ""}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
          disabled={
            !values.name || !values.email || !values.subject || !values.message
          }
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </Box>

      
    </Container>
  );
}
