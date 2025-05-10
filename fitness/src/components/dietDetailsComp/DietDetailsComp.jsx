import { useEffect, useState } from "react";

const DietDetails = ({ dietName, onBack }) => {
  const [dietDetails, setDietDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/ask_api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diet_name: dietName }),
    })
      .then((res) => res.json())
      .then((data) => setDietDetails(data))
      .catch((err) => console.error("Failed to fetch diet details:", err));
  }, [dietName]);

  return (
    <div>
      <button onClick={onBack}>Back to Diets</button>
      {dietDetails ? (
        <div>
          <h2>{dietDetails.name}</h2>
          <p>{dietDetails.summary}</p>
          <h3>Recipes</h3>
          <ul>
            {dietDetails.recipes.map((recipe, index) => (
              <li key={index}>
                <h4>{recipe.title}</h4>
                <p>{recipe.instructions}</p>
                <p>
                  <strong>Nutrition:</strong> Calories: {recipe.nutrition.calories}, Protein:{" "}
                  {recipe.nutrition.protein}g, Carbs: {recipe.nutrition.carbs}g, Fat:{" "}
                  {recipe.nutrition.fat}g
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading diet details...</p>
      )}
    </div>
  );
};

export default DietDetails;