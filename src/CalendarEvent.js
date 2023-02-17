import React, { useState } from "react";
import Pencil from "./Icons/Pencil";
import Delete from "./Icons/Delete";
import { useUpdateNotes, useNotes } from "./Context";

export default function CalendarEvent({ event }) {
  const [hover, setHover] = useState(false);
  const notes = useNotes();
  const updateNotes = useUpdateNotes();

  function handleDelete() {
    fetch(`http://localhost:3000/notes/${event.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        let updatedNotes = notes.filter((noteA) => {
          if (event.id === noteA.id) {
            return null;
          } else return noteA;
        });
        updateNotes(updatedNotes);
      });
  }

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={event.id}
      className="dayEvent"
    >
      {event.details}.
      {hover ? (
        <div className="actions">
          <button className="editButton">
            <span role="img" aria-label="edit">
              <Pencil />
            </span>
          </button>
          <button className="deleteButton" onClick={handleDelete}>
            <span role="img" aria-label="edit">
              <Delete />
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
