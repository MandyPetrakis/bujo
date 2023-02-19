import React, { useState } from "react";
import { useNotes, useUpdateNotes } from "./Context";

function EditNote({ body, noteId, resetEdit }) {
  const [messageBody, setMessageBody] = useState(body);
  const notes = useNotes();
  const updateNotes = useUpdateNotes();

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
        updateNotes(updatedNotes);
        resetEdit();
      });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className="editBox"
        type="text"
        name="body"
        autoComplete="off"
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
      />
      <input type="submit" className="button1" value="Save" />
    </form>
  );
}

export default EditNote;
