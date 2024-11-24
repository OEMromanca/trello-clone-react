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
import Grid2 from "@mui/material/Grid2";
import { fetchCsrfToken, loginUser } from "../../../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetchCsrfToken();
      await loginUser(username, password);
      navigate("/user-profile");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed");
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
          Sign In
        </Typography>

        <Box
          sx={{ width: "100%", mt: 1 }}
          component="form"
          noValidate
          onSubmit={handleLogin}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
              "Sign In"
            )}
          </Button>

          <Grid2
            container
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid2>
              <Link to="">Forgot password?</Link>
            </Grid2>
            <Grid2>
              <Link to="/register" className="register-link">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid2>
          </Grid2>

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

export default Login;
