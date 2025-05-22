import { useState } from "react";
import "./calorieComp.scss";

const CalorieComp = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [caloriePerDayAmount, setCaloriePerDayAmount] = useState(null);

  const calculateDayCalorie = () => {
    const genderMultiplier =
      gender === "male" ? 5 : gender === "female" ? -161 : -161;
    const BMR = 10 * weight + 6.25 * height - 5 * age + genderMultiplier;
    const activityLvlMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      super: 1.9,
    };

    const goalMultiplier = {
      loss: -300,
      gain: 300,
      maintain: 0,
    };

    return (
      BMR * activityLvlMultiplier[activityLevel] + goalMultiplier[goal]
    ).toFixed(0);
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    // Вычисление калорий на день
    const calorieAmount = calculateDayCalorie();

    // Данные для отправки на сервер
    const requestData = {
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      goal,
      activity_level: activityLevel,
      daily_calories: calorieAmount,
    };

    try {
      const response = await fetch("http://localhost:8000/api/user-entry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Data sent successfully");
        const responseData = await response.json();
        console.log(responseData); // Обрабатываем данные с сервера, если нужно
        setCaloriePerDayAmount(responseData.calories); // Если ответ сервера включает количество калорий
      } else {
        console.log("Failed to send data", response.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const showedComponent =
    caloriePerDayAmount === null ? (
      <FormComponent
        setGender={setGender}
        setAge={setAge}
        setHeight={setHeight}
        setGoal={setGoal}
        setWeight={setWeight}
        setActivityLevel={setActivityLevel}
        sendRequest={sendRequest}
        gender={gender}
        age={age}
        height={height}
        weight={weight}
        goal={goal}
        activityLevel={activityLevel}
      />
    ) : (
      <CalorieCalculatedComponent caloriePerDayAmount={caloriePerDayAmount} />
    );

  return (
    <div className="calorie-counter">
      <h3 className="calorie-counter__title">Calorie Calculator</h3>
      {showedComponent}
    </div>
  );
};

const FormComponent = (props) => {
  return (
    <form
      className="calorie-counter__form"
      action="submit"
      onSubmit={props.sendRequest}
    >
      <div>
        <select
          value={props.gender}
          className="inp select-tag gender"
          name="gender"
          onChange={(e) => props.setGender(e.target.value)}
          required
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="null">N/A</option>
        </select>

        <input
          value={props.age}
          type="number"
          className="inp age"
          placeholder="Age"
          name="age"
          min="1"
          max="120"
          onChange={(e) => props.setAge(e.target.value)}
          required
        />

        <input
          value={props.height}
          type="number"
          name="height"
          className="inp height"
          min="100"
          max="250"
          placeholder="Height"
          onChange={(e) => props.setHeight(e.target.value)}
          required
        />
      </div>

      <div>
        <select
          name="goal"
          value={props.goal}
          onChange={(e) => props.setGoal(e.target.value)}
          required
          className="inp select-tag goal"
        >
          <option value="">Goal</option>
          <option value="loss">Loss Weight</option>
          <option value="gain">Gain Weight</option>
          <option value="maintain">Maintain</option>
        </select>

        <input
          value={props.weight}
          type="number"
          name="weight"
          className="inp weight"
          min="1"
          max="300"
          placeholder="Weight"
          onChange={(e) => props.setWeight(e.target.value)}
          required
        />
      </div>

      <div>
        <select
          value={props.activityLevel}
          name="activityLevel"
          className="inp select-tag activityLevel"
          required
          onChange={(e) => props.setActivityLevel(e.target.value)}
        >
          <option value="">Activity Level</option>
          <option value="sedentary">Sedentary – Little to no exercise</option>
          <option value="light">
            Lightly Active – Light exercise 1–3 days/week
          </option>
          <option value="moderate">Moderately Active – 3–5 days/week</option>
          <option value="very">Very Active – 6–7 days/week</option>
          <option value="super">
            Super Active – Intense training or athlete
          </option>
        </select>
      </div>

      <button className="submit-btn">Calculate</button>
    </form>
  );
};

const CalorieCalculatedComponent = ({ caloriePerDayAmount }) => {
  return (
    <div className="calorie-result">
      <p className="calorie-result__paragraph">
        Based on your data, the optimal number of calories per day is:{" "}
      </p>
      <div className="calorie-result__amount">
        <span>{caloriePerDayAmount}</span> Kcals
      </div>
    </div>
  );
};

export default CalorieComp;
