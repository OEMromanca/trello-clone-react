import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { fetchCsrfToken, registerUser } from "../../../api/api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetchCsrfToken();
      await registerUser({ firstName, lastName, email, password });
      navigate("/user-profile");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "red" }}>
          <LockOutlinedIcon sx={{ color: "white" }} />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ color: "black" }}>
          Register
        </Typography>

        <Box
          sx={{ width: "100%", mt: 1 }}
          component="form"
          noValidate
          onSubmit={handleRegister}
        >
          <Grid container spacing={2}>
            <Grid size={6} component="div">
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={6} component="div">
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={12} component="div">
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={12} component="div">
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <Grid
            container
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Grid component="div">
              <Link to="/" className="register-link">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
