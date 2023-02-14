import React from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";

function Ideas() {
  const notes = useNotes();
  const ideaList = notes.filter((note) => note.type == "idea");
  const renderList = ideaList.map((idea) => <NoteItem note={idea} />);
  return (
    <div className="card">
      <h1 className="center">Ideas</h1>
      {renderList}
    </div>
  );
}

export default Ideas;
