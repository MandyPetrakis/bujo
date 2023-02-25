import React, { useState } from "react";
import {
  useCurrentDate,
  useCurrentMonth,
  useCurrentYear,
  useGoalsList,
} from "./Context";
import MonthlyTasks from "./MonthlyTasks";
import Calendar from "./Calendar";
import Goals from "./Goals";

function MonthView() {
  const today = useCurrentDate();
  const currentMonth = useCurrentMonth() || 12;
  const year = useCurrentYear() || 2023;
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  function handleChange(e) {
    setDisplayMonth(parseInt(e.target.value));
  }

  return (
    <div className="cardContainer">
      <h1 className="center">Monthly Overview</h1>
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
          <Goals />
          <MonthlyTasks displayMonth={displayMonth} />
        </div>
        <Calendar displayMonth={displayMonth} />
      </div>
    </div>
  );
}

export default MonthView;
