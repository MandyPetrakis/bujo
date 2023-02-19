import React, { useState } from "react";
import {
  useCurrentDate,
  useCurrentMonth,
  useCurrentYear,
  useGoalsList,
  useUpdateGoalsList,
} from "./Context";
import "@blocknote/core/style.css";
import { LocalDate, DateTimeFormatter } from "@js-joda/core";
import MonthlyTasks from "./MonthlyTasks";
import Calendar from "./Calendar";

function MonthView() {
  const today = useCurrentDate();
  const currentMonth = useCurrentMonth() || 12;
  const year = useCurrentYear() || 2023;
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const goalsList = useGoalsList();
  const updateGoalsList = useUpdateGoalsList();
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");

  function handleChange(e) {
    setDisplayMonth(parseInt(e.target.value));
  }
  function goalSubmit(e) {
    e.preventDefault();
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
        updateGoalsList(updatedGoals);
      });
    setGoal("");
    setCategory("");
  }

  const renderGoals = goalsList
    .filter((goal) => goal.month === displayMonth)
    .map((goal) => <li key={goal.id}>{goal.details}</li>);

  return (
    <div className="cardContainer">
      <div className="calendarItemContainer">
        <div className="calendarItem">
          <select
            className="monthSelect"
            value={displayMonth}
            onChange={handleChange}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <div className="focus">
            <h2 className="center">Goals</h2>
            {renderGoals}
            <div className="goalSetContainer">
              <form onSubmit={goalSubmit}>
                <input
                  type="text"
                  className="editBox"
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
                <input type="submit" value="Set it!" className="goalSubmit" />
              </form>
            </div>
          </div>
          <MonthlyTasks displayMonth={displayMonth} />
        </div>
        <Calendar displayMonth={displayMonth} />
      </div>
    </div>
  );
}

export default MonthView;
