import { useEffect, useState } from "react";
import "./dietDetailsComp.scss";

const DietDetails = ({ diet, onBack }) => {
  const [dietDetails, setDietDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/ask_api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diet }),
    })
      .then((res) => res.json())
      .then((data) => setDietDetails(data))
      .catch((err) => console.error("Failed to fetch diet details:", err));
  }, [diet]);

  return (
    <div className='diet-details'>
      <button className='submit-btn' onClick={onBack}>Back to Diets</button>
      {dietDetails ? (
        <div>
          <div className="diet-details-container">
          <h2>{dietDetails.name}</h2>
          <p>{dietDetails.summary}</p>

              {diet.image && (
                <img
                  src={`http://localhost:8000${diet.image}`}
                  alt={diet.name}
                  width="200"
                />
              )}
             </div> 
          <h3>Recipes</h3>
          <ul>
            {dietDetails.recipes.map((recipe, index) => (
              <li key={index}>
                <div className="text-content">
                  <h4>{recipe.title}</h4>
                  <p>{recipe.instructions}</p>
                </div>
                <div className="nutrition">
                <p>
                  <strong>Nutrition:</strong> Calories: {recipe.nutrition.calories}, Protein:{" "}
                  {recipe.nutrition.protein}g, Carbs: {recipe.nutrition.carbs}g, Fat:{" "}
                  {recipe.nutrition.fat}g
                </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
        </div>
      )}
    </div>
  );
};

export default DietDetails;