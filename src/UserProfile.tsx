import React, { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "./api/api";

const UserProfile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data);
      } catch (err) {
        console.error("Chyba pri načítavaní profilových údajov:", err);
        setError("Chyba pri načítavaní údajov používateľa. Skúste to neskôr.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      </Container>
    );
  }

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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          {userData?.firstName?.charAt(0).toUpperCase()}
        </Avatar>

        <Typography component="h1" variant="h5">
          {userData?.firstName} {userData?.lastName}
        </Typography>

        <Box sx={{ mt: 3, width: "100%" }}>
          <Typography variant="body1" color="textSecondary">
            <strong>Email:</strong> {userData?.email || "Neznámy email"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Rola:</strong> {userData?.roles || "Neznáma rola"}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ mt: 4 }}
        >
          Odhlásiť sa
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
