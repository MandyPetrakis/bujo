import React, { useState } from "react";
import { useNotes, useUpdateNotes } from "./Context";

function EditNote({ body, noteId, resetEdit }) {
  const [messageBody, setMessageBody] = useState(body);
  const [notes, setNotes] = useNotes();

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details: messageBody }),
    })
      .then((r) => r.json())
      .then((data) => {
        let updatedNotes = notes.map((note) => {
          if (data.id === note.id) {
            return data;
          } else return note;
        });
        setNotes(updatedNotes);
        resetEdit();
      });
  }

  return (
    <form onSubmit={handleFormSubmit} className="editItem">
      <input
        className="noteEditBox"
        type="text"
        name="body"
        autoComplete="off"
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
      />
    </form>
  );
}

export default EditNote;
