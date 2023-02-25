import React, { useState } from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";
import { Pencil, Save } from "./Icons";

function Ideas() {
  const [notes, setNotes] = useNotes();
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState();
  const [editing, setEditing] = useState(false);
  const [editingNote, setEditingNote] = useState();

  function onShowDetails(note) {
    setDetails("");
    setDetails(note.additionalNotes);
    setTitle(note.details);
    setEditingNote(note);
  }

  function onSave() {
    const updates = {
      details: title,
      additionalNotes: details,
    };
    fetch(`http://localhost:3000/notes/${editingNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
      .then((r) => r.json())
      .then((editedNote) => {
        const updatedNotes = notes.map((note) => {
          if (note.id === editedNote.id) {
            return editedNote;
          } else return note;
        });
        setNotes(updatedNotes);
        setEditing(false);
      });
  }

  const ideaList = notes.filter((note) => note.type == "idea");
  const renderList = ideaList.map((idea) => (
    <NoteItem key={idea.id} note={idea} onIdeaClick={onShowDetails} />
  ));
  return (
    <div className="cardContainer">
      <h1 className="center">Thoughts</h1>
      <div className="allIdeas">
        <div className="ideaContainer">{renderList}</div>
        <div className="ideaDetails">
          <div className="ideaEdit">
            <input
              className="titleEdit"
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="detailEdit"
              value={details}
              rows="10"
              onChange={(e) => setDetails(e.target.value)}
            />
            <button className="saveButton" onClick={onSave}>
              <span role="img" aria-label="edit">
                <Save />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ideas;
