import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Search from "./components/Search/Search"
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
              path="*"
              element={<Navigate to="/home" replace />}
            />
            <Route path="/home" element={<Home />}/>
            <Route path="/sign-in" element={<SignIn />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/search" element={<Search />}/>
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
