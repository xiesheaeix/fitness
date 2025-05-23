import { useEffect, useState } from "react";
import "./dietItem.scss";
import { Link } from "react-router-dom";

const DietItem = ({ diet, setChoosedDiet }) => {
  return (
    <li className="diets-listitem">
      <Link to={diet.nameTag} onClick={() => setChoosedDiet(diet)}>
        <div className="diets-listitem-wrapper">
          <img src={`http://localhost:8000/${diet.image}`} alt={diet.name} className="diets-listimg" />
          <div className="diets-list__text">
            <h4>{diet.name}</h4>
            <p>{`${diet.description.slice(0, 100)}...`}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default DietItem;