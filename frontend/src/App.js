import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" replace />}
          />
          <Route path="/home" element={<Home />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
