import { LockPerson } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";

import { useNavigate } from "react-router-dom";
import { useEmailOnlyAuth } from "../services";

function Main() {
  const [email, setEmail] = useState<string>("default-user@local.com");
  const navigate = useNavigate();
  const mutation = useEmailOnlyAuth();

  const handleGo = async () => {
    try {
      const user = await mutation.mutateAsync({ email });
      if (user) {
        navigate("/home");
      } else {
        console.log("Not Found");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
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
      </Container>
    </>
  );
}

export default Main;
