import React from 'react';
import './dishCard.scss';

const DishCard = ({ title, ingredients, nutrition }) => {
  return (
    <div className="dish-card">
      <h2 className="dish-title">{title}</h2>
      
      <div className="section">
        <h3>Ingredients</h3>
        <ul className="ingredient-list">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Nutrition</h3>
        <div className="nutrition-facts">
          <div><strong>Calories:</strong> {nutrition.calories} kcal</div>
          <div><strong>Protein:</strong> {nutrition.protein}g</div>
          <div><strong>Carbs:</strong> {nutrition.carbs}g</div>
          <div><strong>Fat:</strong> {nutrition.fat}g</div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
