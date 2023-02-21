import React, { useState } from "react";
import NoteItem from "./NoteItem";
import { useNotes } from "./Context";

function MonthlyTasks({ displayMonth }) {
  const [notes, setNotes] = useNotes();
  const [showComplete, setShowComplete] = useState(false);

  function toggleShowComplete() {
    setShowComplete(!showComplete);
  }

  const taskList = notes
    .filter(
      (note) =>
        note.type === "task" && note.dateCreated.split("-")[1] == displayMonth
    )
    .map((task) => <NoteItem key={task.id} note={task} />)
    .sort((a, b) => (a.urgent > b.urgent ? 1 : -1));

  const filteredList = notes
    .filter(
      (note) =>
        note.type === "task" &&
        note.dateCreated.split("-")[1] == displayMonth &&
        note.complete == false
    )
    .map((task) => <NoteItem key={task.id} note={task} />)
    .sort((a, b) => (a.urgent > b.urgent ? 1 : -1));

  return (
    <div className="task">
      <h2 className="center">Tasks</h2>
      <label>
        Show Complete?
        <input
          type="checkbox"
          checked={showComplete}
          onChange={toggleShowComplete}
        />
      </label>
      {showComplete ? taskList : filteredList}
    </div>
  );
}

export default MonthlyTasks;
