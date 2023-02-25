import React, { useState, useRef } from "react";
import { Sun } from "./Icons";
import { useCurrentDate, useNotes } from "./Context";
import ToggleSwitch from "./ToggleSwitch";

function Intake() {
  const [note, setNote] = useState("");
  const [type, setType] = useState("task");
  const [eventDate, setEventDate] = useState(null);
  const [eventDay, setEventDay] = useState();
  const [eventMonth, setEventMonth] = useState();
  const [eventYear, setEventYear] = useState();
  const dateInputRef = useRef(null);
  const today = useCurrentDate();
  const [notes, setNotes] = useNotes();
  const [urgent, setUrgent] = useState(false);
  const [important, setImportant] = useState(false);

  function handleDateChange(e) {
    setEventDate(e.target.value);
    const date = e.target.value.toString();
    const day = date.replaceAll("-", " ").split(" ")[2];
    const month = date.replaceAll("-", " ").split(" ")[1];
    const year = date.replaceAll("-", " ").split(" ")[0];
    setEventDay(day);
    setEventMonth(month);
    setEventYear(year);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (note === "") {
      return;
    }

    const newNote = {
      details: note,
      type: type,
      eventDate: eventDate,
      eventDay: eventDay,
      eventMonth: eventMonth,
      eventYear: eventYear,
      dateCreated: today,
      additionalNotes: "-",
      urgent: urgent,
      important: important,
      complete: false,
    };

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((r) => r.json())
      .then((data) => setNotes([...notes, data]));
    setNote("");
    setType("task");
    setUrgent(false);
    setImportant(false);
    setEventDate("");
    setEventDay("");
    setEventMonth("");
    setEventYear("");
  }

  return (
    <div className="cardContainer">
      <h1 className="center"> Make a Note...</h1>
      <form onSubmit={onSubmit}>
        <div className="cardItem">
          <select
            value={type}
            className="noteType"
            name="type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="task"> TASK </option>
            <option value="event">EVENT</option>
            <option value="idea">IDEA</option>
          </select>
          <div className="noteIcon">
            {type === "task" ? "●" : null}
            {type === "event" ? "O" : null}
            {type === "idea" ? <Sun /> : null}
          </div>
          <input
            className="noteInput"
            type="text"
            name="note"
            value={note}
            placeholder="What do you want to remember?"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="extraDetails">
          {type === "event" ? (
            <>
              <input
                className="dateEnter"
                name="date"
                type="date"
                onChange={handleDateChange}
                ref={dateInputRef}
              />
            </>
          ) : null}
          {type === "task" ? (
            <>
              <ToggleSwitch
                isOn={urgent}
                handleToggle={() => setUrgent(!urgent)}
                name="Urgent"
              />
              <div className="intakeSlash">/</div>
              <ToggleSwitch
                name="Important"
                isOn={important}
                handleToggle={() => setImportant(!important)}
              />
            </>
          ) : null}
        </div>
        {/* <div className="cardItem">
          <input className="noteButton" type="submit" value="Add" />
        </div> */}
      </form>
    </div>
  );
}

export default Intake;
