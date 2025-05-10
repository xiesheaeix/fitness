import { useEffect } from "react";

import "./mainPage.scss";
import CalorieComp from "../calorieComp/CalorieComp";

import calcImg from "../../assets/calorie-counting-ift-1920x1080.webp";
import calcAboutImg from "../../assets/calories-about.png";

const MainPage = () => {
  return (
    <>
      <main className="main">
        <CalorieComp />
        <img src={calcImg} alt="img" className="main-img" />
      </main>

      <section className="basal-metabolism">
        <h1 className="basal-metabolism__title">
          What Is Basal Metabolic Rate?
        </h1>
        <p className="basal-metabolism__paragraph">
          You burn calories even when resting through basic life-sustaining
          functions like breathing, circulation, nutrient processing, and cell
          production. This is known as basal metabolic rate (BMR).
        </p>
      </section>

      <section className="about">
        <img src={calcAboutImg} alt="calories" className="about-img" />

        <p className="about-paragraph">
          Calories are a unit of measurement for energy, specifically the amount
          of energy found in food. They represent the energy your body can
          potentially get from consuming food and drinks. Think of them as a way
          to measure the fuel your body uses for everything it does, from basic
          functions like breathing to more active things like exercise.
        </p>
      </section>
    </>
  );
};

export default MainPage;
