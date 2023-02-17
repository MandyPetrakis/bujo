import React, { useState } from "react";
import { useUpdateNotes, useNotes } from "./Context";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import Pencil from "./Icons/Pencil";
import Delete from "./Icons/Delete";
import EditNote from "./EditNote";

function NoteItem({ note }) {
  const [completed, setCompleted] = useState(note.complete);
  const [expand, setExpand] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const notes = useNotes();
  const updateNotes = useUpdateNotes();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  // const editor = useBlockNote({
  //   onUpdate: ({ editor }) => {
  //     console.log(editor.getJSON());
  //   },
  // });

  // function handleIdeaClick() {
  //   setExpand(!expand);
  // }

  // function handleChange(e) {
  //   setAdditionalDetails(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   fetch(`http://localhost:3000/notes/${note.id}`, {
  //     method: "PATCH",

  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ additionalNotes: additionalDetails }),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => {
  //       const updatedNotes = notes.map((note) => {
  //         if (note.id === data.id) {
  //           return data;
  //         } else return note;
  //       });
  //       updateNotes(updatedNotes);
  //     });
  // }

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
        updateNotes(updatedNotes);
      });
  }

  function handleEdit() {
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PATCH",
    })
      .then((r) => r.json())
      .then(() => {
        let updatedNotes = notes.filter((noteA) => {
          if (note.id === noteA.id) {
            return null;
          } else return noteA;
        });
        updateNotes(updatedNotes);
      });
  }

  if (note.type === "task") {
    return (
      <div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="item"
      >
        <div onClick={() => setCompleted(!completed)}>
          {completed ? "X" : "●"}{" "}
          {editing ? (
            <EditNote
              body={note.details}
              resetEdit={() => setEditing(false)}
              noteId={note.id}
            />
          ) : (
            note.details
          )}
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
      >
        <div className="item">! {note.details}</div>
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
  }
}

export default NoteItem;
