import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";

import Navigation from "../common/Navigation/Navigation";

import "./app.scss";
import Footer from "../common/Footer/Footer";

import LoginPage from "../pages/loginPage/LoginPage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import DietsPage from "../pages/DietsPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diets" element={<DietsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path="/exercises" element={<Diets />} /> */}
          {/* <Route path="/login" element={<Diets />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
