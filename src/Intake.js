import React, { useState, useRef } from "react";
import { useCurrentDate, useUpdateNotes, useNotes } from "./Context";

function Intake() {
  const [note, setNote] = useState("");
  const [type, setType] = useState("task");
  const [eventDate, setEventDate] = useState(null);
  const [eventDay, setEventDay] = useState();
  const [eventMonth, setEventMonth] = useState();
  const [eventYear, setEventYear] = useState();
  const dateInputRef = useRef(null);
  const today = useCurrentDate();
  const updateNotes = useUpdateNotes();
  const notes = useNotes();
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

    const newNote = {
      details: note,
      type: type,
      eventDate: eventDate,
      eventDay: eventDay,
      eventMonth: eventMonth,
      eventYear: eventYear,
      dateCreated: today,
      additionalNotes: null,
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
      .then((data) => updateNotes([...notes, data]));
    setNote("");
    setType("task");
    setUrgent(false);
    setImportant(false);
  }

  return (
    <div className="cardContainer">
      <form onSubmit={onSubmit}>
        <div className="cardItem">
          <select
            value={type}
            className="cardItem1"
            name="type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="task"> ● </option>
            <option value="event">O</option>
            <option value="idea">!</option>
          </select>
          <input
            className="cardItem2"
            type="text"
            name="note"
            value={note}
            placeholder="What do you want to remember?"
            onChange={(e) => setNote(e.target.value)}
          />

          {type === "event" ? (
            <>
              <input
                className="cardItem3"
                name="date"
                type="date"
                onChange={handleDateChange}
                ref={dateInputRef}
              />
            </>
          ) : null}
          {type === "task" ? (
            <>
              <div className="checkBoxContainer">
                <div className="taskUI">
                  <label>
                    Urgent:
                    <input
                      className="cardItem4"
                      type="checkBox"
                      onChange={() => setUrgent(!urgent)}
                      checked={urgent}
                      ref={dateInputRef}
                    />
                  </label>
                </div>
                <div className="taskUI">
                  <label>
                    Important:
                    <div className="cardItem4">
                      <input
                        className="cardItem4"
                        type="checkBox"
                        checked={important}
                        onChange={() => setImportant(!important)}
                        ref={dateInputRef}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="cardItem">
          <input className="button" type="submit" value="Add Note" />
        </div>
      </form>
    </div>
  );
}

export default Intake;
