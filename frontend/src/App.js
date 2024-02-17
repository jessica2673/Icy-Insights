import Map from "./components/Map/Map";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp"
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
          <Route path="/home" element={<Map />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
