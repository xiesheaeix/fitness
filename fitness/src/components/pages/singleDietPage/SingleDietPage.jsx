import { useEffect, useState } from "react";
import './singleDietPage.scss';

import Spinner from "../../common/spinner/Spinner";
import DishCard from "../../dishCard/DishCard";



const SingleDietPage = ({choosedDiet}) => {
    const { name = "Keto Diet", description = "A low-carb, high-fat diet that helps you burn fat more effectively.", image = "media/keto-diet.jpg", nameTag = "keto-diet"} = choosedDiet;
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true); // ✅ make sure this runs first

        fetch(`http://localhost:8000/api/ask_api/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            diet: { name, nameTag, description, image }
            }),
        })
            .then((res) => res.json())
            .then((data) => {
            setRecipes(data.recipes);
            setLoading(false);
            })
            .catch((err) => {
            console.error("Error:", err);
            setLoading(false); 
            });
    }, []);

    const style={
        backgroundImage: `url(http://localhost:8000/${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        }
    return (
        <div className="diet">
            <div className="diet-text">
                <h1 className="diet-title">{name}</h1>
                <p className="diet-description">{description}</p>
            </div>

            
            <div className="recipes" style={style}>
                <div className="overlay" />
                <h3 className="recipes-title">Recipes</h3>

                {loading ? (
                    <Spinner />
                    ) : (
                    <div className="recipes-list">
                        {recipes.map((recipe, index) => <DishCard key={index} title={recipe.title} ingredients={recipe.ingredients} nutrition={recipe.nutrition} />)}
                    </div>
                    )}
            </div>
           
        </div>
    )
}

export default SingleDietPage;