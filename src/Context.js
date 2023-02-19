import React, { useContext, useState, useEffect } from "react";
import { LocalDate } from "@js-joda/core";

const CurrentDate = React.createContext();
const Notes = React.createContext();
const UpdateNotes = React.createContext();
const CurrentMonth = React.createContext();
const CurrentYear = React.createContext();
const GoalsList = React.createContext();
const UpdateGoalsList = React.createContext();

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

export function useGoalsList() {
  return useContext(GoalsList);
}

export function useUpdateGoalsList() {
  return useContext(UpdateGoalsList);
}

function ContextProvider({ children }) {
  const [today, setToday] = useState();
  const [notes, setNotes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [goalsList, setGoalsList] = useState([]);

  useEffect(() => {
    const dateDetails = LocalDate.now();
    const month = dateDetails.monthValue();
    const year = dateDetails.year();

    setCurrentYear(year);
    setCurrentMonth(month);
    setToday(dateDetails);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((r) => r.json())
      .then((data) => setNotes(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then((data) => setGoalsList(data));
  }, []);

  function updateNotes(array) {
    setNotes(array);
  }

  function updateGoalsList(array) {
    setGoalsList(array);
  }

  return (
    <UpdateGoalsList.Provider value={updateGoalsList}>
      <GoalsList.Provider value={goalsList}>
        <CurrentYear.Provider value={currentYear}>
          <CurrentMonth.Provider value={currentMonth}>
            <CurrentDate.Provider value={today}>
              <UpdateNotes.Provider value={updateNotes}>
                <Notes.Provider value={notes}>{children}</Notes.Provider>
              </UpdateNotes.Provider>
            </CurrentDate.Provider>
          </CurrentMonth.Provider>
        </CurrentYear.Provider>
      </GoalsList.Provider>
    </UpdateGoalsList.Provider>
  );
}
export default ContextProvider;
