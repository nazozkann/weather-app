import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeeklyDetailsPage from "./pages/WeeklyDetailsPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <ThemeProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weekly-details" element={<WeeklyDetailsPage />} />
            <Route path="/weekly-details/:day" element={<DetailsPage />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </ThemeProvider>
  );
}

export default App;
