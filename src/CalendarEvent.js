import React, { useState } from "react";
import { Delete, Pencil } from "./Icons";
import { useNotes } from "./Context";

export default function CalendarEvent({ note }) {
  const [notes, setNotes] = useNotes();
  const [details, setDetails] = useState(note.details);

  function handleChange(e) {
    setDetails(e.target.value);
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details: details }),
    })
      .then((r) => r.json())
      .then((data) => {
        let updatedNotes = notes.map((note) => {
          if (data.id === note.id) {
            return data;
          } else return note;
        });
        setNotes(updatedNotes);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        let updatedNotes = notes.filter((noteA) => {
          if (note.id === noteA.id) {
            return null;
          } else return noteA;
        });
        setNotes(updatedNotes);
      });
  }

  return (
    <div key={note.id} className="itemE">
      <div className="eventDiv">
        <div className="itemIcon">O</div>
        <input
          name="text"
          type="text"
          value={details}
          onChange={handleChange}
        />
        <span className="pencil">
          <Pencil />
        </span>
        <div onClick={handleDelete} className="delete">
          <Delete />
        </div>
      </div>
    </div>
  );
}
