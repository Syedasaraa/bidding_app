import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRegisterMutation } from "@/redux/commonApiCall";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";


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

export default function SignUp() {

  const router = useRouter();
  const [role, setRole] = React.useState("");
  const [rememberMeChecked, setRememberMeChecked] = React.useState(false);
  const [register, { isLoading, isSuccess , error}] = useRegisterMutation();
 
  const handleSubmit = async (event) => {
  event.preventDefault();

    const info = new FormData(event.currentTarget);
    let formData = {
      email: info.get("email"),
      password: info.get("password"),
      rememberMeChecked,
      role,
      shop: info.get("shop")
    };

    const url = "auth/signup";
    const { data } = await register({ url, formData });
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
  };
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ShoppingBasketIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {error && (
              <Alert sx={{ width: "80%" }} severity="error">
                <strong> {error.data.message} </strong> - Provide a different
                email
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                {
                  role === 'admin' ? 
                    <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="shop"
                    label="Shop Name"
                    name="shop"
                    autoComplete="shop"
                  />
                </Grid> : ""
                }
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <Button
                style={{ color: "#3e2723" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
}
