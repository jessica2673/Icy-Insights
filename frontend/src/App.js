import Map from "./components/Map/Map";
import SignIn from "./components/SignIn/SignIn";
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
          <Route path="/signin" element={<SignIn />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
