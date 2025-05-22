import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";

import Navigation from "../common/Navigation/Navigation";
import ProfilePage from "../pages/profPage";

import "./app.scss";
import Footer from "../common/Footer/Footer";

import LoginPage from "../pages/loginPage/LoginPage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import DietsPage from "../pages/DietsPage";
import SingleDietPage from "../pages/singleDietPage/SingleDietPage";
import { useState } from "react";

const App = () => {
  const [choosedDiet, setChoosedDiet] = useState({})
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diets" element={<DietsPage setChoosedDiet={setChoosedDiet}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />


          <Route path="/diets/:nameTag" element={<SingleDietPage choosedDiet={choosedDiet}/>}/>
          {/* <Route path="/exercises" element={<Diets />} /> */}
          {/* <Route path="/login" element={<Diets />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
