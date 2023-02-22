import React, { useState } from "react";
import { useUpdateNotes, useNotes } from "./Context";
import EditNote from "./EditNote";
import { Pencil, Delete, BulbLiIcon } from "./Icons";

function NoteItem({ note, onIdeaClick }) {
  const [completed, setCompleted] = useState(note.complete);
  const [notes, setNotes] = useNotes();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

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

  function onComplete() {
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: !note.complete }),
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

  if (note.type === "task") {
    return (
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="item"
      >
        <div
          className="itemChild"
          onClick={() => {
            setCompleted(!completed);
            onComplete();
          }}
        >
          {completed ? " X " : " ● "}
          <div className="itemChild">
            {editing ? (
              <EditNote
                body={note.details}
                resetEdit={() => setEditing(false)}
                noteId={note.id}
                className="itemChild"
              />
            ) : (
              <div>{note.details}</div>
            )}
          </div>
        </div>
        {hover ? (
          <div className="actions">
            <button className="editButton" onClick={() => setEditing(!editing)}>
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
  } else if (note.type === "event") {
    return (
      <div
        className="item"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        O {note.details} | {note.eventMonth}/{note.eventDay}
        {hover ? (
          <div className="actions">
            <button className="editButton">
              <span role="img" aria-label="edit">
                <Pencil />
              </span>
            </button>
            <button className="deleteButton">
              <span role="img" aria-label="edit">
                <Delete />
              </span>
            </button>
          </div>
        ) : null}
      </div>
    );
  } else if (note.type === "idea") {
    return (
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onIdeaClick(note)}
      >
        <div>
          <div className="idea">
            <BulbLiIcon /> {note.details}
            {hover ? (
              <div className="actions">
                <button className="deleteButton" onClick={handleDelete}>
                  <span role="img" aria-label="edit">
                    <Delete />
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default NoteItem;
