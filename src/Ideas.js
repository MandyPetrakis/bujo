import React from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";

function Ideas() {
  const [notes, setNotes] = useNotes();

  const ideaList = notes.filter((note) => note.type == "idea");
  const renderList = ideaList.map((idea) => (
    <NoteItem key={idea.id} note={idea} />
  ));
  return (
    <div className="cardContainer">
      <div className="ideaContainer">
        <h1 className="center">Ideas</h1>
        {renderList}
      </div>
    </div>
  );
}

export default Ideas;
