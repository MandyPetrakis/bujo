import React, { useState } from "react";
import { Delete, Pencil } from "./Icons";
import { useNotes } from "./Context";
import EditNote from "./EditNote";

export default function CalendarEvent({ event }) {
  const [hover, setHover] = useState(false);
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
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={event.id}
      className="dayEvent"
    >
      {editing ? (
        <EditNote
          body={event.details}
          resetEdit={() => setEditing(false)}
          noteId={event.id}
          className="noteEditBox"
        />
      ) : (
        <div>{event.details}</div>
      )}
      {hover ? (
        <div className="editIcons">
          {editing ? null : (
            <>
              <button
                className="editButton"
                onClick={() => setEditing(!editing)}
              >
                <span role="img" aria-label="edit">
                  <Pencil />
                </span>
              </button>
              <button className="deleteButton" onClick={handleDelete}>
                <span role="img" aria-label="edit">
                  <Delete />
                </span>
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
