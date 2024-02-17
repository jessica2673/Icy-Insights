import Map from "./components/Map/Map";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp"
import { ThemeProvider } from "@mui/material";
import theme from './Theme'; // Import the theme
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route path="/home" element={<Map />}/>
            <Route path="/sign-in" element={<SignIn />}/>
            <Route path="/sign-up" element={<SignUp />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
