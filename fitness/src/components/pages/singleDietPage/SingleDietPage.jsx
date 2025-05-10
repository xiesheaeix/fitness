import { useEffect } from "react";
import './singleDietPage.scss';
const SingleDietPage = ({choosedDiet}) => {
    const { name, description, image } = choosedDiet;
    useEffect(() => {
        console.log(choosedDiet);
    }, []);


    return (
        <div className="diet">
            <h1 className="diet-title">{name}</h1>
            <p className="diet-description">{description}</p>
            <img src={`http://localhost:8000/${image}`} alt={name} className="diet-image" />
        </div>
    )
}

export default SingleDietPage;