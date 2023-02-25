import React, { useState } from "react";
import {
  useCurrentDate,
  useCurrentMonth,
  useCurrentYear,
  useGoalsList,
} from "./Context";

function Goals() {
  const [goalsList, setGoalsList] = useGoalsList();
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");
  const today = useCurrentDate();
  const currentMonth = useCurrentMonth() || 12;
  const year = useCurrentYear() || 2023;
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  function goalSubmit(e) {
    e.preventDefault();
    if (goal === "" || category === "") {
      return;
    }
    const newGoal = {
      year: year,
      month: displayMonth,
      dateCreated: today,
      details: goal,
      category: category,
    };

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedGoals = [...goalsList, data];
        setGoalsList(updatedGoals);
      });
    setGoal("");
    setCategory("");
  }
  const renderGoals = goalsList
    .filter((goal) => goal.month === displayMonth && goal.category === "rest")
    .map((goal) => (
      <div className="item" key={goal.id}>
        {goal.details}
      </div>
    ));

  return (
    <div className="focus">
      <h2 className="center">Goals</h2>
      <div className="line" />
      <div className="goalSetContainer">
        <form onSubmit={goalSubmit}>
          <input
            type="text"
            className="editBox"
            placeholder="New Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <select
            value={category}
            className="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled selected value="">
              Category
            </option>
            <option value="career">Career</option>
            <option value="fitness">Fitness</option>
            <option value="relationships">Relationships</option>
            <option value="rest">Rest</option>
          </select>
        </form>
      </div>
      <div className="allgoals">
        <div className="halfGoals">
          <div className="careerGoals">
            <h3 className="center">Career</h3>
            {goalsList
              .filter(
                (goal) =>
                  goal.month === displayMonth && goal.category === "career"
              )
              .map((goal) => (
                <div className="goalItem" key={goal.id}>
                  {goal.details}
                </div>
              ))}
          </div>
          <div className="fitnessGoals">
            <h3 className="center">Fitness</h3>
            {goalsList
              .filter(
                (goal) =>
                  goal.month === displayMonth && goal.category === "fitness"
              )
              .map((goal) => (
                <div className="goalItem" key={goal.id}>
                  {goal.details}
                </div>
              ))}
          </div>
        </div>
        <div className="halfGoals">
          <div className="relationshipGoals">
            <h3 className="center">Relationships</h3>
            {goalsList
              .filter(
                (goal) =>
                  goal.month === displayMonth &&
                  goal.category === "relationship"
              )
              .map((goal) => (
                <div className="goalItem" key={goal.id}>
                  {goal.details}
                </div>
              ))}
          </div>
          <div className="restGoals">
            <h3 className="center">Rest</h3>
            {goalsList
              .filter(
                (goal) =>
                  goal.month === displayMonth && goal.category === "rest"
              )
              .map((goal) => (
                <div className="goalItem" key={goal.id}>
                  {goal.details}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Goals;
