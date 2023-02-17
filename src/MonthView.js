import React, { useState } from "react";
import {
  useCurrentDate,
  useCurrentMonth,
  useCurrentYear,
  useNotes,
} from "./Context";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { LocalDate, DateTimeFormatter } from "@js-joda/core";
import MonthlyTasks from "./MonthlyTasks";
import Pencil from "./Icons/Pencil";
import Delete from "./Icons/Delete";
import Calendar from "./Calendar";

function MonthView() {
  const today = useCurrentDate();
  const currentMonth = useCurrentMonth();
  const year = useCurrentYear();
  const notes = useNotes();
  const [hover, setHover] = useState(false);

  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  const editor = useBlockNote({
    onUpdate: ({ editor }) => {
      fetch(`http://localhost:3000/months/`);
      console.log(editor.getJSON());
    },
  });

  function handleChange(e) {
    setDisplayMonth(parseInt(e.target.value));
  }
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
            <h2>Focus</h2>
            <BlockNoteView editor={editor} />
          </div>
          <MonthlyTasks displayMonth={displayMonth} />
        </div>
        <Calendar displayMonth={displayMonth} />
      </div>
    </div>
  );
}

export default MonthView;
