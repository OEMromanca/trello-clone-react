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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCsrfToken, registerUser } from "../../../api/api";
import { useMutation } from "@tanstack/react-query";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutationFn = async (data: RegisterForm) => {
    await fetchCsrfToken();
    await registerUser(data);
  };

  const {
    mutate: registerMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err: Error) => {
      console.error(err.message);
    },
  });

  const onSubmit = (data: RegisterForm) => {
    registerMutation(data);
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid size={6} component="div">
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoComplete="firstName"
                autoFocus
                {...formRegister("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
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
                autoComplete="lastName"
                {...formRegister("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
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
                autoComplete="email"
                {...formRegister("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={12} component="div">
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...formRegister("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
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
            disabled={isPending}
          >
            {isPending ? (
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
              {error instanceof Error ? error.message : "Registration failed"}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
