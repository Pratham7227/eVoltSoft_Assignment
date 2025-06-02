import "./App.css";
import Signup from "./pages/Signup";
import {Home} from "./pages/Home" // example private page
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./pages/PrivateRoute"// adjust path

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }
      />
      
    </Routes>
  );
}

export default App;
