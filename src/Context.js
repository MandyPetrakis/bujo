import React, { useContext, useState, useEffect } from "react";

const CurrentDate = React.createContext();
const Notes = React.createContext();
const UpdateNotes = React.createContext();
const CurrentMonth = React.createContext();
const CurrentYear = React.createContext();

export function useCurrentYear() {
  return useContext(CurrentYear);
}

export function useCurrentDate() {
  return useContext(CurrentDate);
}
export function useCurrentMonth() {
  return useContext(CurrentMonth);
}

export function useNotes() {
  return useContext(Notes);
}

export function useUpdateNotes(array) {
  return useContext(UpdateNotes);
}

function ContextProvider({ children }) {
  const [today, setToday] = useState();
  const [notes, setNotes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();

  useEffect(() => {
    const dateDetails = new Date();
    const currentDay =
      dateDetails.getFullYear() +
      "-" +
      (dateDetails.getMonth() + 1) +
      "-" +
      dateDetails.getDate();

    const month = dateDetails.getMonth() + 1;
    const year = dateDetails.getFullYear();
    setCurrentYear(year);
    setCurrentMonth(month);
    setToday(currentDay);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((r) => r.json())
      .then((data) => setNotes(data));
  }, []);

  function updateNotes(array) {
    setNotes(array);
  }

  return (
    <CurrentYear.Provider value={currentYear}>
      <CurrentMonth.Provider value={currentMonth}>
        <CurrentDate.Provider value={today}>
          <UpdateNotes.Provider value={updateNotes}>
            <Notes.Provider value={notes}>{children}</Notes.Provider>
          </UpdateNotes.Provider>
        </CurrentDate.Provider>
      </CurrentMonth.Provider>
    </CurrentYear.Provider>
  );
}
export default ContextProvider;
