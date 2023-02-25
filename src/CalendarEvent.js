import React, { useState } from "react";
import { Delete, Pencil } from "./Icons";
import { useNotes } from "./Context";
import EditNote from "./EditNote";

export default function CalendarEvent({ event }) {
  const [notes, setNotes] = useNotes();
  const [editing, setEditing] = useState(false);

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
        setNotes(updatedNotes);
      });
  }

  return (
    <div onClick={() => setEditing(true)} key={event.id} className="dayEvent">
      {editing ? (
        <>
          <EditNote
            body={event.details}
            resetEdit={() => setEditing(false)}
            noteId={event.id}
            className="noteEditBox"
          />
          <button className="deleteButton" onClick={handleDelete}>
            <span role="img" aria-label="edit">
              <Delete />
            </span>
          </button>
        </>
      ) : (
        <div>O {event.details}</div>
      )}
    </div>
  );
}
