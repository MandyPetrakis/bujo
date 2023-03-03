import React, { useState } from "react";
import { useCurrentDate, useCurrentYear, useNotes } from "./Context";

function NewEventIntake({ day, month, year }) {
  const [notes, setNotes] = useNotes();
  const currentDate = useCurrentDate();
  const [newNote, setNewNote] = useState("");

  function handleSubmit(e, day) {
    e.preventDefault();
    setNewNote(e.target.value);

    const newEvent = {
      details: newNote,
      type: "event",
      eventDate: year + "-" + month + "-" + day,
      eventDay: day,
      eventMonth: month,
      eventYear: year,
      dateCreated: useCurrentDate,
      additionalNotes: "-",
      urgent: null,
      important: null,
      complete: null,
    };

    fetch(`http://localhost:3000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((r) => r.json())
      .then((data) => setNotes([...notes, data]));
    setNewNote("");
  }

  return (
    <div className="eventAddDiv">
      <form className="eventAddDiv" onSubmit={(e) => handleSubmit(e, day)}>
        <input
          value={newNote}
          type="text"
          className="eventAdd"
          onChange={(e) => setNewNote(e.target.value)}
        />
        <span className="add">+</span>
      </form>
    </div>
  );
}

export default NewEventIntake;
