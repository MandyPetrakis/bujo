import React from "react";
import { useCurrentDate, useNotes } from "./Context";
import NoteItem from "./NoteItem";

function RapidLog() {
  const notes = useNotes();
  const today = useCurrentDate();
  const todaysNotes = notes.filter((note) => note.dateCreated == today);
  const notesList = todaysNotes.map((note) => (
    <NoteItem key={note.id} note={note} />
  ));

  return (
    <div className="cardContainer">
      <div className="ideaContainer">
        <h1 className="center">Today's Rapid Log</h1>
        <div className="flexList">{notesList}</div>
      </div>
    </div>
  );
}

export default RapidLog;
