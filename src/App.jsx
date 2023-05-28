import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TexteList from "./pages/TexteList";
import { ROUTES } from "./constants";

const lightTheme = {
  palette: {
    mode: "light",
    background: {
      default: "#F8F9FA",
      paper: "#fff",
    },
    primary: {
      lightest: "#F5F8FF",
      light: "#447fdf",
      main: "#2f62ae",
      dark: "#144279",
      darkest: "#002a4f",
      contrastText: "#ffffff",
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark",
    background: {
      default: "#0E1320",
      paper: "#111927",
    },
    primary: {
      lightest: "#F5F8FF",
      light: "#4480e1",
      main: "#2e62b0",
      dark: "#15447d",
      darkest: "#011d36",
      contrastText: "#ffffff",
    },
  },
};

function App() {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <AppBar>
          <Toolbar
            sx={{
              pt: 2,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h1">
              Texte Project
            </Typography>
            <Box>
              <Button
                onClick={() =>
                  setTheme(
                    theme.palette.mode === "dark" ? lightTheme : darkTheme
                  )
                }
              >
                {theme.palette.mode === "dark" ? (
                  <LightMode sx={{ color: "#fff" }} />
                ) : (
                  <DarkMode sx={{ color: "#fff" }} />
                )}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.TEXTE_LIST} element={<TexteList />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
