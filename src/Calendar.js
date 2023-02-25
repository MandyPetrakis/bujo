import React from "react";
import { useCurrentDate, useCurrentYear, useNotes } from "./Context";
import { LocalDate } from "@js-joda/core";
import CalendarEvent from "./CalendarEvent";

function Calendar({ displayMonth }) {
  const year = useCurrentYear();
  const [notes, setNotes] = useNotes();
  const currentDate = useCurrentDate();

  const daysArray = [];

  function createArray() {
    const displayMonthDetails = LocalDate.of(
      parseInt(year),
      parseInt(displayMonth),
      1
    );

    for (let i = 1; i < displayMonthDetails.lengthOfMonth() + 1; i++) {
      daysArray.push({
        day: i,
        dayOfWeek: LocalDate.of(
          parseInt(year),
          parseInt(displayMonth),
          i
        ).dayOfWeek(),
      });
    }
  }

  createArray();

  const renderDivs = daysArray.map((day) => {
    const dailyEvents = notes.filter(
      (note) => note.eventDay == day.day && note.eventMonth == displayMonth
    );

    return (
      <>
        <div className="day" key={day.day}>
          <div className="dayItem">
            {currentDate._day == day.day ? (
              <div className="currentDay">></div>
            ) : null}
            <div className="dayNumber">{day.day}</div>
            <div className="dayLine"> | </div>
            <div className="dayDay">{day.dayOfWeek._name.charAt(0)}</div>
          </div>
          <div className="eventItem">
            {dailyEvents.map((event) => (
              <CalendarEvent key={event.id} event={event} />
            ))}
          </div>
        </div>
      </>
    );
  });

  return <div className="calendarFlexList">{renderDivs}</div>;
}

export default Calendar;
