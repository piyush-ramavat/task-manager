import { LockPerson } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  SnackbarCloseReason,
  AlertColor,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";

import { useNavigate } from "react-router-dom";
import { useEmailOnlyAuth } from "../services";
import { useCookies } from "react-cookie";

function Main() {
  const [email, setEmail] = useState<string>("default-user@local.com");
  const navigate = useNavigate();
  const mutation = useEmailOnlyAuth();
  const [cookies, setCookie] = useCookies(["userId", "userName"]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();
  const [snackbarMessage, setSnackbarMessage] = useState<string>();

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleGo = async () => {
    try {
      const user = await mutation.mutateAsync({ email });
      if (user) {
        setCookie("userId", user.id);
        setCookie("userName", user.name);
        console.log(`User name: ${cookies.userName}`);
        navigate("/home");
        return;
      }
    } catch (e) {}
    setSnackbarSeverity("error");
    setSnackbarMessage("User with given email not found");
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockPerson />
        </Avatar>
        <Typography variant="h5">Get Started</Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGo}
          >
            Go
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Main;
