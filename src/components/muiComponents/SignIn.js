import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useLoginMutation } from "../../redux/commonApiCall";
import { useRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ac7b8b", // your primary color
    },
    secondary: {
      main: "#52273c", // your secondary color
    },
    text: {
      primary: "#880e4f",
      secondary: "#c2185b",
    },
    // other colors can be customized as well, such as background and text colors
  },
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const router = useRouter();
  const [login, { isLoading, error, isSuccess , isError}] = useLoginMutation();

  const [role, setRole] = React.useState("");
  const [rememberMeChecked, setRememberMeChecked] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const info = new FormData(event.currentTarget);
    let formData = {
      email: info.get("email"),
      password: info.get("password"),
      rememberMeChecked,
      role,
    };

    const url = "auth/signin";
    const { data } = await login({ url, formData });
    if (isSuccess) {
      
      if (data) {
        localStorage.setItem("token", data?.access_token);
        if (rememberMeChecked) {
          localStorage.setItem("rememberMeToken", data?.rememberMeToken);
        }
        if (role === "user") {
          router.push("/shops");
        } else {
          router.push("/admin");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={3}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1637903921530-f1135c99b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={9} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "text.primary" }}>
              <ShoppingBasketIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="text.primary">
              Sign in
            </Typography>
            {isError && (
              <Alert sx={{ width: "80%" }} severity="error">
                <strong> {error.data.message} </strong>
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Role</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={role}
                  label="Role"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    value={rememberMeChecked}
                    color="primary"
                    name="remember"
                  />
                }
                label="Remember me"
                onChange={(e) => setRememberMeChecked(e.target.checked)}
              />
              <Button
                style={{ color: "#3e2723" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
