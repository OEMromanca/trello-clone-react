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
import { fetchCsrfToken, loginUser } from "../../../api/api";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutationFn = async ({ username, password }: LoginForm) => {
    await fetchCsrfToken();
    await loginUser(username, password);
  };

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: () => {
      navigate("/user-profile");
    },
    onError: (err: Error) => {
      console.error(err.message);
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />
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
              "Sign In"
            )}
          </Button>

          <Grid
            container
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              <Link to="">Forgot password?</Link>
            </Grid>
            <Grid>
              <Link to="/register" className="register-link">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error instanceof Error ? error.message : "Login failed"}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
