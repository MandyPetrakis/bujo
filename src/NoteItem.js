import React, { useState } from "react";

function NoteItem({ note }) {
  const [completed, setCompleted] = useState(false);

  if (note.type === "task") {
    return (
      <div onClick={() => setCompleted(!completed)} className="item">
        {completed ? "X" : "●"} {note.details}
      </div>
    );
  } else if (note.type === "event") {
    return (
      <div className="item">
        O {note.details} | {note.eventMonth}/{note.eventDay}
      </div>
    );
  } else if (note.type === "idea") {
    return <div className="item"> ! {note.details}</div>;
  }
}

export default NoteItem;
