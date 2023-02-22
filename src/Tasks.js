import React, { useState } from "react";
import { useNotes } from "./Context";
import NoteItem from "./NoteItem";
import { Close } from "./Icons";

function Tasks() {
  const [notes, setNotes] = useNotes();
  const tasks = notes.filter((note) => note.type === "task");
  const [showComplete, setShowComplete] = useState(false);

  const completedTasks = notes
    .filter((note) => note.complete === true)
    .map((task) => <NoteItem key={task.id} note={task} />);

  function onCheck() {
    setShowComplete(!showComplete);
  }

  return (
    <div className="taskContainer">
      <h1 className="center">Tasks</h1>
      <div className="checkDiv" onChange={onCheck}>
        {showComplete ? (
          <h4 className="close" onClick={onCheck}>
            X
          </h4>
        ) : (
          <h4 onClick={onCheck}>Show Complete</h4>
        )}

        <br />
      </div>
      <div className="allTasks">
        <div className="todoTasks">
          <div className="taskFlexContainer">
            <div className="taskItem">
              <h2 className="center">Do</h2>
              <h4 className="subtext">Urgent / Important</h4>
              <div className="taskList">
                {tasks
                  .filter(
                    (task) =>
                      task.urgent === true &&
                      task.important === true &&
                      task.complete == false
                  )
                  .map((task) => (
                    <NoteItem key={task.id} note={task} />
                  ))}
              </div>
            </div>
            <div className="taskItem">
              <h2 className="center">Schedule</h2>
              <h4 className="subtext">Not Urgent / Important</h4>
              <div className="taskList">
                {tasks
                  .filter(
                    (task) =>
                      task.urgent === false &&
                      task.important === true &&
                      task.complete == false
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
              <h4 className="subtext">Urgent / Not Important</h4>
              <div className="taskList">
                {tasks
                  .filter(
                    (task) =>
                      task.urgent === true &&
                      task.important === false &&
                      task.complete == false
                  )
                  .map((task) => (
                    <NoteItem key={task.id} note={task} />
                  ))}
              </div>
            </div>
            <div className="taskItem">
              <h2 className="center">Eliminate</h2>
              <h4 className="subtext">Not Urgent / Not Important</h4>
              <div className="taskList">
                {tasks
                  .filter(
                    (task) =>
                      task.urgent === false &&
                      task.important === false &&
                      task.complete == false
                  )
                  .map((task) => (
                    <NoteItem key={task.id} note={task} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {showComplete ? (
          <div className="completed">
            <h2 className="center">Complete</h2>
            <h4 className="subtext">You did it!</h4>
            {completedTasks}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tasks;
