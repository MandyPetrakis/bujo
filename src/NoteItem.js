import React, { useState } from "react";
import { useUpdateNotes, useNotes } from "./Context";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

function NoteItem({ note }) {
  const [completed, setCompleted] = useState(false);
  const [expand, setExpand] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const notes = useNotes();
  const updateNotes = useUpdateNotes();
  const editor = useBlockNote({
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  function handleIdeaClick() {
    setExpand(!expand);
  }

  function handleChange(e) {
    setAdditionalDetails(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ additionalNotes: additionalDetails }),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedNotes = notes.map((note) => {
          if (note.id === data.id) {
            return data;
          } else return note;
        });
        updateNotes(updatedNotes);
      });
  }

  if (note.type === "task") {
    return (
      <div onClick={() => setCompleted(!completed)} className="item">
        {completed ? "X" : "●"} {note.details}
      </div>
    );
  } else if (note.type === "event") {
    return (
      <div className="item">
        O {note.details} | {note.eventMonth}/{note.eventDay}
      </div>
    );
  } else if (note.type === "idea") {
    return (
      <div>
        <div onClick={handleIdeaClick} className="item">
          ! {note.details}
        </div>
        <div className="noteBox">
          {expand ? <BlockNoteView editor={editor} /> : null}
        </div>
      </div>
    );
  }
}

export default NoteItem;
