import React, { useState } from "react";
import { useUpdateNotes, useNotes } from "./Context";
import EditNote from "./EditNote";
import { Pencil, Delete, Sun } from "./Icons";

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
        onClick={() => {
          setEditing(true);
        }}
      >
        <div
          className="taskItemIcon"
          onClick={() => {
            setCompleted(!completed);
            onComplete();
          }}
        >
          {completed ? " X " : " ● "}
        </div>
        {editing ? (
          <>
            <EditNote
              body={note.details}
              resetEdit={() => setEditing(false)}
              noteId={note.id}
              className="noteEditBox"
            />
            <button className="deleteButton" onClick={handleDelete}>
              <span role="img" aria-label="edit">
                <Delete />
              </span>
            </button>
          </>
        ) : (
          <div className="cursor">{note.details}</div>
        )}
      </div>
    );
  } else if (note.type === "event") {
    return (
      <div
        className="item"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="itemIcon">O</div>
        {editing ? (
          <EditNote
            body={note.details}
            resetEdit={() => setEditing(false)}
            noteId={note.id}
          />
        ) : (
          <div>
            {note.details} | {note.eventMonth}/{note.eventDay}
          </div>
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
  } else if (note.type === "idea") {
    return (
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onIdeaClick(note)}
        className="item"
      >
        <div className="itemIcon">
          <Sun />
        </div>
        {editing ? (
          <EditNote
            body={note.details}
            resetEdit={() => setEditing(false)}
            noteId={note.id}
            className="noteEditBox"
          />
        ) : (
          <div>{note.details}</div>
        )}
      </div>
    );
  }
}

export default NoteItem;
