import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
} from "@mui/material";

const AuthForm = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({
        username: formData.username,
        password: formData.password,
      });
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      onSignup(formData);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#a9c285",
        p: 4,
        borderRadius: 3,
        width: 320,
        mx: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            variant="filled"
            label="Login"
            name="username"
            value={formData.username}
            onChange={handleChange}
            InputProps={{ disableUnderline: true }}
            fullWidth
          />
          <TextField
            variant="filled"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{ disableUnderline: true }}
            fullWidth
          />
          {!isLogin && (
            <TextField
              variant="filled"
              label="Re-enter password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
              fullWidth
            />
          )}

          {isLogin && (
            <Typography
              variant="body2"
              align="right"
              sx={{ color: "#4a5f41" }}
            >
              Forgot Password?
            </Typography>
          )}

          <Stack direction="row" justifyContent="space-between">
            <Button onClick={() => setIsLogin(!isLogin)} sx={{ color: "#2d4c2f" }}>
              {isLogin ? "Sign up" : "Back to Log In"}
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#5a814f" }}>
              {isLogin ? "Log in" : "Sign Up"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default AuthForm;
