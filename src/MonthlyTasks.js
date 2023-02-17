import React from "react";
import NoteItem from "./NoteItem";
import { useNotes } from "./Context";

function MonthlyTasks({ displayMonth }) {
  const notes = useNotes();

  const tasks = notes.filter(
    (note) =>
      note.type === "task" && note.dateCreated.split("-")[1] == displayMonth
  );
  const taskList = tasks
    .map((task) => <NoteItem key={task.id} note={task} />)
    .sort((a, b) => (a.urgent > b.urgent ? 1 : -1));
  return (
    <div className="task">
      <h2>Tasks</h2>
      {taskList}
    </div>
  );
}

export default MonthlyTasks;
