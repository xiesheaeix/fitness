import { useEffect } from "react";

import "./mainPage.scss";
import CalorieComp from "../calorieComp/CalorieComp";

const MainPage = () => {
  return (
    <main className="main">
      <CalorieComp />
    </main>
  );
};

export default MainPage;
