import React from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";

function Tasks() {
  const notes = useNotes();
  const tasks = notes.filter((note) => note.type === "task");

  return (
    <div className="cardContainer">
      <h1 className="center">Tasks</h1>
      <div className="taskFlexContainer">
        <div className="taskItem">
          <h2 className="center">Do</h2>
          <div className="taskList">
            {tasks
              .filter((task) => task.urgent === true && task.important === true)
              .map((task) => (
                <NoteItem key={task.id} note={task} />
              ))}
          </div>
        </div>
        <div className="taskItem">
          <h2 className="center">Schedule</h2>
          <div className="taskList">
            {tasks
              .filter(
                (task) => task.urgent === false && task.important === true
              )
              .map((task) => (
                <NoteItem key={task.id} note={task} />
              ))}
          </div>
        </div>
      </div>

      <div className="taskFlexContainer">
        <div className="taskItem">
          <h2 className="center">Delegate</h2>
          <div className="taskList">
            {tasks
              .filter(
                (task) => task.urgent === true && task.important === false
              )
              .map((task) => (
                <NoteItem key={task.id} note={task} />
              ))}
          </div>
        </div>
        <div className="taskItem">
          <h2 className="center">Eliminate</h2>
          <div className="taskList">
            {tasks
              .filter(
                (task) => task.urgent === false && task.important === false
              )
              .map((task) => (
                <NoteItem key={task.id} note={task} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
