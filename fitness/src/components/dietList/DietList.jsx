// filepath: /Users/sheaehrenberger/Desktop/fitness/fitness/src/components/dietComp/DietComp.jsx
import { useEffect, useState } from "react";

import "./dietList.scss";
import DietItem from "../dietItem/DietItem";

const DietList = ({ diets, setChoosedDiet }) => {
  return (
    <ul className="diets-list">
      {diets.map((diet) => (
        <DietItem key={diet.id} diet={diet} setChoosedDiet={setChoosedDiet}/>
      ))}
    </ul>
  );
};

export default DietList;