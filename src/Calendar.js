import React, { useState, useEffect } from "react";
import {
  useCurrentDate,
  useCurrentMonth,
  useCurrentYear,
  useNotes,
} from "./Context";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

function Calendar() {
  const today = useCurrentDate();
  const currentMonth = useCurrentMonth();
  const year = useCurrentYear();
  const notes = useNotes();
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const editor = useBlockNote({
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  function handleChange(e) {
    setDisplayMonth(parseInt(e.target.value));
  }

  function daysInMonth(y, m) {
    return new Date(year, displayMonth, 0).getDate();
  }

  const daysArray = [];

  function createArray() {
    for (let i = 0; i < daysInMonth(); i++) {
      if (i < 9) {
        daysArray.push({ day: "0" + (i + 1) });
      } else daysArray.push({ day: i + 1 });
    }
  }
  createArray();

  const renderDivs = daysArray.map((day) => {
    const dailyEvents = notes.filter(
      (note) => note.eventDay == day.day && note.eventMonth == displayMonth
    );

    return (
      <div className="day" key={day.day}>
        {day.day} :
        {dailyEvents.map((event) => (
          <div key={event.id} className="dayEvent">
            {event.details}.
          </div>
        ))}
      </div>
    );
  });

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
            <BlockNoteView editor={editor} />;
          </div>
          <div className="task">
            <h2>Tasks</h2>
          </div>
        </div>
        <div className="calendarFlexList">{renderDivs}</div>
      </div>
    </div>
  );
}

export default Calendar;
