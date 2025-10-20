import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LearnAboutSriLanka from './pages/LearnAboutSriLanka';

function ScrollToSection({ section }) {
  useEffect(() => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [section]);

  return null;
}

function SectionRedirect() {
  const location = useLocation();
  const section = location.pathname.substring(1); // Remove leading slash

  return (
    <>
      <ScrollToSection section={section} />
      <Home />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-about-sri-lanka" element={<LearnAboutSriLanka />} />
        <Route path="/about" element={<SectionRedirect />} />
        <Route path="/contact" element={<SectionRedirect />} />
        <Route path="/gallery" element={<SectionRedirect />} />
        <Route path="/offers" element={<SectionRedirect />} />
        <Route path="/guides" element={<SectionRedirect />} />
        <Route path="/reviews" element={<SectionRedirect />} />
        <Route path="/booking" element={<SectionRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
