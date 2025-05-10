import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";
import Diets from "../pages/Diets";
import Navigation from "../common/Navigation/Navigation";

import "./app.scss";
import Footer from "../common/Footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diets" element={<Diets />} />

          {/* <Route path="/exercises" element={<Diets />} /> */}
          {/* <Route path="/login" element={<Diets />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
