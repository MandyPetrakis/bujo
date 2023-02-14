import React, { useState, useRef } from "react";
import { useCurrentDate, useUpdateNotes, useNotes } from "./Context";

function Intake() {
  const [note, setNote] = useState("");
  const [type, setType] = useState("task");
  const [eventDate, setEventDate] = useState(null);
  const [eventDay, setEventDay] = useState();
  const [eventMonth, setEventMonth] = useState();
  const [eventYear, setEventYear] = useState();
  const dateInputRef = useRef(null);
  const today = useCurrentDate();
  const updateNotes = useUpdateNotes();
  const notes = useNotes();

  function handleDateChange(e) {
    setEventDate(e.target.value);
    const date = e.target.value.toString();
    const day = date.replaceAll("-", " ").split(" ")[2];
    const month = date.replaceAll("-", " ").split(" ")[1];
    const year = date.replaceAll("-", " ").split(" ")[0];
    setEventDay(day);
    setEventMonth(month);
    setEventYear(year);
  }

  function handleNoteChange(e) {
    setNote(e.target.value);
  }

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const newNote = {
      details: note,
      type: type,
      eventDate: eventDate,
      eventDay: eventDay,
      eventMonth: eventMonth,
      eventYear: eventYear,
      dateCreated: today,
    };

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((r) => r.json())
      .then((data) => updateNotes([...notes, data]));
    setNote("");
    setType("task");
  }

  return (
    <div className="card">
      <form className="form" onSubmit={onSubmit}>
        <select
          value={type}
          className="interactive"
          name="type"
          onChange={handleTypeChange}
        >
          <option value="task"> ● </option>
          <option value="event">O</option>
          <option value="idea">!</option>
        </select>
        <input
          className="noteInput"
          type="text"
          name="note"
          value={note}
          placeholder="What do you want to remember?"
          onChange={handleNoteChange}
        />
        {type === "event" ? (
          <>
            <input
              className="interactive"
              name="date"
              type="date"
              onChange={handleDateChange}
              ref={dateInputRef}
            />
          </>
        ) : null}
        <br />
        <input className="button" type="submit" value="Add Note" />
      </form>
    </div>
  );
}

export default Intake;
