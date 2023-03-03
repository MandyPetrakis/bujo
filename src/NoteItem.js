import React, { useState } from "react";
import { useUpdateNotes, useNotes } from "./Context";
import { Pencil, Delete, Sun } from "./Icons";

function NoteItem({ note, onIdeaClick }) {
  const [completed, setCompleted] = useState(note.complete);
  const [notes, setNotes] = useNotes();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
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
      <>
        <div className="item">
          <div
            className="taskItemIcon"
            onClick={() => {
              setCompleted(!completed);
              onComplete();
            }}
          >
            {completed ? " X " : " ● "}
          </div>
          <input
            name="tex"
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
      </>
    );
  } else if (note.type === "event") {
    return (
      <div
        className="item"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="itemIcon">O</div>
        <input name="tex" type="text" value={details} onChange={handleChange} />
        <span className="pencil">
          <Pencil />
        </span>
        <div onClick={handleDelete} className="delete">
          <Delete />
        </div>
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
        <input name="tex" type="text" value={details} onChange={handleChange} />
        <span className="pencil">
          <Pencil />
        </span>
        <div onClick={handleDelete} className="delete">
          <Delete />
        </div>
      </div>
    );
  }
}

export default NoteItem;
