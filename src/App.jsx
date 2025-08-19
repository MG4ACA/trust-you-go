import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LearnAboutSriLanka from "./pages/LearnAboutSriLanka";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-about-sri-lanka" element={<LearnAboutSriLanka />} />
      </Routes>
    </Router>
  );
}

export default App;
