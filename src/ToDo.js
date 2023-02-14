import React from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";

function ToDo() {
  const notes = useNotes();
  const tasks = notes.filter((note) => note.type === "task");
  const taskList = tasks.map((task) => <NoteItem key={task.id} note={task} />);
  return (
    <div>
      <h1>Task List</h1>
      {taskList}
    </div>
  );
}

export default ToDo;
